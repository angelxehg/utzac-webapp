import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  faSync = faSync;

  public items = this.service.items$;

  constructor(private service: BooksService) { }

  ngOnInit(): void {
    this.service.index().then();
  }

}
