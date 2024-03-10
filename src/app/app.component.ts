import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmplyoeeService } from './emplyoee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-app';


  displayedColumns: string[] = [
    "id",
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private empService: EmplyoeeService) { }
  ngOnInit(): void {
    this.getEmpList()
  }


  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getEmpList();
      }
    })
  }

  getEmpList() {
    this.empService.getEmpList().subscribe({
      next: (res) => {
        // this.dataSource = new MatTableDataSource(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err);


      },
    })
  }



  deleteEmp(id: number) {
    this.empService.deleteEmp(id).subscribe({
      next: (res) => {
        alert('Emplyoee Deleted')
        this.getEmpList()
      },
      error: console.log,
    })
  }


  openEditEmpForm(data:any) {
    const dialogRef=this.dialog.open(EmpAddEditComponent,{
      data,


    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getEmpList();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



