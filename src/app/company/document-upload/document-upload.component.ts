import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyService } from 'src/app/shared/services/company.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
})
export class DocumentUploadComponent implements OnInit {
  public application_id: number;
  documents$ = new Subject<any[]>();

  applicationTableKeysMappedToHeaders = {
    docType: 'Document Type',
    source: 'Source',
    typeName: 'Type Name',
    available: 'Available',
    action: 'Action',
  };

  constructor(
    private companyService: CompanyService,
    private progressBar: ProgressBarService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.application_id = params['id'];
      this.getUploadDocuments();
    });
  }

  getUploadDocuments() {
    this.progressBar.open();

    this.companyService.getUploadDocuments(this.application_id).subscribe({
      next: (res) => {
        this.documents$.next(res.data.data);

        this.progressBar.close();
      },
      error: (error) => {
        this.snackBar.open('Fetching upload documents failed!', null, {
          panelClass: ['error'],
        });
        this.progressBar.close();
      },
    });
  }
}
