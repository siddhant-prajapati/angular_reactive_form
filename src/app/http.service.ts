import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  httpClient = inject(HttpClient)

  getClasses() {
    return this.httpClient.get("http://localhost:3000/classes")
  }

  addStudent(student: object) {
    return this.httpClient.post("http://localhost:3000/students", student)
  }
}
