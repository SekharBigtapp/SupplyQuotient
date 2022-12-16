import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/auth/login/services/login.service';
import { DataStorageService } from '../../services/data-storage.service';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  username: any;
  userRole: any;
  userToken : any;

  sidebar: boolean = false;

  token: any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    public dataStorage: DataStorageService
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        let loginData = JSON.parse(data);
        this.username = loginData.userdetails.userId;
        this.userRole = loginData.userdetails.userRole;
        this.userToken = loginData.userdetails.userToken;
        
      }
    


    }

    


  }

  onMobileNavClick(){
    this.sidebar = !this.sidebar;
  }



  onSignOut() {
    //alert();
    // debugger;
    alert("Are sure you want to signout");

    //debugger;
    let obj = {
      "Username": this.username,
      "Token_generated": this.userToken
    }

    console.log(obj);
    this.loginService.UserLogout(obj).subscribe((response) => {
      console.log(response)
      localStorage.clear();
      this.dataStorage.isUserLoggedIn = false;
      this.router.navigateByUrl("/")
      //   localStorage.removeItem('username');
      // localStorage.removeItem('token');
      // localStorage.removeItem('userRole');

    }, (error) => { console.log(error) }
    )
  }

}
