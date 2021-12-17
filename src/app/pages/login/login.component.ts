import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:"",
    password:""
  };

  constructor(private _snack:MatSnackBar, private login:LoginService, private router:Router) { 

  }

  ngOnInit(): void {
  }

  reset(){
    this.loginData.username = "";
    this.loginData.password = "";
  }

  formSubmit(){
    console.log("Login Button Clicked");
    if( this.loginData.username.trim() == "" || this.loginData.username==null){
      this._snack.open('Username is Required', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['red-snackbar'],
      });
      return;
    }
    if( this.loginData.password.trim() == "" || this.loginData.password==null){
      this._snack.open('Password is Required', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['red-snackbar'],
      });
      return;
    }

    //request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data)

        //login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect ... ADMIN: admin-dashboard
            if(this.login.getUserRole() == "admin"){
              this.router.navigateByUrl('/admin/home');
              this.login.loginStatusSubject.next(true);
              //window.location.href='/admin';
            }else if(this.login.getUserRole() == "normal"){
              this.router.navigateByUrl('/user-dashboard/user-home');
              this.login.loginStatusSubject.next(true);
              //window.location.href='/user-dashboard';
            }else {
              this.login.logout();
            }
            
            //redirect ... NORMAL: normal-dashbard

          }
        )
      },
      (error)=>{
        console.log("Error!!")
        console.log(error);
        this._snack.open('Invalid Credentials', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
        });
      }
    )

  }

}
