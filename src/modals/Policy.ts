export class Policy {
    
    public policyId: string='';
    public policyName: string;
    public startDate: Date=new Date();
    public endDate: Date=new Date();
    public costOfPolicy: number;
    public createdAt: Date;
    public typeOfPolicy: string='car';
    public user_id: string='admin';

}