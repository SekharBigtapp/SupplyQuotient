import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolesService extends BaseHttp {
    getRoles: string = 'Roleread';
    addRoleUrl: string = 'Rolecreate';
    editRoleUrl: string = 'Roleedit';
    deleteRoleUrl: string = 'Roledelete';
   

    getRolesList() {
        return this.get<any>(this.getRoles);
    }

    addRoles(Role: any) {
        return this.post<any>(this.addRoleUrl, Role);
    }

    editRole(Role: any) {
        return this.post<any>(this.editRoleUrl, Role);
    }
    deleteRole(role: any) {
        return this.post<any>(this.deleteRoleUrl, role);
    }

  
}