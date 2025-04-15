import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class LoginPage {
  email = '';
  identifier = '';
  password = '';

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async login() {
    try {
      await this.authService.login(this.identifier, this.password);
      this.router.navigateByUrl('/home');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed.';
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000
      });
      await toast.present();
    }
  }
}
