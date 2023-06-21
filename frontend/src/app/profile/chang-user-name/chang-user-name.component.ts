import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from 'src/app/services/services.service';
import { Router } from '@angular/router';

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
      <input type="text" id="NameOld" value="{{currentName}}" placeholder="Current Name" disabled>
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
  currentName: string = "NameHolder";
  newName: string ="";
  userService: Services = inject(Services);

  constructor(private router: Router) {
    //get the current name
  }
 
  onFocusOutNameNew(event: any) {
    this.newName = event.target.value
  }

  changeName(): void {
      this.currentName=this.newName;
      this.newName="";
      //change name in backEnd
    }

  clickButton(path: string) {
    this.router.navigate([path]);
  }

  }



