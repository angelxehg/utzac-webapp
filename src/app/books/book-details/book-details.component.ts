import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Book, BooksService } from '../books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;

  book: Book;

  editMode = false;
  newMode = false;

  paramSubscription: Subscription;

  constructor(
    private service: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = false;
        this.newMode = false;
        this.service.find(params.id).then(book => this.book = book);
      } else {
        this.editMode = true;
        this.newMode = true;
        this.book = {
          _id: 'new',
          title: ''
        };
      }
    });
  }

  save(): void {
    if (this.newMode) {
      this.service.create(this.book).then(book => {
        console.log('created');
        this.service.index().then(i => this.router.navigateByUrl(`/app/books/${book._id}`));
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.service.update(this.book).then(book => {
        this.editMode = false;
        this.book = book;
        console.log('updated');
      }).catch(err => {
        console.log(err);
      });
    }
  }

  delete(): void {
    this.service.delete(this.book).then(() => {
      this.service.index().then(i => this.router.navigateByUrl('/app/books'));
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
