import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


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
    phone: '',
    date: '',
    location: '',
    service: ''
  };

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController
  ) {}

  async submitBooking() {
    const user = await this.afAuth.currentUser;
    if (!user) {
      this.showToast('Please log in to book a service.', 'warning');
      return;
    }
  
    try {
      console.log('Saving booking for user:', user.uid);
      console.log('Booking data:', this.booking);
  
      const bookingRef = this.firestore.collection('bookings');
      await bookingRef.add({
        ...this.booking,
        uid: user.uid,
        createdAt: new Date()
      });
  
      console.log('✅ Booking saved!');
      this.showToast('Booking submitted successfully!', 'success');
      this.booking = { name: '', phone: '', date: '', location: '', service: '' };
    } catch (err) {
      console.error('❌ Firestore error:', err);
      this.showToast('Failed to submit booking.', 'danger');
    }
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
}
