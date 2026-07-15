import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookModel } from '../../models/bookModel';
import { Book } from '../../service/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule,FormsModule,CurrencyPipe,RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  books:BookModel[] = [];
  searchText = '';
  errorMessage: string = '';
  successMessage: string = '';

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
        this.successMessage = 'Book deleted successfully';
        this.loadBooks();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      }
    });
  }

  //search text
  // getFilteredBook(): BookModel[] {
  //   //return this.books.filter(x => x.title.toLowerCase().includes(this.searchText.toLowerCase())
  //   if(!this.searchText){
  //     return this.books;
  //   }

  //   return this.books.filter(book => 
  //     book.title.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

  //Pagination and Sorting State
  currentPage: number = 1;
  itemsPerPage: number = 5;   // show 5 books per page
  sortColumn: keyof BookModel = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';

  //Sorting logic
  sort(column: keyof BookModel) {
    if (this.sortColumn === column) {
      // If clicking the same column, reverse the direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If clicking a new column, default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1; // Always jump back to page 1 when sorting changes
  }

    //Pagination logic
    changePage(page: number) {
      this.currentPage = page;
    }

    get totalPages(): number {
      //Calculate total pages based on the filtered list size
      return Math.ceil(this.getProcessedBooks(false).length / this.itemsPerPage);
    }

    get pageNumbers(): number[] {
      // Generates an array of page numbers [1,2,3,...]
      return Array.from({length: this.totalPages }, (_, i) => i + 1);
    }

    //Replaces old getFilteredBook() method

    getProcessedBooks(applyPagination: boolean = true): BookModel[] {
      let processed = this.books;

      // 1)Filtering
      if (this.searchText) {
        processed = processed.filter(book => book.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      }

      // 2)Sorting
      processed = processed.sort((a, b) => {
        let valA = a[this.sortColumn];
        let valB = b[this.sortColumn];

        //Convert strings to lowercase for accurate sorting
        if (typeof valA === 'string' && typeof valB === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;

        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      //3)Pagination
      if (applyPagination) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        processed = processed.slice(startIndex, startIndex + this.itemsPerPage);
      }

      return processed;
    }
}
