import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Booking {
  name: string;
  service: string;
  date: string;
  location: string;
  phone: string;
  uid?: string;
  createdAt?: Date; 
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsRef;

  constructor(private firestore: Firestore) {
    this.bookingsRef = collection(this.firestore, 'bookings');
  }

  // Save booking to Firestore
  addBooking(booking: Booking) {
    return addDoc(this.bookingsRef, booking);
  }

  // Optional: Get all bookings
  getBookings(): Observable<Booking[]> {
    return collectionData(this.bookingsRef, { idField: 'id' }) as Observable<Booking[]>;
  }
}
