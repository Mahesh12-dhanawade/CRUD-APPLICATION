import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmplyoeeService {

 
  baseUrl = "https://backend-crud-fb9d.onrender.com/";
  
  constructor(private http:HttpClient) { }
  


  addEmp(data:any): Observable<any>{
    return this.http.post(this.baseUrl + 'emplyoee', data)
  }

  updateEmp(id:number , data:any): Observable<any>{
    return this.http.put( this.baseUrl + `emplyoee/${id}`, data)
  }
  
  getEmpList(): Observable<any>{
    return this.http.get(this.baseUrl + 'emplyoee')
  }

  deleteEmp(id:number): Observable<any>{
    return this.http.delete(this.baseUrl + `emplyoee/${id}`)
  }
}
