import { Component, OnInit } from '@angular/core';
import { Encounter, Alien } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ENCOUNTERS_URL, ALIENS_URL } from '../models/API';
import { EncountersAPIService } from '../apiService/encounters';
import { AliensAPIService } from '../apiService/aliens';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss']
})
export class EncountersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
