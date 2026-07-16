import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../service/book';
import { BookModel } from '../../models/bookModel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook implements OnInit {
  successMessage = '';
  errorMessage = '';
  book: BookModel = {
    id: 0,
    title: '',
    author: '',
    price: 0,
    publishedDate: new Date(),
    available: true,
    category: ''
  };

  constructor(
    private bookService: Book,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(Number(id)).subscribe({
        next: (data) => {
          console.log('Book data received:', data);
          if (data) {
            this.book = data;
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching book:', err);
          this.errorMessage = 'Could not load book details.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  update(bookForm: NgForm) {
    if (bookForm.invalid) return;

    this.bookService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        this.successMessage = 'Book data updated successfully';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.errorMessage = 'Error updating book.';
      }
    });
  }
}
