import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs:Firestore) { }

  getItems(listId: string) {
    const itemsCollection = collection(this.fs,`lists/${listId}/items`);
    return collectionData(itemsCollection, { idField: 'id' });
  }

  getLists() {
    const listsCollection = collection(this.fs,'lists');
    return collectionData(listsCollection, { idField: 'id' });
  }

  deleteItem(listId: string, itemId: string) {
    const docRef = doc(this.fs,`lists/${listId}/items/${itemId}`);
    return deleteDoc(docRef);
  }
}
