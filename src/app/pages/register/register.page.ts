import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,RouterModule],
  
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  phone = ''; 

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.showToast('Passwords do not match.');
      return;
    }
  
    try {
      await this.authService.register(this.email, this.password);
      await this.showToast('Registration successful! Please log in.');
      this.router.navigateByUrl('/login');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      this.showToast(msg);
    }
  }
  

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
