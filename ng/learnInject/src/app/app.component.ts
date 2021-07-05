import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';

import { AppService } from './app.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<h1 #greet>Hello {{name}}</h1>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "Angular";



  @HostListener('click', ['$event'])
  onClick($event:any){
    console.dir($event);
  }

  constructor(
    public appService:AppService,
    @Inject(CONFIG) config: any){
    
  }
}
