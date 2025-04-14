import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ Required for Ionic components
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  imports: [IonicModule, CommonModule] // ✅ Import IonicModule here!
})
export class ServicesPage {}