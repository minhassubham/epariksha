import { sequence } from '@angular/animations';
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

  constructor(private userService: UserService,private snack:MatSnackBar) { }
  public user={
    username:'',
    password:'',
    email:'',
    phone:'',
    firstname:'',
    lastname:'',
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    if(this.user.username.trim()=='' || this.user.username==null){
      //alert('Username is required');
      this.snack.open('Username is required!','OK',{duration:3000});
      return;
    }

    // Validation

    // addUser: UserService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        // Success message
        console.log(data);
        //alert('User added successfully!');
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
      },
      (error) => {
        // Error message
        console.log(error);
        //alert('Something went wrong! Please try again!');
        this.snack.open(error.error.text, '', {
          duration: 3000,
        });
      }
    );

  }

  // this.user

  public clear(){
    this.user={
      username:'',
      password:'',
      email:'',
      phone:'',
      firstname:'',
      lastname:'',
    }
  }


}