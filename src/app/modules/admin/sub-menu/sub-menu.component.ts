import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SubMenuServices } from './sub-menu.services';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {
  displayedColumns: string[] = ['sno','Submenu_name', 'Submenu_url', 'Actions'];
  isAddSubMenuForm : boolean = false;
  filterdata:any;
  gridData = [];
  addSubMenuform!: FormGroup;
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;  
  SubMenuList: any = [];
  MenuList:any = [];
  

  errorMessage: any;
  Message: any;
  errorType: any;
  validt: any;
  editMode: any;
  editedRole: any;

  
  
  validation_messages = {
    SubMenuName: [
      { type: 'required', message: 'Please EnterSubMenuName' },
    ],
    SubMenuUrl: [
      { type: 'required', message: 'Please Enter SubMenuUrl' },
    ],
   
    Menu: [
      { type: 'required', message: 'Please Select Menu Type' },
    ],
     
  };
  confirmationDialogService: any;
  

  constructor( private submenuservices:SubMenuServices, 
    private router: Router, 
    //private notifierService : NotifierService,
    private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.filterdata = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'Submenu_name', "Value": "" },
        { "Key": 'Submenu_url', "Value": "" },       
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    //this.getAllUsers();
    //this.getSubMenus();
    this.getMenus();
   
    this.addSubMenuform = this.formBuilder.group({
      Menu: ['',Validators.required],
      SubMenuName: ['',Validators.required],
      SubMenuUrl: ['',Validators.required],
      
    })
    
  }

  getSubMenus() {
    this.submenuservices.getSubMenuList().subscribe((response)=>{
      console.log(response);
      const submenuData: any = [];
      for (let i = 0; i < response.length; i++) {
        response[i].sno = i + 1;
        submenuData.push(response[i]);
      }

      for (let menu of submenuData) {
        for (let menus of this.MenuList) {
          if (menu.Id == menus.Id) {
            menu.Menu_name = menus.Menu_name;
          }
        }
      }

      this.SubMenuList = submenuData;     
      this.filterdata.gridData = submenuData;      
      this.dataSource = new MatTableDataSource(submenuData);
      this.filterdata.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterdata.sort = this.sort;
     
      
    })
  }
  
  getMenus(){
    this.submenuservices.getMenuList().subscribe((response) => {
      console.log(response);

      for(let menus of response){
        //if(roles.isActive == 'N')
        //{
          this.MenuList.push(menus);
       // }
      }
      console.log(this.MenuList)
    })

    this.getSubMenus();
  }

  onAddSubMenu(){
    this.isAddSubMenuForm=true;
  }
  

  onAddSubMenuSubmit(){   
    if (this.addSubMenuform.valid){
      if (this.editMode){
        this.subMenuEdit();
      }
      else{
        let obj = {
          "Menu_Id" : this.addSubMenuform.value.Menu.toString(),
          "Submenu_name" : this.addSubMenuform.value.SubMenuName,
          "Submenu_url" : this.addSubMenuform.value.SubMenuUrl
          
        }
        this.submenuservices.addSubMenuList(obj).subscribe((response) =>{
          console.log(response);
          // this.router.navigateByUrl('/user')
          this.getSubMenus();
          this.isAddSubMenuForm = false;
          this.addSubMenuform.reset();
        })    
      }
    }
    
  }

  onSubMenuEdit(value:any){
    console.log(value.Id)
    this.editMode = true;
    this.editedRole = value;
    this.addSubMenuform = this.formBuilder.group({
      Menu: value.Menu_Id,
      SubMenuName: value.Submenu_name,
      SubMenuUrl: value.Submenu_url,
      
    })
    this.isAddSubMenuForm = true;
  }
  subMenuEdit(){
    let obj = {
      "Menu_Id": this.addSubMenuform.value.Menu.toString(),
      "Submenu_name":this.addSubMenuform.value.SubMenuName,
      "Submenu_url":this.addSubMenuform.value.SubMenuUrl,
      "Id":this.editedRole.Id
    }
    this.submenuservices.editSubMenuList(obj).subscribe((response) =>{
      console.log(response);
      this.editMode = false;
      this.getSubMenus();
      this.isAddSubMenuForm = false;
      this.addSubMenuform.reset();
    } )
      

  }
  onSubMenuDelete(value:any){
    var message = 'Are you sure you want to delete?';
    alert(message);
    // this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete User?')
    // .then((confirmed: any) => console.log('User confirmed:', confirmed))
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    
    let obj ={
      "Id": value.Id
    }
    this.submenuservices.deleteSubMenuList(obj).subscribe((response)=>{
      console.log(response);
      this.getSubMenus();

    })
  }

  cancelClick(){

    this.addSubMenuform.reset();
    this.isAddSubMenuForm= false;
  }

  onBack(){
    this.router.navigateByUrl('/admin/menu')
  }
 

}
