
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{

  
  education:string[]=[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  constructor(private _fb:FormBuilder,private service:EmployeeService,private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any     
    ){

  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  empForm = this._fb.group({
    firstName:this._fb.control(''),
    lastName:this._fb.control(''),
    email:this._fb.control(''),
    dob:this._fb.control(''),
    gender:this._fb.control(''),
    education:this._fb.control(''),
    company:this._fb.control(''),
    experience:this._fb.control(''),
    package:this._fb.control(''),

  })

  onFormSubmit(){
    if(this.empForm.valid) {
      if(this.data){
        this.service.updateEmployeeById(this.data.id,this.empForm.value).subscribe((res:any)=>{
          if(res!=null){
            console.log(res);
            alert("Updated Successful");
            this._dialogRef.close(true);
            
          }else{
            console.log(res.message)
          }

        })

      }else{
        this.service.addEmployee(this.empForm.value).subscribe((res:any)=>{
          if(res!=null){
            console.log(res);
            alert("Added Successful");
            this._dialogRef.close(true);
            
          }else{
            console.log(res.message)
          }
        })

      }
    }
  }
}
