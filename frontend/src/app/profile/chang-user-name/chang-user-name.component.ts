import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-chang-user-name',
  standalone: true,
  imports: [CommonModule],
  template: `
  
  <div class="container">
  
  <div class="Change Username">
    <div class="form-group">
      <h1>Change User Name:</h1>
      <label for="username">Current Name:</label>
      <input type="text" id="NameOld" value="{{currentName}}" placeholder="Name Not Found" disabled>
      <label for="username">New Name:</label>
      <input type="text" id="NameNew" value="" placeholder="New Name" (focusout)="onFocusOutNameNew($event)">
      <button (click)="changeName()">Change</button>
      <button (click)="clickButton('/profile')">Back</button>
      
    </div>
</div>
  
 `,
  styleUrls: ['./chang-user-name.component.css']
})
export class ChangUserNameComponent {

  currentName: string = "";
  newName: string ="";
  userService: Services = inject(Services);
  tempUserId: number=-1;
  cookieService: CookieService = inject(CookieService);
  profileService:UserService=inject(UserService)
  userId: number=-1;
  password:string=""

  constructor(private router: Router) {
    this.userId=this.cookieService.get("USERID");
    if(this.userId>=0){
      this.currentName=String(this.profileService.getUsernameById(this.userId));
      this.password=String(this.profileService.getPasswordById(this.userId));
    }else{
      this.currentName="Not Value";
    }
  }
 
  onFocusOutNameNew(event: any) {
    this.newName = event.target.value
  }

  changeName(): void {
    //this.currentName=this.newName;
    this.userService.updateUser(this.userId,this.newName,this.password);
    this.newName="";
    this.currentName=String(this.profileService.getUsernameById(this.userId));
  }

  clickButton(path: string) {
    this.router.navigate([path]);

  }

  }



