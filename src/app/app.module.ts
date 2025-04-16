import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  
    apiKey: "AIzaSyA3rQytZ_FJyqbXno-VIVYp5tB7C4J936E",
    authDomain: "mobile-servicing-galway.firebaseapp.com",
    projectId: "mobile-servicing-galway",
    storageBucket: "mobile-servicing-galway.appspot.com",  
    messagingSenderId: "304166260107",
    appId: "1:304166260107:web:1ad4ec257ce0b78eaab38e"
  
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes), // ✅ correct for NgModule apps

    AngularFireModule.initializeApp(firebaseConfig), // ✅ compat version
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
