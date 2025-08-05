export interface BaseUser {
    id:string;
    uid:string;
    username:string;
    nickname:string;
    email:string;
    avatar:string;
}
export interface AppUser extends BaseUser{
    access_token:string
}