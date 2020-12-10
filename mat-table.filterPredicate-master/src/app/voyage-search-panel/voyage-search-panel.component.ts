import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DRMRoute, Seat, SeatStatus, Station, ProjectDeveloppement } from '../shared/entities.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { debounceTime, distinct, map, mergeMap, startWith, toArray } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-voyage-search-panel',
  templateUrl: './voyage-search-panel.component.html',
  styleUrls: ['./voyage-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoyageSearchPanelComponent implements OnInit {
  public displayedColumns: string[] =
    ['DP_Identifiant', 'Title', 'SOP'];
  public dataSource: MatTableDataSource<ProjectDeveloppement>;
  public searchForm: FormGroup;
  public SOP = '';
  public id = '';
  public title = '';
  projectDeveloppementSearch: ProjectDeveloppementSearch = new ProjectDeveloppementSearch();

  constructor(private http: HttpClient) {
  }
  DepProjSOP: Observable<string[]>;
  DepProjId: Observable< string[]>;
  DepProjTitle: Observable<string[]>;
  controlId:FormControl=new FormControl();;
  isLoading = false;
  ngOnInit() {
    this.searchFormInit();
    this.getAll(this.projectDeveloppementSearch);
    this.projectDeveloppementSearch.Id = this.id;
    this.projectDeveloppementSearch.SOP = this.SOP;
    this.projectDeveloppementSearch.Title = this.title;
    this.projectDeveloppementSearch.NumberOfObjectsPerPage = 4;
    this.projectDeveloppementSearch.PageNumber = 1;

      this.searchForm.get('id').valueChanges.pipe(
        startWith('')
      )
       .subscribe(
        term => {
          
            this.projectDeveloppementSearch.Id=term;
          
            this.projectDeveloppementSearch.Title=null;
            this.projectDeveloppementSearch.SOP=null;

            this.DepProjId= this.searchAutoCompleteId(this.projectDeveloppementSearch);
          
      }) 
      this.searchForm.get('SOP').valueChanges.pipe(
        startWith('')
      )
       .subscribe(
        term => {
          
            this.projectDeveloppementSearch.SOP=term;
         
            this.projectDeveloppementSearch.Title=null;
            this.projectDeveloppementSearch.Id=null;
            this.DepProjSOP= this.searchAutoCompleteSOP(this.projectDeveloppementSearch)
          
      }) 
      this.searchForm.get('title').valueChanges.pipe(
        startWith('')
      )
       .subscribe(
        term => {
          
            this.projectDeveloppementSearch.Title=term;
          
            this.projectDeveloppementSearch.Id=null;
            this.projectDeveloppementSearch.SOP=null;
            this.DepProjTitle= this.searchAutoCompleteTitle(this.projectDeveloppementSearch)
          
      }) 

 
  }


  searchFormInit() {
    this.searchForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      SOP: new FormControl('')
    });
  }

  /* this method well be called for each row in table  */
 
 
  getAll(projectSearch: ProjectDeveloppementSearch) {
    var rsult;
    let httpHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "1800",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    });

    let options = {
      headers: httpHeaders,
      responseType: 'json',
      observe: 'body',
      body: projectSearch
    };
    var rsult;
      (this.http.post<ProjectDeveloppement[]>("https://localhost:44306/api/ProjectDeveloppements",projectSearch)).subscribe((res)=>{this.dataSource=new MatTableDataSource(res) });
    //rsult = VOYAGES;
    //

  }

  search(projectSearch) {
    var lispprojectdep = this.http.post<ProjectDeveloppement[]>("https://localhost:44306/api/ProjectDeveloppements",projectSearch)
   

    return lispprojectdep;  
} 

searchAutoCompleteSOP(projectSearch) {
  var lispprojectdep = this.http.post<string[]>("https://localhost:44306/api/ProjectDeveloppements/autoCompleteSOP",projectSearch)
  .pipe(
      debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
     
  );

  return lispprojectdep;  
}
searchAutoCompleteTitle(projectSearch) {
  var lispprojectdep = this.http.post<string[]>("https://localhost:44306/api/ProjectDeveloppements/autoCompleteTitle",projectSearch)
  .pipe(
      debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
     
  );

  return lispprojectdep;  
}
searchAutoCompleteId(projectSearch) {
  var lispprojectdep = this.http.post<string[]>("https://localhost:44306/api/ProjectDeveloppements/autoCompleteId",projectSearch)
  .pipe(
      debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
     
  );

  return lispprojectdep;  
}

getOptionText(option) {
  return option;
}
getOptionTitle(option) {
  return option;
}
getOptionSOP(option) {
  return option;
}
selectedclientSOP(value)
{
  this.projectDeveloppementSearch.SOP=value; 
  this.getAll( this.projectDeveloppementSearch) ;

}
selectedclientTitle(value)
{
  this.projectDeveloppementSearch.Title=value; 
  this.getAll( this.projectDeveloppementSearch) ;

}
selectedclientId(value)
{
  this.projectDeveloppementSearch.Id=value; 
  this.getAll( this.projectDeveloppementSearch) ;

}
}

export class ProjectDeveloppementSearch {
  public Id: string;
  public Title: string
  public SOP: string;
  public NumberOfObjectsPerPage: Number;
  public PageNumber: Number;
 
}




const VOYAGES: ProjectDeveloppement[] = [
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '2', title: 'test', SOP: '11/11' }, ,
  { id: '3', title: 'test', SOP: '11/11' },
  { id: '4', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' }, ,
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' }, ,
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' }, ,
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' },
  { id: '1', title: 'test', SOP: '11/11' }
];
