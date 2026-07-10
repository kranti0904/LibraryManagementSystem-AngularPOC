import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../service/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
  successMessage = '';
  book={
    id:0,
    title:'',
    author:'',
    price:0,
    publishedDate:new Date(),
    available:true,
    category:''
  };

  constructor(private bookService: Book, private cdr: ChangeDetectorRef){}

  save(){
    this.bookService.addBook(this.book).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully';
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error adding book:', err);
      }
    });
  }

  resetForm() {
    this.book = {
      id: 0,
      title: '',
      author: '',
      price: 0,
      publishedDate: new Date(),
      available: true,
      category:''
    };
  }
}
