import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Job, Colonist, NewColonist } from '../models';

export class ColonistAPIService {
    fetchJobs(): Observable<Job[]> {

    }
}