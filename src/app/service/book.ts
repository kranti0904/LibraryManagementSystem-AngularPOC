import { Injectable, Service } from '@angular/core';
import { BookModel } from '../models/bookModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Book {

    apiUrl = "https://localhost:7035/api/Books";

    constructor(private http: HttpClient){ }

    // books: BookModel[] = [
    //     {
    //         id:1,
    //         title:'Angular',
    //         author:'John',
    //         price:500,
    //         publishedDate:new Date(),
    //         available:true,
    //         category:'Programming'
    //     },

    //     {
    //         id:2,
    //         title:'c#',
    //         author:'David',
    //         price:650,
    //         publishedDate:new Date(),
    //         available:false,
    //         category:'Programming'
    //     }
    // ];

    getBooks(): Observable<BookModel[]> {
        //return this.books;
        
        return this.http.get<BookModel[]>(this.apiUrl)
    }

    // addBook(book: BookModel){

    //     const newBook = {
    //         ...book,
    //         id: this.books.length + 1
    //     };
    //     this.books.push(newBook);
    //     console.log(this.books);
    // }

    addBook(book: BookModel): Observable<BookModel> {
        return this.http.post<BookModel>(this.apiUrl, book);
    }

    deleteBook(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
