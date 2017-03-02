import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { JOBS_URL, COLONISTS_URL } from '../models/API'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newColonist: NewColonist;
  marsJobs: Job[];
registerForm: FormGroup;

  constructor() { 
    //TODO: Call API, get jobs.
    
    
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      age: new FormControl('', [Validators.required, this.acceptAge(18, 50)]),
      job_id: new FormControl('', [Validators.required]),
    });
  }

  acceptAge(min: number, max: number) {
    return (control: AbstractControl): {[key: string]: any} => {
      if(control.value < min || control.value > max) {
        return { 'Sorry, good luck!': { age: control.value }};
      }
    }
  }

  logColonist() {
    console.log(this.registerForm);
  }

  ngOnInit() {

  }
}
