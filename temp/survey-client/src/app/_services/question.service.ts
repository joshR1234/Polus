import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../question';
//import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseURL = "http://localhost:8080/api/questions";

  constructor(private httpClient: HttpClient) { }

  createQuestion(question: Question): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, question);
  } 

  getQuestionsBySurveyId(url: string): Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.baseURL}/${url}`);
  }

}
