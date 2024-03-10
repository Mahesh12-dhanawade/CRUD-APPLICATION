import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmplyoeeService } from '../emplyoee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  empForm : FormGroup;
  
  education: string[] = [
    "HSC",
    "SSC",
    "Graduation", 
    "PostGraduction"
    
  ];

  constructor(private fb: FormBuilder, 
    private empService: EmplyoeeService , 
    private dialogRef :MatDialogRef<EmpAddEditComponent> ,
    
    @Inject(MAT_DIALOG_DATA) public data:any
    ) 


    {
    this.empForm = this.fb.group({
      firstname:'', 
      lastname : '', 
      email: '', 
      dob: '', 
      gender:'',
      education:'',
    })
   }
  
   ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

   onFormSubmit(){
    
    if(this.empForm.valid){
      if(this.data){
        this.empService.updateEmp(this.data.id, this.empForm.value).subscribe({
          next :(val: any)=>{
            alert("Employee information updated Successfully")
            this.dialogRef.close(true);
          },
          error: (err:any) =>{
            console.error(err);
          }
        
        })

      }
      else{
        console.log(this.empForm.value)
        this.empService.addEmp(this.empForm.value).subscribe({
          next :(data: any)=>{
            alert("Employee Added Successfully")
            this.dialogRef.close(true);
          },
          error: (err:any) =>{
            console.error(err);
          }
        })
        
      }
    
    }
   }
 
  
}
