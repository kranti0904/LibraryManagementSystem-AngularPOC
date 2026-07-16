import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../../service/book';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-book',
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ],
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

  //constructor(private bookService: Book, private cdr: ChangeDetectorRef){}
constructor(private bookService: Book){}

  save(bookForm: NgForm){
    this.bookService.addBook(this.book).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully';
        //this.resetForm();
        //this.cdr.detectChanges();
        bookForm.resetForm({
          id: 0,
          title: '',
          author: '',
          price: null,
          publishedDate: new Date(),
          available: true,
          category: ''
        });
      },

      error: (err) => {
        console.error('Error adding book:', err);
      }
    });
  }

  // resetForm() {
  //   this.book = {
  //     id: 0,
  //     title: '',
  //     author: '',
  //     price: 0,
  //     publishedDate: new Date(),
  //     available: true,
  //     category:''
  //   };
  //}
}
