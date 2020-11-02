import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../result';
//import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseURL = "http://localhost:8080/api/results";

  constructor(private httpClient: HttpClient) { }

  getSurveyResultsByUrl(url: string): Observable<Result[]>{
    console.log(`${this.baseURL}/` + url)
    return this.httpClient.get<Result[]>(`${this.baseURL}/` + url);
  }

  createResult(userId: string, surveyId: string, score: number,
              radioAnswers: string[][], correspondingLabels: string[][]): Observable<Object>{
    let infoDump = []
    infoDump.push(userId);
    infoDump.push(surveyId);
    infoDump.push(String(score));
    for(let i = 0; i < radioAnswers.length; i++){
      for(let j = 0; j< radioAnswers[i].length;j++){
          infoDump.push(radioAnswers[i][j]);
      }
      for(let j = 0; j< correspondingLabels[i].length;j++){
        infoDump.push(correspondingLabels[i][j]);
      }
    }
    return this.httpClient.post(`${this.baseURL}/grade`, infoDump);
  } 

}
