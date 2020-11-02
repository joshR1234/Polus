import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey';
import { Router } from '@angular/router';
import { SurveyService } from '../_services/survey.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  surveys: Survey[];
  currentUser: any;
  isLoggedIn: boolean;

  constructor(private tokenStorageService: TokenStorageService,
    private surveyService: SurveyService,
    private router: Router) { 
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    }

  ngOnInit() {
    this.getSurveys();
  }

  private getSurveys(){
    this.surveyService.getSurveysList().subscribe(data => {
      this.surveys = data
    });
  }

}
