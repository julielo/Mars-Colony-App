import { Component, OnInit } from '@angular/core';
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

  newEncounter: NewEncounter;
  alienTypes: Alien[];
  colonist: Colonist[];
  reportForm: FormGroup;

  constructor(
    private aliensAPIService: AliensAPIService,
    private encountersAPIService: EncountersAPIService
  ) { 

  this.alienTypes = [
    {type: 'Ewok', submitted_by: '3', id: 5, description:'Furry and small'},
    {type: 'Octospider', submitted_by: '1', id: 2, description: 'Ewww'},
    {type: 'Endomorph', submitted_by: '2', id: 3, description: 'Doooood'},
    ];

  this.reportForm = new FormGroup ({
    atype: new FormControl('', [Validators.required]),
    action: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  })
}



// logAlien() {
//   console.log(this.reportForm);
// }

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
    console.log('Posting new encounter');
    if(this.reportForm.invalid) {
     console.log('form is invalid!');

    } else {
      const atype: string = this.reportForm.get('atype').value;
      const date: string = this.reportForm.get('date').value;
      const action: string = this.reportForm.get('action').value;
      const colonist_id: string = this.reportForm.get('colonist_id').value;

      const newEncounter: NewEncounter = new NewEncounter(atype, date, action, colonist_id);
      this.encountersAPIService.saveNewEncounter({ encounter: newEncounter })
                              .subscribe((result) => {
                              console.log('Encounter was saved:', result);
                              }); 
    }   
  }

}
