export interface Colonist {
    name: string;
    id: number;
    age: number;
    job: Job;
}

export class NewColonist {
    name: string;
    age: number;
    job_id: Job;
}

export interface Encounter {
    id: number;
    date: string;
    colonist_id: number;
    atype: string;
    action: string;
}

export class NewEncounter {
    atype: string;
    date: string;
    action: string;
    colonist_id: string;
}

export interface Alien {
    type: string;
    submitted_by: string;
    id: number;
    description: string;
}

export interface Job {
    name: string;
    id: number;
    description: string;
}