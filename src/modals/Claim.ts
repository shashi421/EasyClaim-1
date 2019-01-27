export class Claim {
    public claimId: string;
    public policyId: string;
    public typeOfClaim: string;
    public claimName: string;
    public status: string;
    public isApproved: boolean;
    public createdAt: Date;
    public user_id: string;

    constructor($claimId: string = '', $policyId: string = '', $typeOfClaim: string = 'car', $ClaimName: string = '', $isApproved: boolean = false, $createdAt: Date = new Date(), $status:string='', $userId: string='') {
        this.claimId = $claimId;
        this.policyId = $policyId;
        this.typeOfClaim = $typeOfClaim;
        this.claimName = $ClaimName;
        this.isApproved = $isApproved;
        this.createdAt = $createdAt;
        this.status = $status;
        this.user_id = $userId;
    }
}

