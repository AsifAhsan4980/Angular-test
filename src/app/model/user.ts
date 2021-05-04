
export class User{
    userId:string;
    clientId:string;
    firstName:string;
    lastName:string;
    fullName:string;
    email:string;
    phoneNumber:string;
    userName:string;
    shortDescription:string;
    locationTypeId:string;
    locationTypeName:string;
    locationGroupId:string;
    locationGroupName:string;
    isActive:boolean;
    userGroupSet : [];
    assignRoleNames : [];
    
    constructor(user?:any) {
        if(user){
            this.clientId = user.clientId;
            this.userId = user.userId;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.fullName = user.fullName;
            this.email = user.email;
            this.phoneNumber = user.phoneNumber;
            this.userName = user.userName;
            this.shortDescription = user.shortDescription;
            this.locationTypeId = user.locationTypeId;
            this.locationTypeName = user.locationTypeName;
            this.locationGroupId = user.locationGroupId;
            this.locationGroupName = user.locationGroupName;
            this.isActive = user.isActive;
            this.userGroupSet = user.userGroupSet;
            this.assignRoleNames = user.assignRoleNames;
        }else{
            this.clientId = 'cl001';
            this.userId = '';
            this.firstName = '';
            this.lastName = '';
            this.fullName = '';
            this.email = '';
            this.phoneNumber = '';
            this.userName = '';
            this.shortDescription = '';
            this.locationTypeId = '';
            this.locationTypeName = '';
            this.locationGroupId = '';
            this.locationGroupName = '';
            this.isActive = true;
            this.userGroupSet = [];
            this.assignRoleNames = [];
        }
    }
}