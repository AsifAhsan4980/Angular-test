export class Certificate {
    id?: string;
    resumeId?: string;
    title: string;
    description: string;
    isWorking: boolean;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    constructor(data?: any) {
        this.id = data ? data.id : '';
        this.resumeId = data ? data.resumeId : '';
        this.title = data ? data.title : '';
        this.description = data ? data.description : '';
        this.isWorking = data ? data.isWorking : '';
        this.startMonth = data ? data.startMonth : '';
        this.startYear = data ? data.startYear : '';
        this.endMonth = data ? data.endMonth : '';
        this.endYear = data ? data.endYear : '';
    }
}
