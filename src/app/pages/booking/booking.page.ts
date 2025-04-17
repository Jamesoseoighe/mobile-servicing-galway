import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class BookingPage {
  booking = {
    name: '',
    service: '',
    date: '',
    location: '',
    phone: ''
  };

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private bookingService: BookingService,
    private router: Router
  ) {}

  async submitBooking() {
    if (!this.booking.name || !this.booking.service || !this.booking.date || !this.booking.location || !this.booking.phone) {
      this.showToast('Please fill out all fields', 'warning');
      return;
    }

    const user = await this.afAuth.currentUser;
    if (!user) {
      this.showToast('Login required.', 'danger');
      return;
    }

    try {
      await this.bookingService.addBooking({
        ...this.booking,
        uid: user.uid,
        createdAt: new Date()
      });
      this.showToast('Booking successful!', 'success');
      this.router.navigateByUrl('/home');
    } catch (err) {
      this.showToast('Error submitting booking.', 'danger');
    }
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}
