import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/notifier.service';
import { MenuServices } from './menu.services';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})



export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'Menu_name', 'Menu_url', 'Actions'];


 // isAddMenushow:boolean = false;
  isAddMenuForm :boolean = false;

  addUserform!: FormGroup;
  filterdata: any;
  gridData = [];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  AllMenu: any = [];
  editMode: any;
  editMenu : any;


  addMenuform! : FormGroup;

  validation_messages = {
    MenuName: [
      { type: 'required', message: 'Please Enter Menu Name' },
    ],
    MenuUrl: [
      { type: 'required', message: 'Please Enter Menu Url' },
    ],
     
  };
  

  constructor(
    private router: Router, 
    private notifierService : NotifierService,
    private formBuilder: FormBuilder,
    private Menuservice: MenuServices,
  ) { }

  ngOnInit(): void {
    this.filterdata = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'Menu_name', "Value": "" },
        { "Key": 'Menu_url', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort,
    }

    this.getAllMenus();

    this.addMenuform = this.formBuilder.group({
      MenuName: ['',Validators.required],
      MenuUrl: ['',Validators.required],
    })


  }

  getAllMenus(){
    this.Menuservice.GetMenus().subscribe((response)=>{
      console.log(response);
      const menuList : any=[];

      for(let i=0; i<response.length ; i++) {
        response[i].sno= i+1;
        menuList.push(response[i]);      
      } 

      this.AllMenu = menuList;
      console.log (this.AllMenu);
      this.filterdata.gridData = menuList;
      //console.log(this.filterdata.gridData);
      this.dataSource = new MatTableDataSource(menuList);
      //console.log(this.dataSource);
      this.filterdata.dataSource = this.dataSource;
      console.log(this.filterdata.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
    
  }

  AddMenuSubmit(){
    if (this.addMenuform.valid){
      if (this.editMode){
        this.menuEditSave();
      }
      else{

        let obj = {
          "Menu_name": this.addMenuform.value.MenuName,
          "Menu_url": this.addMenuform.value.MenuUrl,
        }
        alert()
        this.Menuservice.AddMenu(obj).subscribe((response)=>{
          console.log(response);
          this.getAllMenus();
          this.isAddMenuForm = false;
          this.addMenuform.reset();
        })
    
      }
    }

  }

  onAddMenuClick(){
    this.isAddMenuForm = true;
  }

  cancelClick(){

    //this.addMenuform.reset();
    //this.isAddMenuForm= false;
  }
  clearClick(){
    this.addUserform = this.formBuilder.group({
      Username: [""],
      Display_Name: [""],
      email: [""],
      Password: [""],
      Role: [""],
    })
  }
  

  onMenuEdit(value:any){
    this.editMode = true;
    this.editMenu = value;
    this.addMenuform = this.formBuilder.group ({
      MenuName: value.Menu_name,
      MenuUrl: value.Menu_url,
    })
    this.isAddMenuForm = true;
  }

  menuEditSave(){
    let obj = {
      "Id" : this.editMenu.Id,
      "Menu_name": this.addMenuform.value.MenuName,
      "Menu_url": this.addMenuform.value.MenuUrl,
    }
    this.Menuservice.EditMenu(obj).subscribe((response) =>{
      console.log(response);
      this.editMode = false;
      this.getAllMenus();
      this.isAddMenuForm = false;
      this.addMenuform.reset();
    } )
      

  }

  onMenuDelete(value:any){
    var message = 'Are you sure you want to delete?';
    alert(message);
    let obj ={
      "Id" : value.Id,
    }
    this.Menuservice.DeleteMenu(obj).subscribe((response)=>{
      console.log(response);
      this.getAllMenus();

    })
  }

}
