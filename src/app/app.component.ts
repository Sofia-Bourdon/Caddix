import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  title = 'caddix'

  constructor(private service:SharedService) {}

  items:any=[]

  refreshItems(){
    this.service.getItems().subscribe((res)=>{
      this.items=res;
    })
  }

  ngOnInit(){
    this.refreshItems();
  }
}
