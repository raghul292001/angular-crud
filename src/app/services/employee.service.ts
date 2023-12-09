import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = "http://localhost:3000/employee"
  constructor( private http:HttpClient) { }

  addEmployee(obj:any):Observable<any>{
    return this.http.post(this.url,obj);
  }
  getAllEmployee():Observable<any>{
    return this.http.get(this.url );
  }
  deleteEmployeeById(id:number):Observable<any>{
    return this.http.delete(this.url+`/${id}`);
  }
  updateEmployeeById(id:number,obj:any):Observable<any>{
    return this.http.put(this.url+`/${id}`,obj);
  }
}
