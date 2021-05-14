import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getReadingList,
  ReadingListBook,
  removeFromReadingList,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: any;
  readingList$ = this.store.select(getReadingList);;
  searchForm = this.fb.group({
    term: ''
  });
  allowsearch = true;
  
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar,
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
    const item = {
      bookId: book.id,
    } as ReadingListItem

    const message = 'Book added to reading list!';
    const action = 'Undo';
    this.store.dispatch(addToReadingList({ book }));
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 5000
    });

    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(removeFromReadingList({ item }));
      snackBarRef.dismiss();
    })

  }

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
