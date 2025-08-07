export interface BaseUser {
	id: string;
	uid: string;
	username: string;
	nickname: string;
	email: string;
	avatar: string;
}
export interface AppUser extends BaseUser {
	access_token: string;
}
export interface IMAddress {
	tcp_addr: string;
	ws_addr: string;
	wss_addr: string;
}
