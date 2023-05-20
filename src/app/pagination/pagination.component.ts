import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Injectable, ChangeDetectorRef} from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface SearchResult {
  start: number,
  num_found: number,
  docs: []
}
interface SearchResult2 {
  start: number,
  num_found: number,
  works: []
}
interface Book {
  title: string,
  subtitle: string,
  authors: string[],
  first_published: number,
  last_published: number
}
interface Subject{
  title: string,
  authors: string[],
  publishers: string,
  subjects: string,
  times: string
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class PaginationComponent implements OnInit, OnChanges{
  @Input() link1: string
  @Input() chooseFun: number
  

  books: Book[] = []
  subjects: Subject[] = []
  flag = 1;
  page = 1;             //the initial page to display
  collectionSize = 0  //total number of countries in the list
  pageSize = 10;       //size of the first page
  errormsg: string = ""
  constructor(private httpClient: HttpClient, public cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.loadBooks()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.flag = 1
    this.loadBooks()
  }
  refreshBooks(){
    this.books = JSON.parse(localStorage.getItem('booksList'))
    .map((book, i) => ({id: i + 1, ...book}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  loadBooks(){
    if(this.chooseFun == 0)
    {
      if(this.link1 == null){return;}
      this.getSubject().subscribe( (x) => {
        if(x) {
          this.flag=0;
        }
        console.log(x)
        this.books = x;
        this.collectionSize = x.length
        localStorage.setItem('booksList', JSON.stringify(x));
        this.refreshBooks(); // Display the first page
    })
    }
    else{
      console.log("hello")
      if(this.link1 == null){return;}
      this.getSubject2().subscribe( (x) => {
        if(x) {
          this.flag=0;
        }
        console.log(x)
        this.books = x;
        this.collectionSize = x.length
        localStorage.setItem('booksList', JSON.stringify(x));
        this.refreshBooks(); // Display the first page
    })
    }
    
  }
  getSubject(): any{
    return this.httpClient.get<SearchResult>(this.link1).pipe(
      
      map((response) => {
        return response.docs.map((e: any) => {
          console.log(e)
          
          return {
            title: e.title,
            subtitle: (e.subtitle?e.subtitle:""),
            authors: e.author_name,
            first_published: e.first_publish_year,
            last_published: (e.publish_year?e.publish_year[0]:"-")
          }
        })
}),
  catchError((error)=>{
    console.error(error)
    return throwError("something wrong");
  })
  )
  }
getSubject2(): any{
  return this.httpClient.get<SearchResult2>(this.link1).pipe(
    map((response) => {
      return response.works.map((e: any) => {
        console.log(e)
        return {
          title: e.title,
          subtitle: (e.subtitle?e.subtitle:""),
          authors: e.authors.map(a=>a.name).join(),
          first_published: e.first_publish_year,

          last_published: e.edition_count
        }
      })
}),
catchError((error)=>{
  console.error(error)
  this.errormsg = error;
  return throwError("something wrong");
})
)
}


}
