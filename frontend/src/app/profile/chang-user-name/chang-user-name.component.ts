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

  currentName: string = "tom";
  newName: string ="";
  userId: number=-1;
  password:string="";
  userService: Services = inject(Services);
  cookieService: CookieService = inject(CookieService);
  profileService:UserService=inject(UserService)
  loginService: UserService = inject(UserService);

  constructor(private router: Router) {
    this.userId=parseInt(this.cookieService.get('USERID'), 10);
    this.getUserProfile();
  
  }

  async getUserProfile() {
    const response = await this.userService.getUserProfile(this.userId);
    if (response) {
      console.log("enter response")
      this.currentName = response.username;
      this.password = response.password;
    }else{
      this.currentName="Not found";
      this.password="Not found";
    }
  }
 
  onFocusOutNameNew(event: any) {
    this.newName = event.target.value
  }

  changeName(): void {
    this.userService.updateUser(this.userId,this.newName,this.password);
    this.newName="";
    //this.currentName=String(this.profileService.getUsernameById(this.userId));
    this.getUserProfile();
  }

  clickButton(path: string) {
    this.router.navigate([path]);
  }

}



