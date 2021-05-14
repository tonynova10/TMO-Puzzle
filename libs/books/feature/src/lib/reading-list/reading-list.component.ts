import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, markAsRead, markBookAsRead, removeBookAsRead, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, ReadingListItem } from '@tmo/shared/models';

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

  removeFromReadingList(readingItem) {
    let item: any;
    let book = this.createBook(readingItem)

    if(readingItem.finished) {
      item = {
        ...readingItem,
        finished: false,
        finishedDate: null
      };
      book = {
        ...book,
        finished: false
      }
      this.store.dispatch(removeBookAsRead({ book }));
    } else {
      item = {
        ...readingItem
      };
    }
    
    const message = 'Book removed to reading list!';
    const action = 'Undo';
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
      snackBarRef.dismiss();
    });
  }
  
  markedAsRead(readingItem: ReadingListItem){
    const finishedDate = new Date().toISOString();
    const book = this.createBook(readingItem);
    book.finished = true;
    const item = {
      ...readingItem,
      finished: true,
      finishedDate: finishedDate
    } as ReadingListItem;
    this.store.dispatch(markAsRead({ item }));
    this.store.dispatch(markBookAsRead({ book }));
  }

  createBook(readingItem){
    return {
      id: readingItem.bookId,
      authors: readingItem.authors,
      description: readingItem.description,
      title: readingItem.title,
      coverUrl: readingItem.coverUrl,
      publisher: readingItem.publisher
    } as Book;
  }
}
