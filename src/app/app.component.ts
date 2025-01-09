import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'caddix';
  lists: any[] = [];
  items: any[] = [];
  selectedListId: string | null = null;

  constructor(private service: SharedService) {}

  refreshLists() {
    this.service.getLists().subscribe((lists) => {
      this.lists = lists;
      this.lists.forEach((list) => {
        this.service.getItems(list.id).subscribe((items) => {
          list.items = items; // Attach the items to the current list
        });
      });
    });
  }

  refreshItems(listId: string | null) {
    if (listId) {
      this.service.getItems(listId).subscribe((res) => {
        this.items = res;
      });
    } else {
      this.items = [];
    }
  }


  deleteItems(listId: string, itemId: string) {
    this.service.deleteItem(listId, itemId).then(() => {
      console.log(`Item with ID ${itemId} deleted from list ${listId}`);
      this.refreshLists();
    });
  }

  ngOnInit() {
    this.refreshLists();
  }
}