import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
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
    if (!this.isValidBooking()) {
      this.showToast('Please fill out all fields.', 'warning');
      return;
    }

    const uid = await this.getUserId();
    if (!uid) {
      this.showToast('You must be logged in to book.', 'danger');
      return;
    }

    try {
      await this.bookingService.addBooking({
        ...this.booking,
        uid,
        createdAt: new Date()
      });

      this.showToast('Booking submitted successfully!', 'success');
      this.resetForm();
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.showToast('Failed to submit booking.', 'danger');
    }
  }

  isValidBooking(): boolean {
    const { name, service, date, location, phone } = this.booking;
    return !!(name && service && date && location && phone);
  }

  resetForm() {
    this.booking = {
      name: '',
      service: '',
      date: '',
      location: '',
      phone: ''
    };
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    toast.present();
  }

  async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.uid ?? null;
  }
}
