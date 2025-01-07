import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs:Firestore) { }

  getItems(){
    let itemsCollection= collection(this.fs,'items');
    return collectionData(itemsCollection,{idField:'id'});
  }
}
