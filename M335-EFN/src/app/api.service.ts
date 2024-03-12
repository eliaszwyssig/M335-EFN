import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postData(name: string, schnitzel: number, potato: number, duration: string) {
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
    const body = `entry.1860183935=${name}` + // Name
      `&entry.564282981=${schnitzel}` + // Schnitzel
      `&entry.1079317865=${potato}` + // Potatoes
      `&entry.985590604=${duration}`; // Duration
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body, { headers });
  }
}
