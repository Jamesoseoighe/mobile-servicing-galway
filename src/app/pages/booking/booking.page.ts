import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router'; 

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

  savedBookings: any[] = [];

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private sanitizer: DomSanitizer 
  ) {
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      this.booking.service = selectedService;
      localStorage.removeItem('selectedService');
    }
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  async ionViewWillEnter() {
    await this.loadBookings();
  }

  async submitBooking() {
    if (!this.booking.name || !this.booking.phone || !this.booking.date || !this.booking.service) {
      this.showToast('Please fill in all required fields.', 'warning');
      return;
    }

    try {
      const existing = await Storage.get({ key: 'bookings' });
      const bookings = existing.value ? JSON.parse(existing.value) : [];

      bookings.push({
        ...this.booking,
        createdAt: new Date().toISOString()
      });

      await Storage.set({
        key: 'bookings',
        value: JSON.stringify(bookings)
      });

      this.showToast('Booking saved locally!', 'success');
      this.booking = { name: '', phone: '', date: '', location: '', service: '' };
      await this.loadBookings();
    } catch (err) {
      console.error('❌ Local save error:', err);
      this.showToast('Failed to save booking locally.', 'danger');
    }
  }

  async loadBookings() {
    const res = await Storage.get({ key: 'bookings' });
    this.savedBookings = res.value ? JSON.parse(res.value) : [];
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

  // ✅ New: Google Maps URL Getter
  get googleMapsUrl(): SafeResourceUrl {
    if (!this.booking.location) return '';
    const encoded = encodeURIComponent(this.booking.location);
    const url = `https://www.google.com/maps?q=${encoded}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
