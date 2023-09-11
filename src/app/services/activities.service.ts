import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://www.boredapi.com/api';
  }

  getActivityOfType(type?: string): Observable<Activity> {
    if (type) {
      return this.http.get<Activity>(`${this.apiUrl}/activity?type=${type}`);
    } else {
      // returns random activity
      return this.http.get<Activity>(`${this.apiUrl}/activity`);
    }
  }
}
