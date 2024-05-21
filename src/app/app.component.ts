import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { HttpService } from './http.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet, 
    CommonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatSelectModule, 
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  classes:any;
  ngOnInit(): void {
    this.classes = this.httpService.getClasses().subscribe((result: any) => {
      this.classes = result
      console.log(this.classes)
    })
  }
  

  title = 'reactive-form';
  hidden = false;

  httpService = inject(HttpService)

  formBuilder = inject(FormBuilder)

  studentForm : FormGroup = this.formBuilder.group({
    name : ['',[Validators.required]],
    age : [null],
    class : [null, [Validators.required]],
    address : [''],
    email : ['', [Validators.required, Validators.email]],
    isActive : [true]
  })


  formSave() {
    const formValue = this.studentForm
    console.log(formValue.value)
    if(formValue.valid) {
      this.httpService.addStudent(formValue.value).subscribe(() => {
        alert("student saved")
        this.studentForm.reset()
      })
    }
  }
}
