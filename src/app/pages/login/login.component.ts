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
    username: '',
    password: '',
  }
  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {

    console.log("Login form submitted")

    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open("Username is required!", "", {
          duration:3000
      });
        return;
    }


    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("Password is required!", "", {
          duration:3000
      });
        return;
    }

    // Request to Server to Generate Token

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
          console.log("Success!");
          console.log(data);

          // Login
          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              console.log("User Details");
              console.log(user);
              this.login.setUser(user);

              // Redirect ..ADMIN for admin user
              // Redirect ..NORMAL for normal user
              
              if(this.login.getUserRole()=="ADMIN"){
                // ADMIN Dashboard
                // window.location.href = "/admin";
                this.router.navigate(['admin']);
                this.login.loginStatusSubject.next(true);
              }else if(this.login.getUserRole()=="NORMAL"){
                // NORMAL USER
                // window.location.href = "/user-dashboard";
                this.router.navigate(['user-dashboard/0']);
                this.login.loginStatusSubject.next(true);
              }else{
                this.login.logout();
              }

              });

      },
      (error)=>{
          console.log("Error!");
          console.log(error);
          this.snack.open("Invalid Credentials!", "", {duration:3000});
      }

    );

  }

  public reset(){
    this.loginData={
      username: '',
      password: '',
    }
  }
}
