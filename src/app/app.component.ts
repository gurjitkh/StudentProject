import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Validators
  nameCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);
  semCtrl = new FormControl('', [
    Validators.required
  ]);
  descriptionCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(35)
  ]);
  dobCtrl = new FormControl('', [
    Validators.required,
  ]);
  courseCtrl = new FormControl('', [
    Validators.required,
  ]);
  //Validator End
  //TableData fetch Data from local Storage
  tableData: Array<student> = [];
  constructor() {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 1, new Date().getMonth() + 1, new Date().getDate());
    this.tableData = JSON.parse(localStorage.getItem("studentRecord")!);
    if (!this.tableData) {
      this.isAdding = true;
    }
    this.dataSource = new MatTableDataSource<student>(this.tableData);
  }
  //Table Headers
  displayedColumns: string[] = ['name', 'dob', 'semester', 'course', 'description'];
  //Table Data Source
  dataSource = new MatTableDataSource<student>();
  //Flag to control form and table visibility
  isAdding: Boolean = false;
  //Models
  maxDate: Date;
  public name: string = "";
  public sem: string = "";
  public description: string = "";
  public dob: string = "";
  public course: string = "";
  public studentRecord: Array<student> = [];
  courseList = ["Angular", "JavaScript", "C#", "Html"]
  title = 'StudentProject';

  //Method to save data to localstorage
  save() {
    if (this.nameCtrl.status == 'VALID' && this.semCtrl.status == 'VALID' && this.descriptionCtrl.status == 'VALID' && this.dobCtrl.status == 'VALID' && this.courseCtrl.status == 'VALID') {
      if (localStorage.getItem("studentRecord") == null && localStorage.getItem("studentRecord") == undefined) {
        this.studentRecord.push({ "name": this.name, "sem": this.sem, "description": this.description, "dob": this.getFormatedDate(this.dob), "course": this.course })
        let storData = JSON.stringify(this.studentRecord);
        localStorage.setItem("studentRecord", storData);
      } else {
        let storData = JSON.parse(localStorage.getItem("studentRecord")!);
        console.log(storData);
        storData.push({ "name": this.name, "sem": this.sem, "description": this.description, "dob": this.getFormatedDate(this.dob), "course": this.course });
        let actData = JSON.stringify(storData);
        localStorage.setItem("studentRecord", actData);
      }
      this.tableData = JSON.parse(localStorage.getItem("studentRecord")!);
      this.dataSource = new MatTableDataSource<student>(this.tableData);
      this.enableAdding();
    }
  }
  //Method to format the date
  getFormatedDate(date: string) {
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }
  //Method to control the visiblity flag and set model to null
  enableAdding() {
    this.isAdding = !this.isAdding;
    this.name = "";
    this.dob = "";
    this.sem = "";
    this.course = "";
    this.description = "";
    this.nameCtrl.reset();
    this.semCtrl.reset();
    this.descriptionCtrl.reset();
    this.courseCtrl.reset();
    this.dobCtrl.reset();
  }

}
interface student {
  name: string;
  sem: string;
  description: string;
  dob: string;
  course: string;
}
