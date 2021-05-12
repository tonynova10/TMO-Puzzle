import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private _snackBar: MatSnackBar
    ) {}

  removeFromReadingList(item) {
    
    const book = {
      id: item.bookId,
      authors: item.authors,
      description: item.description,
      title: item.title,
      coverUrl: item.coverUrl,
      publisher: item.publisher
    } as Book

    
    const message = 'Book removed to reading list!';
    const action = 'Undo';
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
      snackBarRef.dismiss();
    })
  }
}
