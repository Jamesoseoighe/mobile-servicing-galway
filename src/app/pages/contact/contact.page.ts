import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ Required for Ionic components
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ContactPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
