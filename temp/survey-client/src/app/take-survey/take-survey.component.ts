import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../_services/survey.service';
import { Survey } from '../survey';
import { Question } from '../question';
import { QuestionService } from '../_services/question.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { ResultService } from '../_services/result.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {

  id: string;
  survey: Survey;
  questions: Question[];
  questionOptions: string[][];
  form = new FormGroup({
    email: new FormControl('',[
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  });
  score: number = 0;
  username: string;
  isLoggedIn = false;

  constructor(private route: ActivatedRoute, 
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private resultService: ResultService, 
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.questionOptions = [];
    this.id = this.route.snapshot.params['id'];
    this.getSurvey();
    this.getQuestions();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    } else{
      this.username  = "anon";
    }
  }

  get f(){
    return this.form.controls;
  }
  
  goToSurveyEnd(){
    this.router.navigate(['/survey-end/'+this.id+'/'+this.score]);
  }
  
  onSubmit(){
   let questionIds = [];
   let qQuestionLabels = [];
   let qAnswerResponses = [];

   for(let i = 0; i < this.questions.length; i++){
    questionIds.push("qAnswer"+i);
   }
   for(let qId of questionIds){
    let qAnswer = [];
    let qLabel = [];
    
    var radios = document.getElementsByName(qId);
    
      for(let i = 0; i < radios.length; i++) { 
        qLabel.push(document.getElementById(qId+"Label"+i).innerHTML);
        let temp = radios[i] as  HTMLInputElement;
        if(temp.type="radio") { 
          qAnswer.push(String(temp.checked));
        } 
        if(i==radios.length-1){
          qAnswerResponses.push(qAnswer);
          qQuestionLabels.push(qLabel);
        }
      } 
   }

   let tempEmail = this.form.get('email').value as String;

   if(!(tempEmail == undefined) && !(tempEmail == "")){
      this.username = tempEmail + ' - anon';
   }
   this.checkAnswers(qAnswerResponses, qQuestionLabels);
   this.goToSurveyEnd();
  }

  get primEmail(){
    return this.form.get('email')
    }

  private shuffleQuestions() {
    for (var i = this.questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.questions[i];
        this.questions[i] = this.questions[j];
        this.questions[j] = temp;
    }
}

  private checkAnswers(radioAnswers: string[][], correspondingLabels: string[][]){
    let correctQuestions = [] as string[];

    for(let i = 0; i < this.questions.length;i++){
      let answer = this.questions[i].answer;
      for(let j = 0; j<correspondingLabels[i].length; j++){
        if(correspondingLabels[i][j] == answer){
          correctQuestions.push(radioAnswers[i][j]);
        }
      }
    }

    for(let i = 0; i<correctQuestions.length;i++){
      if(correctQuestions[i] == "true"){
        this.score += 1;
      }
    }
    this.score = this.score/correctQuestions.length;
    this.score.toFixed(2);

    console.log(this.username);
    this.resultService.createResult(this.username, this.survey.url, this.score, radioAnswers, correspondingLabels).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  private getSurvey(){
    this.surveyService.getSurveyByURL(this.id).subscribe(data => {
      this.survey = data;
    });
  }

  private getQuestions(){
    this.questionService.getQuestionsBySurveyId(this.id).subscribe(data => {
      this.questions = data;
      this.shuffleQuestions();
      this.shuffleQuestionAnswers();

    });
  }

  private shuffleQuestionAnswers(){

    for(let i = 0; i<this.questions.length;i++){
      let qLabels = this.questions[i].options.split('+++').slice(1);

      for (var j = qLabels.length - 1; j > 0; j--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = qLabels[i];
        qLabels[i] = qLabels[j];
        qLabels[j] = temp;
      }
      this.questionOptions.push(qLabels);
    }
  }

  }
