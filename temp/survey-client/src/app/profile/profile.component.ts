import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Survey } from '../survey';
import { MailService } from '../_services/mail.service';
import { SurveyService } from '../_services/survey.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  surveys: Survey[];
  username: string;

  constructor(private token: TokenStorageService,
                private surveyService: SurveyService, 
                private mailService: MailService,
                private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser != null){
      this.username = this.currentUser.username;
      this.getSurveys();
    }
  }

  private getSurveys(){
    this.surveyService.getSurveysByOwner(this.username).subscribe(data => {
      this.surveys = data
    });
  }

  viewSurveyDetails(urlId: string){
    this.router.navigate(['survey-details/'+urlId]);
  }

  private sendMail(surveyId: string){
    this.mailService.emailLink(surveyId, this.username).subscribe(data => {
      console.log(data);
    });
  }


}