import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }
  displayedColumns :string[];
  dataSource=User;
  tests=test;
  ngOnInit(): void {
    this.displayedColumns = ['firstName', 'lastName', 'roles', 'taille'];
   test.map(t=>{ this.displayedColumns.push(t.name); });
    console.log(this.displayedColumns);
  }
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
     if(charCode==44) 
     {
       return true;
     }
     else  return false;
    }
   
    return true;

  }
  test(value)
  {
    let r=1;
    r=value.toString().replace(',', '.');
  
    console.log(r);
  }

}
export const test=[
  {
    name: 'test1'},
  {  name:'test2'  }
]
export const User = [{
  firstName: 'User',
  lastName: '1',
  taille: 15.51,
  roles: [{id: '1', roleName: 'first Role'},
      {id: '2', roleName: 'second Role'}]
}, {
  firstName: 'User',
  lastName: '2',
  taille: 15.71,

  roles: [{id: '1', roleName: 'third Role'},
      {id: '2', roleName: 'fourth Role'}]
}];
