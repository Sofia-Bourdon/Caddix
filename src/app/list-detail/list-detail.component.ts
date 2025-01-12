import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
  list: any = {}; // Holds the current list data
  items: any[] = []; // Holds the items for the current list
  listId: string | null = null; // ID of the current list

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
    // Get the list ID from the route
    this.listId = this.route.snapshot.paramMap.get('id');
    if (this.listId) {
      // Fetch the list details
      this.sharedService.getLists().subscribe((lists) => {
        this.list = lists.find((l: any) => l.id === this.listId);
      });

      // Fetch the items for the list
      this.sharedService.getItems(this.listId).subscribe((items) => {
        this.items = items;
      });
    }
  }

  // Add a new item
  addItems(newItem: string) {
    if (this.listId && newItem.trim()) {
      this.sharedService.addItem(this.listId, newItem).then(() => {
        console.log(`Item "${newItem}" added to list ${this.listId}`);
        this.refreshItems(); // Refresh items after adding
      });
    } else {
      console.error('Item name cannot be empty');
    }
  }

  // Edit an existing item
  editItem(itemId: string, newName: string) {
    if (this.listId && newName.trim()) {
      this.sharedService.editItem(this.listId, itemId, { name: newName.trim() }).then(() => {
        console.log(`Item ${itemId} updated successfully`);
        this.refreshItems(); // Refresh items after editing
      }).catch((err) => {
        console.error('Error updating item:', err);
      });
    } else {
      console.error('Item name cannot be empty');
    }
  }

  // Delete an item
  deleteItem(itemId: string) {
    if (this.listId) {
      this.sharedService.deleteItem(this.listId, itemId).then(() => {
        console.log(`Item with ID ${itemId} deleted from list ${this.listId}`);
        this.refreshItems(); // Refresh items after deletion
      });
    }
  }

  // Refresh items for the current list
  private refreshItems() {
    if (this.listId) {
      this.sharedService.getItems(this.listId).subscribe((items) => {
        this.items = items;
      });
    }
  }

  toggleEditMode(item: any) {
    if (item.isEditing) {
      // If in editing mode, save the changes
      this.editItem(item.id, item.name);
    }
    // Toggle the editing state
    item.isEditing = !item.isEditing;
  }
  

}
