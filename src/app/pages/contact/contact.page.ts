import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ]
})
export class ContactPage {
  formData = {
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  };
  

  constructor(private toastCtrl: ToastController, private router: Router) {}

  async sendEmail(form: NgForm) {
    if (form.valid) {
      try {
        await emailjs.send(
          'service_g1fl3rj',
          'template_1c5frha',
          form.value,
          '41ahaO8fuEEU4059W'
        );
        this.showToast('✅ Message sent successfully!', 'success');
        form.resetForm();
      } catch (error) {
        console.error('EmailJS Error:', error);
        this.showToast('❌ Failed to send message. Try again.', 'danger');
      }
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom'
    });
    toast.present();
  }
  
goBack() {
  this.router.navigateByUrl('/home');
}
}
