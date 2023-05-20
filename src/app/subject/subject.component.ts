import { Component } from '@angular/core';
import { BooksearchComponent } from '../booksearch/booksearch.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  constructor(public booksearch: BooksearchComponent)
  {
    //constructor
  }
  inp: string = ""
  searchBySubject(){
   
    console.log(this.inp);
    this.booksearch.get_link = "https://openlibrary.org/subjects/"+this.inp.trim()+".json";
    this.booksearch.chooseFun = 1;
    this.booksearch.cd.detectChanges();
    
    console.log(this.booksearch.get_link)
  }
  searchSubject(inp: string){
   
    this.booksearch.get_link ="https://openlibrary.org/subjects/"+inp.trim()+".json";
  
    this.booksearch.chooseFun = 1;
    console.log(this.booksearch.get_link);
    this.booksearch.cd.detectChanges();
  }
}
