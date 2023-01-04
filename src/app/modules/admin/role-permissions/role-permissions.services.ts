import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolePermissionService extends BaseHttp {
    getRolePermission: string = 'getPermission';
    getRolesUrl: string = "Roleread";
    updatePermissionurl : string = "updatePermission";
    permissionUrl : string = "Permission";

    getRolePermissionList(obj:any) {
        return this.post<any>(this.getRolePermission, obj);
    }

    GetRoles(){
        return this.get<any>(this.getRolesUrl)
    }
    updateRolePermission(obj: any){
        return this.post<any>(this.updatePermissionurl, obj)
    }

    gerPermissionlist(){
        return this.get<any>(this.permissionUrl)
    }
   

  
}