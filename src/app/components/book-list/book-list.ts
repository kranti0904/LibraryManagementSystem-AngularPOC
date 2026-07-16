import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookModel } from '../../models/bookModel';
import { Book } from '../../service/book';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-list',
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'author', 'price', 'status', 'action'];
  dataSource = new MatTableDataSource<BookModel>();
  
  errorMessage: string = '';
  successMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: Book, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Books received:', data);
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load books. Please check if the API is running and CORS is enabled. Error: ' + err.message;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBook(id: number): void {
    if(confirm("Are you sure you want to delete this book?")) {
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
  }
}
