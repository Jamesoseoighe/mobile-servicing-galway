import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ Required for Ionic components
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AboutPage {} // ✅ This line MUST be here