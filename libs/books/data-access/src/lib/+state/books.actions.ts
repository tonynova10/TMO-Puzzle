import { createAction, props } from '@ngrx/store';
import { Book } from '@tmo/shared/models';

export const searchBooks = createAction(
  '[Books Search Bar] Search',
  props<{ term: string }>()
);

export const searchBooksSuccess = createAction(
  '[Book Search API] Search success',
  props<{ books: Book[] }>()
);

export const searchBooksFailure = createAction(
  '[Book Search API] Search failure',
  props<{ error: any }>()
);

export const markBookAsRead = createAction(
  '[Book Search API] Book as read',
  props<{ book: Book }>()
);

export const markBookAsReadSuccess = createAction(
  '[Book Search API] Book as read success',
  props<{ book: Book }>()
);

export const markBookAsReadFailure = createAction(
  '[Book Search API] Book as read failure',
  props<{ error: any }>()
);

export const removeBookAsRead = createAction(
  '[Book Search API] Book as unread',
  props<{ book: Book }>()
);

export const removeBookAsReadSuccess = createAction(
  '[Book Search API] Book as read success',
  props<{ book: Book }>()
);

export const removeBookAsReadFailure = createAction(
  '[Book Search API] Book as read failure',
  props<{ error: any }>()
);

export const clearSearch = createAction('[Books Search Bar] Clear Search');
