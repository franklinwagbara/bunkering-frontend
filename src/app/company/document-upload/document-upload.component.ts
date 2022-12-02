import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyService } from 'src/app/shared/services/company.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { AdditionalDocListFormComponent } from './additional-doc-list-form/additional-doc-list-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
})
export class DocumentUploadComponent implements OnInit {
  public application_id: number;
  public documentConfig: DocumentConfig;
  public documents$ = new Subject<DocumentInfo[]>();
  public documents: DocumentInfo[] = [];
  public additionalDocuments$ = new Subject<DocumentInfo[]>();
  public additionalDocuments: DocumentInfo[] = [];

  applicationTableKeysMappedToHeaders = {
    docName: 'Document Name',
    source: 'Source',
    available: 'Available',
    action: 'ACTION',
  };

  constructor(
    private companyService: CompanyService,
    private applicationService: ApplyService,
    private progressBar: ProgressBarService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.application_id = params['id'];
      this.getUploadDocuments();
    });

    this.additionalDocuments$.subscribe((data) => {
      this.additionalDocuments = [...data];
    });
  }

  getUploadDocuments() {
    this.progressBar.open();

    this.companyService.getUploadDocuments(this.application_id).subscribe({
      next: (res) => {
        this.documents = res.data.data.docs;
        this.documents = this.documents.map((d) => {
          d.source = d.docSource
            ? `<a href="${d.docSource}" target="_blank" rel="noopener noreferrer"><img width="20" src="assets/image/pdfIcon.png" /></a>`
            : `<img width="20" src="assets/image/no-document.png" />`;

          if (d.docSource) d.available = 'Document Uploaded';
          else d.available = 'Not Uploaded';

          return d;
        });
        this.documents$.next(this.documents);
        this.documentConfig = res.data.data.app;

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

  uploadFile(data) {
    this.progressBar.open();

    const fileEvent = data.file;
    const doc: DocumentInfo = data.doc;

    const action = doc.docSource ? 'update' : 'create';

    const file = fileEvent.target.files[0];
    const fileName = file.name;

    const formdata = new FormData();
    formdata.append('file', file);

    this.applicationService
      .uploadCompanyFileToElps(
        doc.docId,
        this.documentConfig.companyId,
        this.documentConfig.facilityId,
        this.documentConfig.apiEmail,
        this.documentConfig.apiHash,
        doc.docName,
        doc.docType,
        '',
        formdata,
        action
      )
      .subscribe({
        next: (res) => {
          this.documents = this.documents.map((d) => {
            if (d.docId === doc.docId) {
              d.docSource = res.source;
              d.fileId = res.FileId;
              d.available = 'Document Uploaded';
              d.source = d.docSource
                ? `<a href="${d.docSource}" target="_blank" rel="noopener noreferrer"><img width="20" src="assets/image/pdfIcon.png" /></a>`
                : `<img width="20" src="assets/image/no-document.png" />`;
            }

            return d;
          });
          this.documents$.next(this.documents);

          this.progressBar.close();
          this.snackBar.open('File was uploaded successfully!', null, {
            panelClass: ['success'],
          });
        },
        error: (error) => {
          this.progressBar.close();
          this.snackBar.open('File upload was not successfull.', null, {
            panelClass: ['error'],
          });
        },
      });
  }

  uploadAdditionalFile(data) {
    console.log('in additional');
    this.progressBar.open();

    const fileEvent = data.file;
    const doc: DocumentInfo = data.doc;

    const action = doc.docSource ? 'update' : 'create';

    const file = fileEvent.target.files[0];
    const fileName = file.name;

    const formdata = new FormData();
    formdata.append('file', file);

    this.applicationService
      .uploadCompanyFileToElps(
        doc.docId,
        this.documentConfig.companyId,
        this.documentConfig.facilityId,
        this.documentConfig.apiEmail,
        this.documentConfig.apiHash,
        doc.docName,
        doc.docType,
        '',
        formdata,
        action
      )
      .subscribe({
        next: (res) => {
          this.additionalDocuments = this.additionalDocuments.map((d) => {
            if (d.docId === doc.docId) {
              d.docSource = res.source;
              d.fileId = res.FileId;
              d.available = 'Document Uploaded';
              d.source = d.docSource
                ? `<a href="${d.docSource}" target="_blank" rel="noopener noreferrer"><img width="20" src="assets/image/pdfIcon.png" /></a>`
                : `<img width="20" src="assets/image/no-document.png" />`;
            }

            return d;
          });
          this.additionalDocuments$.next(this.additionalDocuments);

          console.log('let check', this.additionalDocuments, this.documents);

          this.progressBar.close();
          this.snackBar.open('File was uploaded successfully!', null, {
            panelClass: ['success'],
          });
        },
        error: (error) => {
          this.progressBar.close();
          this.snackBar.open('File upload was not successfull.', null, {
            panelClass: ['error'],
          });
        },
      });
  }

  getListOfAdditionalDocuments() {
    const operationsConfiguration = {
      additionalDocuments: {
        data: {
          documentConfig: this.documentConfig,
          additionalDocuments$: this.additionalDocuments$,
        },
        form: AdditionalDocListFormComponent,
      },
    };

    let dialogRef = this.dialog.open(
      operationsConfiguration['additionalDocuments'].form,
      {
        data: {
          data: operationsConfiguration['additionalDocuments'].data,
        },
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      this.progressBar.open();

      this.getUploadDocuments();
    });
  }

  submitApplication() {
    this.progressBar.open();

    const payload = {
      appId: this.application_id,
      docs: [...this.documents, this.additionalDocuments],
    };

    this.applicationService.submitApplication(payload).subscribe({
      next: (res) => {
        this.progressBar.close();
        this.snackBar.open(
          'Your Application was submitted successfully!',
          null,
          {
            panelClass: ['success'],
          }
        );
      },
      error: (res) => {
        this.snackBar.open(
          'Your Application submission was not successful.',
          null,
          {
            panelClass: ['error'],
          }
        );
        this.progressBar.close();
        this.progressBar.close();
      },
    });
  }
}

export class DocumentConfig {
  apiEmail: string;
  apiHash: string;
  appid: string;
  companyId: string;
  facilityId: string;
}

export class DocumentInfo {
  id: string;
  docId: string;
  docName: string;
  docSource: string;
  source: string;
  fileId: string;
  available: string;
  docType: string;
}
