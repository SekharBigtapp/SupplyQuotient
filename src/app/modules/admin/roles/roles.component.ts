import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import MyAppHttp from 'src/app/core/services/myAppHttp.service';
import { RolesService } from './role.services';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  displayColumns: string[] = ['sno', 'Rolename', 'Actions']
  RolesList: any = [];
  AddRoleForm!: FormGroup;
  isAddRoleForm: boolean = false;
  filterData:any;
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageSize = 10;
  //storeNameList: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;   
 
  errorMessage: any;
  Message: any;
  errorType: any;
  validt: any;
  editMode: any;
  editedRole: any;

  constructor(private formBuilder: FormBuilder,private roleservices:RolesService) { }

  ngOnInit(): void {   
    this.filterData = {    
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'Rolename', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.AddRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });

    this.getRoles();
  
  }

  

  getRoles(){
    this.roleservices.getRolesList().subscribe((response) => {
      console.log(response)
      const rolesData: any = [];
      for (let i = 0; i < response.length; i++) {
        response[i].sno = i + 1;
        rolesData.push(response[i]);
      }
      this.RolesList = rolesData;
      console.log(rolesData)
      this.filterData.gridData = rolesData;
      this.dataSource = new MatTableDataSource(rolesData);
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      console.log(this.filterData.filterColumnNames)
      for (let col of this.filterData.filterColumnNames) {
        console.log(col.Value)
        col.Value = '';
      }
    });
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  onAddRoleSubmit(){
    if(this.AddRoleForm.valid){
      if(this.editMode){
        this.onEditMode();
      }else{
        let obj={
          "Rolename": this.AddRoleForm.value.roleName,
        }
        this.roleservices.addRoles(obj).subscribe((response) => {
    
          console.log(response);
    
          this.getRoles();
          this.isAddRoleForm = false;
          this.AddRoleForm.reset();
        });
      }
   
    }
  }
  

  onEditRole(val:any){
    console.log(val);
    
    this.editMode = true;
    this.editedRole = val;
    this.AddRoleForm = this.formBuilder.group({
      roleName: val.Rolename,
    });
    this.isAddRoleForm = true;

    

  }

  onEditMode(){
    
    let obj={
      "Id":this.editedRole.Id,
      "Rolename":this.AddRoleForm.value.roleName
    }
    this.roleservices.editRole(obj).subscribe((response) => {
    
      console.log(response);
      this.editMode = false;
      this.getRoles();
      this.isAddRoleForm = false;
      
     
    });

  }

 

  onDeleteRole(val:any){
    console.log(val);
    let obj={
      "Id" : val.Id,
    }

    this.roleservices.deleteRole(obj).subscribe((response) => {
      console.log(response);
      this.getRoles();
    })
  }
  
 

  onAddRole() {
    this.isAddRoleForm = true;
    this.AddRoleForm.reset();
  }

  onCancel() {
    this.isAddRoleForm = false;
  }
  setMessage(type: any, message: any) {
    this.errorMessage = true;
    this.errorType = type;
    this.Message = message;
    setTimeout(() => {
      this.errorMessage = false;
    }, MyAppHttp.notificationTimeOut);
  }

 

}
