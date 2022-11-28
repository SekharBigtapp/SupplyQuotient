import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
    // { path: 'users', component: AdminComponent },
   { path: 'roles', component: RolesComponent },
    // { path: 'rolePermission', component: AdminComponent },
    // { path: 'memu', component: AdminComponent },
    // { path: 'submenu', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
