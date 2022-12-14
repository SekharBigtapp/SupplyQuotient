import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { LoginService } from './services/login.service';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import MyAppHttp from 'src/app/core/services/myAppHttp.service';
import { UserIdleService } from 'angular-user-idle';
import { UserServices } from '../../admin/users/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  loginData: any;

  validation_messages = {
    userEmail: [
      { type: 'required', message: 'Please enter valid user Email' },
      { type: 'pattern', message: 'Please enter valid User Email' },
      { type: 'maxlength', message: 'Password should be maximum 50 characters.' }
    ],
    password: [
      { type: 'required', message: 'Please enter password' },
      { type: 'pattern', message: 'Please enter valid password' },
      { type: 'minlength', message: 'Password should be minimum 12 Alphanumeric characters length and should contain at least on upper case letter, one special and one numeric character. ' },
      { type: 'maxlength', message: 'Password should be maximum 20 characters.' }
    ]
  };

  errorFlag: boolean = false;
  authorizationMessage: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private useridle: UserIdleService,
    public dataStorage: DataStorageService) {

  }


  ngOnInit(): void {
    if (this.dataStorage.isUserLoggedIn) {
      let data = localStorage.getItem("userToken");
      if (data) {
        //this.loginData = JSON.parse(data);
        this.router.navigateByUrl("dashboard")
      }
    }
    this.LoginForm = this.formBuilder.group({
      userEmail: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
          ),
        ]),
      ],
      //password: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.pattern(MyAppHttp.passwordValidation)])],
      password: ['', Validators.compose([Validators.required])],
      //rememberMe: [false]
    });

  }

  stopWatching() {
    this.useridle.stopWatching();
  }
  clkSignin() {
    if (this.LoginForm.valid) {
      // alert("login")
      localStorage.setItem("Email", this.LoginForm.value.userEmail);
      localStorage.setItem("password", this.LoginForm.value.password);
      //let encryptedPassword = btoa(this.LoginForm.value.password);
      this.loginService.getLoginDetails(
        {
          "Email": this.LoginForm.value.userEmail,
          "Password": this.LoginForm.value.password,
        }
      ).subscribe((response) => {
        alert(response)
        console.log(response)
        //this.onSuccessfullLogin(response);
        this.router.navigateByUrl("dashboard")
        this.authorizationMessage = MyAppHttp.ToasterMessage.activeOrNot;
        this.dataStorage.isUserLoggedIn = true
        localStorage.setItem("userToken", response.userdetails.userToken);
        localStorage.setItem("Email", response.userdetails.userEmail)
        localStorage.setItem("userRole", response.userdetails.userRole)
        localStorage.setItem("userId", response.userdetails.userId)
      }, (error) => {
        console.log(error.error.message)
        this.errorFlag = true;
        this.authorizationMessage = error.error.message;
        // let errorMessage = error.error.response.message;
        // this.sendReceiveService.showToast(MyAppHttp.ToastType.ERROR, 'Error', errorMessage);
      });
    }
    else {
      this.errorFlag = true;
      // this.authorizationMessage = response.message;
      //this.sendReceiveService.showToast(MyAppHttp.ToastType.ERROR, 'Error', response.message);
    }
    console.log("Timmer is Starting");
    this.useridle.startWatching();
    this.useridle.onTimerStart().subscribe({
      next: (count) => {
        console.log(count);
        if (count > 1) {
          console.log("time is out ===> logout");
          let obj = {
            "userId": localStorage.getItem("userId"),
            "userToken": localStorage.getItem("userToken")
          }
          console.log(obj);
          this.loginService.UserLogout(obj).subscribe({
            next: (response) => {
              console.log(response);
              localStorage.clear();
              this.dataStorage.isUserLoggedIn = false;
              this.stopWatching();
              this.router.navigateByUrl('');
            },
            error: (error) => {

            }
          });
        } else {
          console.log("Working in use");
        }
      },
      error: (error) => {
        alert("anji");
      }
    });
    this.useridle.onTimeout().subscribe(() => console.log('Time is up!'));
  }
  // onSuccessfullLogin(response: any) {
  //   localStorage.clear();
  //   this.dataStorage.isUserLoggedIn = true;
  //   localStorage.setItem("Token_generated", response.Token_generated);
  //   localStorage.setItem("Email", response.userEmail)
  //   localStorage.setItem("role", response.role)
  //   localStorage.setItem("username", response.username)
  //   let data = localStorage.getItem("Token_generated");
  //   if (data) {
  //     //this.loginData = JSON.parse(data);
  //     this.router.navigateByUrl("dashboard")
  //   }
  //   if (this.loginData) {
  //     //this.getAllPermittedModules();
  //   }
  //   this.useridle.startWatching();
  //   this.useridle.onTimerStart().subscribe((count) => {
  //     if (count > 1) {
  //       this.loginService.UserLogout(this.loginData.userId).subscribe((resp: any) => {
  //         localStorage.clear();
  //         this.dataStorage.isUserLoggedIn = false;
  //         this.router.navigateByUrl('/');

  //       });
  //       console.log(count)
  //       this.stopWatching();
  //     }

  //   });
  //   this.useridle.onTimeout().subscribe(() => console.log('Time is up!'));
  // }


}


function dashboard(dashboard: any) {
  throw new Error('Function not implemented.');
}

