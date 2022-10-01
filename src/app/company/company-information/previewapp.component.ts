import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreviewModel, uploadFile } from 'src/app/models/apply.model';
import { GenericService } from 'src/app/services';
import { ApplyService } from 'src/app/services/apply.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  templateUrl: 'previewapp.component.html',
  styleUrls: ['../company.component.scss']})

export class PreviewAppComponent {
    uploadFile: File;
  categoryList: any;
  stateList: any;  
  phaseList: any;
  phaseId: number;
  sizePerPage=10;
  categoryId: string = '';
  uploadForm: FormGroup;
  state: string;
  lga: string;
  LgaId: number;
  stateId: number;
  title: 'Preview App';
  uploadNewName: string;
  uploadNameDoc: string;
  genk:GenericService;
  data: any[];
  uploadBody: uploadFile = {} as uploadFile;
  previewForm: FormGroup;
  lgalist = [];
  statelist = [];
  category: string;
  address: string = '';
  phase: string;
  applicationTypeId: string = '';
  companyDetail:any;
  previewBody: PreviewModel = {} as PreviewModel;
  

constructor(private cd: ChangeDetectorRef,
  private apply: ApplyService,
  private modalService:ModalService,
  private gen: GenericService, private fb: FormBuilder) { 
    this.genk = gen;
  }

ngOnInit() {
  this.initForm();
 this.getCategory();
 this.getStateList();
 this.data = [];
 this.fetchdata();
 this.sizePerPage = this.genk.sizeten;
 this.getCompanyDetailById(7);
}


initForm() {
  this.previewForm = new FormGroup ({
    'categoryId': new FormControl(this.categoryId, [Validators.required]),
    'phaseId': new FormControl(this.phaseId, [Validators.required]),
    'lgaId': new FormControl(this.LgaId),
    'location': new FormControl(this.address, [Validators.required]),
    'file': new FormControl('', [Validators.required]),
    'doc': new FormControl('', [Validators.required]),
  })
}

get f() {
  return this.previewForm.controls;
}

onFileChange(event) {
  
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.previewForm.patchValue({
      file: file
    });
  }
}

getCategory() {
  this.apply.getApplicationCategory().subscribe(res => {
    this.categoryList = res.data.data;
  });
  this.cd.markForCheck();
}

getPhases(e) {
  this.categoryId = e.target.value;
  this.apply.getApplicationPhases(e.target.value).subscribe(res => {
    //debugger;
    this.phaseList = res.data.data;
  });
  this.cd.markForCheck();
}

getStateList() {
  this.apply.getStateList().subscribe(res => {
    
    this.stateList = res.data.data;
  });
  this.cd.markForCheck();
}



// getLGAList() {
//   this.apply.getLgaList().subscribe(res =>{
//     this.lgalist= res.data.data;
//   });
//   this.cd.markForCheck();
// }
//   let obj = this.statelist.filter(x => x.state == this.state)[0];
//    this.lgalist = obj.lga
//  }

getLgaByState(e) {
  this.apply.getLgaByStateId(e.target.value).subscribe(res => {
    this.lgalist = res.data.data;
  });
  this.cd.markForCheck();
}

getCompanyDetailById(e) {
    this.apply.getappdetailsbyId(7).subscribe(res => {
        debugger;
      this.previewBody = res.data.data as PreviewModel;
      debugger;
    });
    this.cd.markForCheck();
  }

fetchdata(){

}



  saveTemplate(DeFile: any) {
    this.uploadFile = <File>DeFile.target.files[0];
    if (!this.uploadFile) {
        return;
      }
       if (this.uploadFile.size < 1 || this.uploadFile.size > 1024 * 1024 * 50) {
       this.uploadForm.controls['uploadFile'].setErrors({ 'incorrect': true });
        this.uploadFile = null;
        return;
      } else {
        this.uploadForm.controls['uploadFile'].setErrors(null);
      }
      this.uploadNewName = this.gen.getExpDoc(this.uploadFile.name, this.uploadFile.type);
      this.uploadNameDoc = this.uploadNewName;
     // let dockind = this.gen.getExt(this.File.name);
  }
   
  submit() {
    debugger;
    // let addr = this.f['address'].value;
    let a = this.categoryId;
    let b = this.phaseId;

    const formDat: FormData = new FormData();
    formDat.append('categoryId', this.previewForm.get('categoryId').value);
    formDat.append('phaseId', this.previewForm.get('phaseId').value);
    formDat.append('LgaId', this.previewForm.get('lgaId').value);
    formDat.append('location', this.previewForm.get('location').value);
    formDat.append('doc', this.previewForm.get('file').value);
    // if (this.uploadFile) {
    //   formDat.append('doc', this.uploadFile, this.uploadNewName);
    // }
    this.apply.uploadApplyform(formDat).subscribe(res => {

        if (res.statusCode == 300) {
          this.modalService.logNotice("Error", res.message, 'error');
        }
        else {
          //this.loadTable_Management(res.data);
          this.modalService.logNotice("Success", res.message, 'success');
        }
      })
  }
  
}