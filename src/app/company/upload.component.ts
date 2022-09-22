import { CdkAriaLive } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { uploadFile } from '../models/apply.model';
import { GenericService } from '../services';
import { ApplyService } from '../services/apply.service';
import { ModalService } from '../services/modal.service';

@Component({
  templateUrl: 'upload.component.html',
  styleUrls: ['company.component.scss']
})

export class UploadComponent implements OnInit {
  uploadFile: File;
  categoryList: any;
  stateList: any;  
  phaseList: any;
  phaseId: number;
  sizePerPage=10;
  categoryId: number;
  uploadForm: FormGroup;
  state: string;
  lga: string;
  StateId: number;
  uploadNewName: string;
  uploadNameDoc: string;
  genk:GenericService;
  data: any[];
  uploadBody: uploadFile = {} as uploadFile;
  uploadApplyForm: FormGroup;
  
  
  lgalist = [];
  statelist = [{
    "state": 'Abia', "lga": ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa',
      ' Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi',]},
{ "state": 'Adamawa', "lga": ['Demsa', 'Fufore'] }];


constructor(private cd: ChangeDetectorRef,
  private apply: ApplyService,
  private modalService:ModalService,
  private gen: GenericService) { 
    this.genk = gen;


  }

ngOnInit() {
 this.getCategory();
 this.getLGAList();
 this.data = [];
 this.fetchdata();
 this.sizePerPage = this.genk.sizeten;
}

getCategory() {
  this.apply.getApplicationCategory().subscribe(res => {
    this.categoryList = res.data.data;
  });
  this.cd.markForCheck();
}

getPhases() {
  this.apply.getApplicationPhases(this.categoryId).subscribe(res => {
    //debugger;
    this.phaseList = res.data.data;
  });
  this.cd.markForCheck();
}

getStateList() {
  this.apply.getStateList().subscribe(res => {
    //debugger;
    this.phaseList = res.data.data;
  });
  this.cd.markForCheck();
}



getLGAList() {
  this.apply.getStateList().subscribe(res =>{
    this.stateList = res.data.data;
  });
  this.cd.markForCheck();
}
//   let obj = this.statelist.filter(x => x.state == this.state)[0];
//    this.lgalist = obj.lga
//  }

fetchdata(){

}



  saveTemplate(DeFile: any) {
    debugger;
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
   
  OnSubmit() {
debugger;
    const formDat: FormData = new FormData();
    this.uploadBody.id = 0;
    for (const key in this.uploadBody) {
      if (this.uploadBody[key]) {
        formDat.append(key.toString(), this.uploadBody[key]);
      }
    }

    if (this.uploadFile) {
      formDat.append(this.uploadNameDoc, this.uploadFile, this.uploadNewName);
    }
    this.apply.uploadApplyform(formDat)
      .subscribe(res => {

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
