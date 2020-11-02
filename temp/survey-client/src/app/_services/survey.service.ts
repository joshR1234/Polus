import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from '../survey';
import { User } from '../user';
import { Question } from '../question';
//import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private baseURL = "http://localhost:8080/api/surveys";

  constructor(private httpClient: HttpClient) { }

  createSurvey(survey: Survey): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, survey);
  } 

  getSurveysList(): Observable<Survey[]>{
    return this.httpClient.get<Survey[]>(`${this.baseURL}`);
  }

  getSurveysByOwner(owner: string): Observable<Survey[]>{
    return this.httpClient.get<Survey[]>(`${this.baseURL}/${owner}`);
  }

  getSurveyByURL(url: string): Observable<Survey>{
    return this.httpClient.get<Survey>(`${this.baseURL}/single/${url}`);
  }

}
