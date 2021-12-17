import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private _snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if( this.user.username == "" || this.user.username == null ){
      this._snack.open('Username is Required', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['red-snackbar'],
      });
      return;
    }

    //addUser : userservice
    this.userService.addUser(this.user).subscribe(
      (data: any)=>{
        //success
        console.log(data);
        Swal.fire("Great Success", "User with ID "+data.id+" is Registered", 'success')
        /*
        this._snack.open('Registered Successfully', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['green-snackbar'],
        });
        */
      },
      (error)=>{
        //error
        console.log(error);
        this._snack.open('Something went Wrong', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
        });
      }
    );
  }
  
  reset(){
    this.user.username = '',
    this.user.password = '',
    this.user.firstName = '',
    this.user.lastName = '',
    this.user.email = '',
    this.user.phone = ''
  }

}
