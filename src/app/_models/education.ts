export class Education{
    id?:string;
    resumeId?:string;
    educationLevelId:string;
    educationFieldId:string;
    institution:string;
    country:string;
    city:string;
    result:string;
    isStudying:boolean;
    startMonth:string;
    startYear:string;
    endMonth:string;
    endYear:string;
    constructor(data ?:any){
        this.id=(data) ? data.id :'';
        this.resumeId=(data) ? data.resumeId :'';
        this.educationLevelId=(data) ? data.educationLevelId :'';
        this.educationFieldId=(data) ? data.educationFieldId :'';
        this.institution=(data) ? data.institution :'';
        this.country=(data) ? data.country :'';
        this.city=(data) ? data.city :'';
        this.result=(data) ? data.result :'';
        this.isStudying=(data) ? data.isStudying :'';
        this.startMonth=(data) ? data.startMonth :'';
        this.startYear=(data) ? data.startYear :'';
        this.endMonth=(data) ? data.endMonth :'';
        this.endYear=(data) ? data.endYear :'';
    }
}