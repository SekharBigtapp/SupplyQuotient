
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class UserServices extends BaseHttp {
  usersListUrl: string = 'userRead';
  addUserUrl : string = 'userRegister';
  getRolesUrl: string = "Roleread";
  EditUserUrl: string = "userEdit"
  DeleteUserIrl : string = "userDelete"

 GetUsers(){
    return this.get<any>(this.usersListUrl);
 }
 AddUsers(obj:any){
    return this.post<any>(this.addUserUrl,obj);
 }
 EditUser(obj:any){
   return this.post<any>(this.EditUserUrl,obj);
}
DeleteUser(obj:any){
   return this.post<any>(this.DeleteUserIrl, obj);
}
 GetRoles(){
  return this.get<any>(this.getRolesUrl)
 }
 
}