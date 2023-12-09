import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-crud';

  displayedColumns:string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _dialog:MatDialog,private service:EmployeeService) {}
  
  ngOnInit(): void {
    this.getAllEmployees();
  }
  openAddEditEmpForm(){
   const dialogRef =  this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next:(value) => {
      if (value){
        this.getAllEmployees();
      }
    },
   })
  }
  getAllEmployees(){
    this.service.getAllEmployee().subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteEmployee(id:number){
    this.service.deleteEmployeeById(id).subscribe((res:any)=>{
      alert('Deleted Successfully');
      this.getAllEmployees();
    }) 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data:any){
    const dialogRef =this._dialog.open(EmpAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(value) => {
        if (value){
          this.getAllEmployees();
        }
      },
     })
  }
}
