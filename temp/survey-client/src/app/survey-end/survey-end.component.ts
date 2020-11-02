import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from '../_services/survey.service';
import { Survey } from '../survey';

@Component({
  selector: 'app-survey-end',
  templateUrl: './survey-end.component.html',
  styleUrls: ['./survey-end.component.css']
})
export class SurveyEndComponent implements OnInit {

  score: string;
  surveyId: string;
  survey: Survey;

  constructor(private route:ActivatedRoute, private surveyService: SurveyService) { }

  ngOnInit() {
    this.surveyId = this.route.snapshot.params['id'];
    this.score = Number(this.route.snapshot.params['score']).toFixed(2);
    this.getSurvey();
    
  }

  private getSurvey(){
    this.surveyService.getSurveyByURL(this.surveyId).subscribe(data => {
      this.survey = data;
    });
  }

}
