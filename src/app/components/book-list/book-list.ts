import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookModel } from '../../models/bookModel';
import { Book } from '../../service/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule,FormsModule,CurrencyPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  books:BookModel[] = [];
  searchText = '';
  errorMessage: string = '';

  constructor(private bookService:Book, private cdr: ChangeDetectorRef){}
    // //this.books=this.bookService.getBooks();
    // this.bookService.getBooks().subscribe({
    //   next: (data) => {
    //     this.books = data;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  //}

  // deleteBook(id:number){
  //   this.books=this.books.filter(x=>x.id!==id);
  // }

  ngOnInit(): void {
    this.loadBooks();
  }

   loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Books received:', data);
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load books. Please check if the API is running and CORS is enabled. Error: ' + err.message;
      }
    });
   }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
      }
    });
  }

  //search text
  getFilteredBook(): BookModel[] {
    //return this.books.filter(x => x.title.toLowerCase().includes(this.searchText.toLowerCase())
    if(!this.searchText){
      return this.books;
    }

    return this.books.filter(book => 
      book.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
