import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

    
  latitude: number | null = null;
  longitude: number | null = null;

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    console.log('Current location:', this.latitude, this.longitude);
    
  }
  
    goToBooking() {
      this.router.navigateByUrl('/booking');
    }

    goToContact() {
      this.router.navigateByUrl('/contact');
    }

  async logout() {
    await this.afAuth.signOut();
    const toast = await this.toastCtrl.create({
      message: 'Logged out successfully!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.router.navigateByUrl('/login');
  }
}