import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { ListComponent } from './list.component';
import { ListDetailComponent } from './list-detail/list-detail.component'
import { SharedService } from './shared.service';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




const firebaseConfig = {
  apiKey: "AIzaSyB4p1b2bvokz1SYylSikb983-DetWp3Bns",
  authDomain: "caddix-ef6f2.firebaseapp.com",
  projectId: "caddix-ef6f2",
  storageBucket: "caddix-ef6f2.firebasestorage.app",
  messagingSenderId: "961477154699",
  appId: "1:961477154699:web:cb78b050262ad75e10818e",
  measurementId: "G-LTSE0GR30P"
};

const routes: Routes = [
  { path: '', component: ListComponent }, // Root route
  { path: 'list/:id', component: ListDetailComponent }, // Detail route
];

@NgModule({
  declarations: [
  ListComponent,
  ListDetailComponent,
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [SharedService,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [ ListComponent ]
})
export class AppModule { }
