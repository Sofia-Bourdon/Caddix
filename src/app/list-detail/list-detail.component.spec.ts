import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
  list: any = {};
  items: any[] = [];

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
    const listId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (listId) {
      this.sharedService.getLists().subscribe((lists) => {
        this.list = lists.find((l: any) => l.id === listId); // Find the specific list
      });

      this.sharedService.getItems(listId).subscribe((items) => {
        this.items = items; // Fetch items for this list
      });
    }
  }
}
