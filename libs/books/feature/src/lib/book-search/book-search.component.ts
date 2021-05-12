import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  subscription: Subscription
  books: ReadingListBook[];
  searchForm = this.fb.group({
    term: ''
  });
  allowsearch = true;
  
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  /*searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }*/

  searchBooks(event: any) {
    if(event.target.value && this.allowsearch){
      this.store.dispatch(searchBooks({ term: event.target.value }));
      this.allowsearch = false;
      setTimeout(() => {
        this.allowsearch = true;
      }, 500);
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
