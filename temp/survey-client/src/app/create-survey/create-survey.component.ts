import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { Question } from '../question';
import { QuestionService } from '../_services/question.service';
import { Survey } from '../survey';
import { SurveyService } from '../_services/survey.service';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  questionTypeList: any = ['Multiple Choice', 'True False'];
  surveyBuilderForm: FormGroup;
  survey: Survey = new Survey();
  questionList: Question[];
  myQType: string = "";
  username: string;

  form = new FormGroup({
    mySurvey: new FormControl('', Validators.required)
  });

  constructor(private fb:FormBuilder,
    private router: Router, 
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private tokenStorageService: TokenStorageService) { 
    this.surveyBuilderForm = this.fb.group({
      name: '',
      questions: this.fb.array([]) ,
    });
  }

  ngOnInit() {
  }

  /*get f(){
    return this.form.controls;
  }*/


  questions() : FormArray {
    return this.surveyBuilderForm.get("questions") as FormArray
  }
   
  newQuestion(): FormGroup {
    this.myQType = (<HTMLInputElement>document.getElementById("type")).value;
    return this.fb.group({
      type: this.myQType,
      prompt: '',
      op1: '',
      op2: '',
      op3: '',
      op4: '',
    })
  }
   
  addQuestion() {
    this.questions().push(this.newQuestion());
  }
   
  removeQuestion(i:number) {
    this.questions().removeAt(i);
  }
   
  onSubmit() {
    let tempId = this.makeid();
    this.createQuestionsForSurvey(tempId);

    let user = this.tokenStorageService.getUser();
    if( user != null){
      this.username = user.username;
    } else{
      this.username = "anon";
    }
    
    
    this.survey.name = this.surveyBuilderForm.value.name;
    this.survey.url = tempId;
    this.survey.owner = this.username;
    this.saveSurvey();
    this.goToSurveyList();
  }

  createQuestionsForSurvey(tempId: string) {
    for(var q of this.surveyBuilderForm.value.questions){
      let question = new Question();
      let answerString = "";
      let map = new Map();

      question.surveyId = tempId;

      Object.keys(q).forEach(key => {
        map.set(key, q[key]);
      });
      let i = 0;
      for (let value of map.values()){
        switch (i){
          case 0:
            question.type = value;
            break;
          case 1:
            question.prompt = value;
            break;
          case 2:
            question.answer = value;
            answerString += "+++";
            answerString += value;
            break;
          default:
            answerString += "+++";
            answerString += value;
            break;
        }
        i += 1;
      }
      question.options = answerString;

      this.saveQuestion(question);
    }
  }

  makeid(): string {
    let result = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVQXYZ1234567890";
    for (let i = 0; i<64;i++){
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  saveQuestion(question: Question){
    this.questionService.createQuestion(question).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
  }

  saveSurvey(){
    this.surveyService.createSurvey(this.survey).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
  }

  goToSurveyList(){
    this.router.navigate(['/survey-list']);
  }

}
