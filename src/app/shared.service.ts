import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';


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

  addList(name: string, description: string) {
    const data = { name, description, createdAt: new Date().toISOString() };
    const listsCollection = collection(this.fs, 'lists');
    return addDoc(listsCollection, data);
  }

  deleteList(listId: string) {
    const docRef = doc(this.fs, `lists/${listId}`);
    return deleteDoc(docRef);
  }  
  
  addItem(listId: string, name: string) {
    const data = { name: name };
    const itemsCollection = collection(this.fs,`lists/${listId}/items`);
    return addDoc(itemsCollection, data);
  }

  deleteItem(listId: string, itemId: string) {
    const docRef = doc(this.fs,`lists/${listId}/items/${itemId}`);
    return deleteDoc(docRef);
  }

  editItem(listId: string, itemId: string, updatedData: { name: string }) {
    const docRef = doc(this.fs, `lists/${listId}/items/${itemId}`);
    return updateDoc(docRef, updatedData);
  }
  
}
