import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewColonist, Job } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { JOBS_URL, COLONISTS_URL } from '../models/API';
import { ColonistAPIService } from '../apiService/colonist';
import { JobsAPIService } from '../apiService/jobs';
import { Http, Response } from '@angular/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ColonistAPIService, JobsAPIService ]
})
export class RegisterComponent implements OnInit {

  marsJobs: Job[];
  registerForm: FormGroup;
  invalidInput: boolean;


  constructor(
    private colonistApiService: ColonistAPIService,
    private jobsAPIService: JobsAPIService,
    private router: Router
    ) { 
    
    this.getMarsJobs();
    this.invalidInput = false;
    
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

  ngOnInit() {

  }

  getMarsJobs() {
    this.jobsAPIService.getMarsJobs()
                      .subscribe((result) => {
                        console.log('Got mars jobs!', result);
                        this.marsJobs = result;
                      });
  }

  postNewColonist(event) {
    event.preventDefault();
    console.log('Posting new colonist');
    if(this.registerForm.invalid) {
     console.log('form is invalid!');
     this.invalidInput = true;

    } else {
      const name: string = this.registerForm.get('name').value;
      const age: string = this.registerForm.get('age').value;
      const job_id: string = this.registerForm.get('job_id').value;

      const newColonist: NewColonist = new NewColonist(name, age, job_id);
      this.colonistApiService.saveColonist({ colonist: newColonist })
                              .subscribe((result) => {
                              console.log('Colonist was saved:', result);
      this.router.navigate(['encounters']);
                            }); 
      
    }   
  }
}

