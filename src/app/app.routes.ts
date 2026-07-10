import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BookList } from './components/book-list/book-list';
import { AddBook } from './components/add-book/add-book';
import { EditBook } from './components/edit-book/edit-book';
import { BookDetails } from './components/book-details/book-details';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },

    {
        path:'books',
        component:BookList
    },

    {
        path:'add-book',
        component:AddBook
    },

    {
        path:'edit-book/:id',
        component:EditBook
    },

    {
        path:'details/:id',
        component:BookDetails
    }
];
