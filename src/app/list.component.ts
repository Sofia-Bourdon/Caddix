import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService } from './shared.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  lists: any[] = [];
  items: any[] = [];
  selectedListId: string | null = null;
  isDetailView: boolean = false;

  cols: number = 3; // Default column count for large screens
  showContainerInHandset: boolean = false;
  showContainerInTablet: boolean = false;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.refreshLists();
    this.updateColumns();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDetailView = this.route.firstChild !== null;
      }
    });

    this.breakpointObserver
      .observe([Breakpoints.TabletPortrait, Breakpoints.HandsetLandscape])
      .subscribe((state) => {
        const breakpoints = state.breakpoints;

        this.showContainerInHandset = false;
        this.showContainerInTablet = false;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.showContainerInTablet = true;
          console.log('Screen matches TabletPortrait');
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.showContainerInHandset = true;
          console.log('Screen matches HandsetLandscape');
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateColumns();
  }

  updateColumns(): void {
    const width = window.innerWidth;

    if (width <= 600) {
      this.cols = 1;
    } else if (width <= 960) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }

  refreshLists(): void {
    this.service.getLists().subscribe((lists) => {
      this.lists = lists;
      this.lists.forEach((list) => {
        this.service.getItems(list.id).subscribe((items) => {
          list.items = items;
        });
      });
    });
  }

  refreshItems(listId: string | null): void {
    if (listId) {
      this.service.getItems(listId).subscribe((res) => {
        this.items = res;
      });
    } else {
      this.items = [];
    }
  }

  addItems(listId: string, newItem: string): void {
    if (newItem.trim()) {
      this.service.addItem(listId, newItem).then(() => {
        console.log(`Item "${newItem}" added to list ${listId}`);
        this.refreshLists();
      });
    } else {
      console.error('Item name cannot be empty');
    }
  }

  addList(name: string, description: string): void {
    if (name.trim() && description.trim()) {
      this.service.addList(name, description).then(() => {
        console.log(`List "${name}" added successfully`);
        this.refreshLists();
      }).catch((err) => {
        console.error('Error adding list:', err);
      });
    } else {
      console.error('List name and description cannot be empty');
    }
  }

  deleteList(listId: string): void {
    this.service.deleteList(listId).then(() => {
      console.log(`List with ID ${listId} deleted successfully`);
      this.refreshLists();
    }).catch((err) => {
      console.error('Error deleting list:', err);
    });
  }
  

  editItem(listId: string, itemId: string, newName: string): void {
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

  deleteItems(listId: string, itemId: string): void {
    this.service.deleteItem(listId, itemId).then(() => {
      console.log(`Item with ID ${itemId} deleted from list ${listId}`);
      this.refreshLists();
    });
  }
}
