export interface BaseUser {
	id: string;
	uid: string;
	username: string;
	nickname: string;
	email: string;
	avatar: string;
	organization:BaseOrganization|undefined
	role:BaseRole
}
export interface BaseOrganization {
	"id": string,
	"code": string,
	"name": string,
	"status": 1|0,
	"type": 0|number,
	"remark"?: null|string
}
export interface BaseRole {
	id:string
	name:string
	value:string
}
export interface AppUser extends BaseUser {
	access_token: string;
}
export interface IMAddress {
	tcp_addr: string;
	ws_addr: string;
	wss_addr: string;
}
