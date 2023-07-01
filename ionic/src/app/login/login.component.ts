import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { CookieService } from '../services/cookie.service';
import { Router } from '@angular/router';
import { Services } from '../services/services.service';
import { UserService } from '../services/profile.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

	username: string = '';
	password: string = '';

	_injector = this.viewContainerRef.parentInjector;
	_parent: AppComponent = this._injector.get<AppComponent>(AppComponent);

	userService: Services = inject(Services);
	cookieService: CookieService = inject(CookieService);
	loginService: UserService = inject(UserService);

	constructor(
	  private viewContainerRef: ViewContainerRef,
	  private router: Router,
	  private alertController: AlertController
	) {}

	ngOnInit() {
	}

	clickButton(path: string) {
	  this.router.navigate([path]);
	}

	onInputUsername(event: any) {
	  this.username = event.target.value;
	}
	onInputPassword(event: any) {
	  this.password = event.target.value;
	}

	login() {
	  if (this.username && this.password) {
		this.userService.login(this.username, this.password).then((response) => {
		  this.cookieService.set('USERID', response.user.idUsuario);

		  if (response.resultado.statusCode == '404') {
			this.openSnackBar(response.resultado.statusText, 'undo');
		  } else if (response.resultado.statusCode == '200') {
			this.cookieService.set('SESSIONID', response.user.token);
			this.openSnackBar('Welcome ' + response.user.username, 'Close');
			this.loginService.loginFlag = true;
		  }
		});
	  } else {
		this.openSnackBar('Username and password cannot be null', 'Close');
	  }
	}

	async openSnackBar(message: string, action: string) {
	  const alert = await this.alertController.create({
		header: message,
		buttons: [action]
	  });
	  await alert.present();
	}

}
