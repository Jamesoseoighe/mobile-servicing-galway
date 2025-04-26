import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ViewProfilePage {
  profileImage: string | null = null;
  totalBookings: number = 0;

  constructor(private toastCtrl: ToastController, private router: Router) {}

  async ionViewWillEnter() {
    // Load profile picture if already saved
    const img = await Storage.get({ key: 'profileImage' });
    this.profileImage = img.value ? img.value : null;

    // Load bookings and count them
    const res = await Storage.get({ key: 'bookings' });
    const bookings = res.value ? JSON.parse(res.value) : [];
    this.totalBookings = bookings.length;
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      this.profileImage = base64;
      await Storage.set({ key: 'profileImage', value: base64 });

      const toast = await this.toastCtrl.create({
        message: 'Profile picture updated!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    };
    reader.readAsDataURL(file);
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
