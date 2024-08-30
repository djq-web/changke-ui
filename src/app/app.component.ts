import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ChangeKeModule,
  CommonGridComponent,
} from '../../projects/changke/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChangeKeModule, CommonGridComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: CommonGridComponent | undefined;
  title = 'changkeui';
  pageSettings = {
    pageSizes: ['All', 15, 50, 100],
    pageSize: 15,
  };
  gridFields: any;
  initialSort: any;
  dataSource = [];
  isLoading = false;
  ngOnInit() {
    this.gridFields = this.getFields();
  }
  getFields() {
    return [
      {
        columnName: 'email1',
        columnDisplayName: 'Email',
        visible: true,
      },
      {
        columnName: 'prefixCode',
        columnDisplayName: 'Salutation',
        width: 120,
        minWidth: 120,
        visible: true,
      },
      {
        columnName: 'firstName',
        columnDisplayName: 'First Name',
        visible: true,
      },
      {
        columnName: 'lastName',
        columnDisplayName: 'Last Name',
        visible: true,
      },
      {
        columnName: 'department',
        columnDisplayName: 'Department',
        visible: true,
        width: 150,
        minWidth: 150,
      },
      {
        columnName: 'jobTitle',
        columnDisplayName: 'Job Title',
        visible: true,
        width: 150,
        minWidth: 150,
      },
      {
        columnName: 'relatedApps',
        columnDisplayName: 'Related APPs',
        visible: true,
        width: 150,
        minWidth: 150,
        showTemplate: true,
      },
      {
        columnName: 'relatedProjects',
        columnDisplayName: 'Related Projects',
        visible: true,
        width: 150,
        minWidth: 150,
        showTemplate: true,
      },
    ];
  }
}
