import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from '../app/app.component';
import { SharedService } from './shared.service';

const firebaseConfig = {
  apiKey: "AIzaSyB4p1b2bvokz1SYylSikb983-DetWp3Bns",
  authDomain: "caddix-ef6f2.firebaseapp.com",
  projectId: "caddix-ef6f2",
  storageBucket: "caddix-ef6f2.firebasestorage.app",
  messagingSenderId: "961477154699",
  appId: "1:961477154699:web:cb78b050262ad75e10818e",
  measurementId: "G-LTSE0GR30P"
};

@NgModule({
  declarations: [AppComponent],
  imports: [ 
    BrowserModule,
  ],
  providers: [SharedService,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
