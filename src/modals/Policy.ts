export class Policy {
    
    public policyId: number;
    public policyName: string;
    public startDate: Date;
    public endDate: Date;
    public costOfPolicy: number;
    public createdAt: Date;
    public typeOfPolicy: string;

    constructor($policyId: number=0, $policyName: string='', $startDate: Date=new Date(), $endDate: Date=new Date(), $costOfPolicy: number=0, $createdAt: Date=new Date(), $typeOfPolicy: string='car') {
		this.policyId = $policyId;
		this.policyName = $policyName;
		this.startDate = $startDate;
		this.endDate = $endDate;
		this.costOfPolicy = $costOfPolicy;
    this.createdAt = $createdAt;
    this.typeOfPolicy = $typeOfPolicy;
	}

}