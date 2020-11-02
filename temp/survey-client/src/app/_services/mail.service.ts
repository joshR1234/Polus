import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private baseURL = "http://localhost:8080/api/mail";

  constructor(private httpClient: HttpClient) { }

  emailLink(surveyId: string, username: string): Observable<Object>{
    let packedRequest = []
    packedRequest.push(surveyId);
    packedRequest.push(username);
    return this.httpClient.post(`${this.baseURL}`, packedRequest);
  } 

}
