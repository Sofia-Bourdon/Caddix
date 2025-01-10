import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  lists: any[] = [];
  items: any[] = [];
  selectedListId: string | null = null;
  isDetailView: boolean = false; // To track if we're on the detail route

  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute) {}

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

  addItems(listId: string, newItem: string) {
    if (newItem.trim()) {
      this.service.addItem(listId, newItem).then(() => {
        console.log(`Item "${newItem}" added to list ${listId}`);
        this.refreshLists();
      });
    } else {
      console.error('Item name cannot be empty');
    }
  }

  editItem(listId: string, itemId: string, newName: string) {
    if (newName.trim()) {
      this.service.editItem(listId, itemId, { name: newName.trim() }).then(() => {
        console.log(`Item ${itemId} updated successfully`);
        this.refreshLists();
      }).catch((err) => {
        console.error('Error updating item:', err);
      });
    } else {
      console.error('Item name cannot be empty');
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

    // Detect if we are on the detail view
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDetailView = this.route.firstChild !== null;
      }
    });
  }
}
