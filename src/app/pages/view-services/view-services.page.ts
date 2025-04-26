import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-services',
  standalone: true,
  templateUrl: './view-services.page.html',
  styleUrls: ['./view-services.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ViewServicesPage {
  services$: Observable<any[]>;

  constructor(private router: Router, private toastCtrl: ToastController) {
    this.services$ = of([
      { name: 'Full Car Servicing', description: 'Oil, filters, fluids, full checkup', price: 'From €150' },
      { name: 'Brake Pad Replacement', description: 'Front/rear pads fitted', price: 'From €120' },
      { name: 'OBD2 Diagnostics', description: 'Engine error scans and clear', price: 'From €50' },
      { name: 'Full Car Cleaning & Detailing', description: 'Full inside and outside valet', price: 'From €100' },
      { name: 'Battery Replacement', description: 'Test and replace car battery', price: 'From €140' }
    ]);
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  bookService(service: any) {
    localStorage.setItem('selectedService', service.name);
    this.router.navigateByUrl('/booking');
  }

  async showDetails(service: any) {
    const toast = await this.toastCtrl.create({
      header: service.name,
      message: service.description + ' — ' + service.price,
      duration: 3000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}
