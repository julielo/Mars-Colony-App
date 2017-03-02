import { Component, OnInit } from '@angular/core';
import { NewEncounter, Alien, Colonist } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  newEncounter: NewEncounter;
  alienType: Alien[];
  colonist: Colonist[];
  reportForm: FormGroup;

  constructor() { 

  this.alienType = [
    {type: 'Ewok', submitted_by: '3', id: 5, description:'Furry and small'},
    {type: 'Octospider', submitted_by: '1', id: 2, description: 'Ewww'},
    {type: 'Endomorph', submitted_by: '2', id: 3, description: 'Doooood'},
    ];

  this.reportForm = new FormGroup ({
    atype: new FormControl('', [Validators.required]),
    action: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  })
  

  // this.colonist = [
  //   {name: 'Barney', id: 3, age: 43, job: marsJobs.job[] },
  //   {name: 'Bob', id: 1, age: 35, job: 'job'},
  //   {name: 'Jane', id: 2, age: 20, job: 'Job'},
  // ];  
}



logAlien() {
  console.log(this.reportForm);
}

  ngOnInit() {
  }

}
