import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  menuList: any = [];
  loginData: any;
  menuId: any;
  selectedIndex: number = 0;
  isRefresh!: boolean;
  selectedSubModuleId: any;
  className: any;

  dashboardStatus: boolean = false;
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  sidebar: boolean = false;
  

  constructor(public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        this.loginData = JSON.parse(data);
        this.menuList = this.loginData.permissionlist;
        console.log("Login Data", this.menuList);
        localStorage.setItem("MenuList", JSON.stringify(this.menuList));
      }
      this.className = false;
     // this.isRefresh = browserRefresh;
      this.selectedIndex = 0;
      this.menuId = 1;
      this.onClickDash();
      this.refresh();
    }
  }

  refresh() {
    if (!this.isRefresh) {
      return;
    }
    this.className = false;
    if (localStorage.getItem('menuIndex')) {
      this.selectedIndex = Number(localStorage.getItem('menuIndex'));
    }
    this.selectedSubModuleId = localStorage.getItem('selectedSubModuleId');
    const selectedSubMenuId = Number(this.selectedSubModuleId);
    this.menuList.forEach((module: any) => {
      (module.subModules).forEach((subModule: any) => {
        if (subModule.subModuleId === selectedSubMenuId) {
          this.menuId = subModule.subModuleId;
        }
      });
    });
  }

  onModule(index: any) {
    // alert(index);
    this.selectedIndex = index;
    localStorage.setItem("menuIndex", index);
  }
  onMobileNavClick() {
    this.sidebar = !this.sidebar;
  }

  navigateToSubMenu(menu: any) {
    this.dashboardStatus = false;
    this.menuId = menu.subModuleId;
    console.log(this.menuId);
    localStorage.setItem("selectedSubModuleId", this.menuId)
    // this.sendReceiveService.navigateToMenu(this.menuId);
    this.router.navigateByUrl(menu.subModuleurl);
  }

  subMenuIcon(menu: any) {
    return "fa-solid fa-house";
  }

  onClickDash() {
    this.dashboardStatus = true;
    this.selectedIndex = -1;
    this.menuId = 1;
  }

}
