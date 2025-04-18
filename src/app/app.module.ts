import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),


    AngularFireModule.initializeApp(environment.firebase), // ✅ correct
    AngularFireAuthModule,
    AngularFirestoreModule // ✅ required for AngularFirestore to work
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {}
