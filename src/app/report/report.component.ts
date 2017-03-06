import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewEncounter, Alien, Colonist } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ALIENS_URL, ENCOUNTERS_URL } from '../models/API';
import { AliensAPIService } from '../apiService/aliens';
import { EncountersAPIService } from '../apiService/encounters';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ AliensAPIService, EncountersAPIService ]
})
export class ReportComponent implements OnInit {

  alienTypes: Alien[];
  reportForm: FormGroup;
  invalidInput: boolean;

  constructor(
    private aliensAPIService: AliensAPIService,
    private encountersAPIService: EncountersAPIService,
    private router: Router
  ) { 

    this.getAlienTypes();
    this.invalidInput = false;

  this.reportForm = new FormGroup ({
    atype: new FormControl('',[Validators.required]),
    action: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  })
}

getAlienTypes() {
    this.aliensAPIService.getAlienTypes()
                      .subscribe((result) => {
                        console.log('Got alien types!', result);
                        this.alienTypes = result;
                      });
}

ngOnInit() {
  }


postNewEncounter(event) {
    event.preventDefault();
    if(this.reportForm.invalid) {
     this.invalidInput = true;

    } else {
      const atype: string = this.reportForm.get('atype').value;
      const date = new Date().toISOString().substring(0,10);
      const action: string = this.reportForm.get('action').value;
      const colonist_id = '501';      

      const newEncounter: NewEncounter = new NewEncounter(atype, date, action, colonist_id);
      const encounterPostRequest = {encounter: newEncounter};
      console.log('atype');
      this.encountersAPIService.saveNewEncounter( encounterPostRequest )
                              .subscribe((result) => {
      this.router.navigate(['encounters']);
                              }); 
    }   
  }

}