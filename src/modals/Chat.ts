export class Chat{
    public msg: string;
    public msgTime: Date;
    public from: string;


	constructor($msg: string, $msgTime: Date, $from: string) {
		this.msg = $msg;
		this.msgTime = $msgTime;
		this.from = $from;
	}
    
}