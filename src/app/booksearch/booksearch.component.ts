import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class BooksearchComponent {

  get_link = "https://openlibrary.org/search.json?author=tolkien"
  constructor(public cd: ChangeDetectorRef, public pagination : PaginationComponent){
    this.get_link = "https://openlibrary.org/search.json?author=tolkien"

  }
  chooseFun = 0;
  inp: string = ""
  searchByAuthor() {
    
    this.get_link = "https://openlibrary.org/search.json?author="+this.inp.trim();
    this.chooseFun = 0;

  }
  searchByBook() {
    this.get_link = "https://openlibrary.org/search.json?q="+this.inp.trim();
    this.chooseFun = 0;

  }
}
