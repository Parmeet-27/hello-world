import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrl: './rform.component.css'
})
export class RformComponent implements OnInit{

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder){
    // this.filterRecordsByName('Parmeet');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['',Validators.required],
      pwd: ['',Validators.required]
    })
  }
  records = [
    { name: 'Parmeet', pwd: 'value1' },
    { name: 'Ajay', pwd: 'value2' },
    { name: 'Manay', pwd: 'value3' },
    // ... other records
  ];

  filteredRecords!: any[]; 
  
  filterRecordsByName(name: string) {
    this.filteredRecords = this.records.filter(record => record.name == name);
  }
  filtered() {
    debugger
    this.filterRecordsByName('Parmeet');
  }
 
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
    else{
      // console.log("Form is not valid");
      this.validateAllFormFields(this.loginForm);
      alert("Invalid Form")
    }
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf : true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}
