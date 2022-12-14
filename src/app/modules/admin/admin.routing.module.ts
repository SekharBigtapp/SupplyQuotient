import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
    { path: 'users', component: UsersComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'rolePermission', component: RolePermissionsComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'subMenu', component: SubMenuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
