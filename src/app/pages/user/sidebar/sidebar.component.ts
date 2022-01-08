import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _cat:CategoryService, private _login:LoginService) { }

  categories:any;
  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any) => {
        this.categories = data;
        console.log(data);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  public logout(){
    this._login.logout();
    window.location.reload();
  }
  
}
