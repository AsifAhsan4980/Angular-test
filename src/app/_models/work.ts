export class Work{
    id?:string;
    resumeId?:string;
    title:string;
    company:string;
    description:string;
    city:string;
    isWorking:boolean;
    startMonth:string;
    startYear:string;
    endMonth:string;
    endYear:string;
    haveNoExperience:boolean;
    constructor(data ?:any){
        this.id=(data) ? data.id :'';
        this.resumeId=(data) ? data.resumeId:'';
        this.title=(data) ? data.title :'';
        this.company=(data) ? data.company :'';
        this.description=(data) ? data.description :'';
        this.city=(data) ? data.city :'';
        this.isWorking=(data) ? data.isWorking :'';
        this.startMonth=(data) ? data.startMonth :'';
        this.startYear=(data) ? data.startYear :'';
        this.endMonth=(data) ? data.endMonth :'';
        this.endYear=(data) ? data.endYear :'';
        this.haveNoExperience=(data) ? data.haveNoExperience :'';
    }
}