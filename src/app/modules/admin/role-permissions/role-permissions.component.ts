import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolePermissionService } from './role-permissions.services';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.css']
})

export class RolePermissionsComponent implements OnInit {
  displayedColumns: string[] = ['menu_name', 'submenu_name', 'permission', 'Actions'];
  dataSource!: MatTableDataSource<any>;

  rolePermissionform!: FormGroup;
  RolesList: any = [];
  roleName: any;
  AccessPermissionsList: any = [];

  RolePermissionValue: any;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  validation_messages = {
    Role: [
      { type: 'required', message: 'Please select Role' }
    ]
  }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder, private rolePermissionService: RolePermissionService) { }



  ngOnInit(): void {

    this.getRoles(this.roleName);
    this.rolePermissionform = this.formBuilder.group({
      Role: ["", Validators.required]
    })
  }

  getRoles(roleName: any) {
    this.rolePermissionService.GetRoles().subscribe((response) => {
      console.log(response);
      for (let roles of response) {
        this.RolesList.push(roles);
        //this.roleName = roles.Rolename;
      }
    })
  }
  onRoleSubmit() {
    console.log(this.roleName)
    let obj = {
      "RoleName": ""
    }
    for (let roles of this.RolesList) {
      //console.log(roles)
      //console.log(roles.Id);
      if (roles.Id == this.rolePermissionform.value.Role) {
        obj.RoleName = roles.Rolename

      }
    }

    console.log(obj.RoleName)
    this.rolePermissionService.getRolePermissionList(obj).subscribe((response) => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response.data)
      this.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sort = this.sort;
    })
  }
  onCancel() {

  }
  onEditRolePermission(issuePermission: any) {
    issuePermission.editMode = true;

    this.rolePermissionService.gerPermissionlist().subscribe((response) => {
      console.log(response);
      this.AccessPermissionsList = response;
    })
  }

  onSaveRolePermission(element: any) {
    console.log(element.permission_id);
    console.log(this.RolePermissionValue);
    let obj = {
      "RoleName": "",
      "permissions_id": this.RolePermissionValue,
      "menu_id": element.menu_id,
      "submenu_id": element.submenu_id,
    }
    for (let roles of this.RolesList) {
      if (roles.Id == this.rolePermissionform.value.Role) {
        obj.RoleName = roles.Rolename
      }
    }

    console.log(obj.RoleName)
    this.rolePermissionService.updateRolePermission(obj).subscribe((response) => {
      console.log(response);
      element.editMode = false;
      this.getRoles(element.RoleName);

    })
    this.onRoleSubmit();
  }
  onDeleteRole() {

  }
}
