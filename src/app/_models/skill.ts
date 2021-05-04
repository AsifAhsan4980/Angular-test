export class Skill{
    id?:string;
    resumeId?:string;
    skillName:string;
    skillType:number;
    constructor(data ?:any){
        this.id=(data) ? data.id :'';
        this.resumeId=(data) ? data.resumeId:'';
        this.skillName=(data) ? data.skillName:'';
        this.skillType=(data) ? data.skilltype:'';
    }
}