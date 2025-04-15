import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface AppUser {
  email: string;
  phone?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // 🔐 Register and store phone number
  register(email: string, password: string, phone: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      const uid = result.user?.uid;
      if (uid) {
        return this.firestore.collection('users').doc(uid).set({
          email,
          phone,
          createdAt: new Date()
        });
      } else {
        return Promise.reject('User UID not available.');
      }
    });
  }

  // 🔓 Login and ensure phone is present in Firestore
  login(identifier: string, password: string) {
    const isPhone = /^[0-9\s()+-]{7,15}$/.test(identifier);
  
    if (isPhone) {
      return this.firestore.collection('users', ref =>
        ref.where('phone', '==', identifier)
      ).get().toPromise().then(snapshot => {
        if (!snapshot || snapshot.empty) {
          throw new Error('Phone number not found.');
        }
  
        const userDoc = snapshot.docs[0];
        const data = userDoc.data() as AppUser;
  
        return this.afAuth.signInWithEmailAndPassword(data.email, password);
      });
    }
  
    return this.afAuth.signInWithEmailAndPassword(identifier, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }
}
