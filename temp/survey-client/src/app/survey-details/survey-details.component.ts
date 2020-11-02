import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../_services/survey.service';
import { Survey } from '../survey';
import { ResultService } from '../_services/result.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Result } from '../result';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {

  id: string;
  survey: Survey;
  results: Result[];
  username: string;

  constructor(private route: ActivatedRoute, private surveyService: SurveyService,
    private requestService: ResultService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getSurveyByUrl();
    this.getResultsBySurveyUrl();
  }

  private getSurveyByUrl(){
    this.surveyService.getSurveyByURL(this.id).subscribe(data => {
      this.survey = data;
    });
  }

  private getResultsBySurveyUrl(){
    this.requestService.getSurveyResultsByUrl(this.id).subscribe(data => {
      this.results = data;
    });
  }

 
}
