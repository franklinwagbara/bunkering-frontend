import { CdkAriaLive } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplyService } from '../services/apply.service';

@Component({
  templateUrl: 'upload.component.html',
  styleUrls: ['company.component.scss']
})

export class UploadComponent implements OnInit {
  uploadFile: File;
  uploadForm: FormGroup;
  state: string;
  lga: string;
  lgalist = [];
  statelist = [{
    "state": 'Abia', "lga": ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa',
      ' Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi',]},
{ "state": 'Adamawa', "lga": ['Demsa', 'Fufore'] }];


constructor(private cd: ChangeDetectorRef, 
  private apply: ApplyService) { }

ngOnInit(): void {
  this.apply.getApplicationCategory().subscribe(res => {
let dan = res;
  });
}


getLGAList() {

  let obj = this.statelist.filter(x => x.state == this.state)[0];
  this.lgalist = obj.lga
}

  // saveTemplateDoc(DeFile: any) {
  //   this.uploadFile = <File>DeFile.target.files[0];
  //   if (!this.uploadFile) {
  //       return;
  //     }
  //      if (this.uploadFile.size < 1 || this.uploadFile.size > 1024 * 1024 * 50) {
  //      this.uploadForm.controls['uploadFile'].setErrors({ 'incorrect': true });
  //       this.uploadFile = null;
  //       return;
  //     } else {
  //       this.uploadForm.controls['uploadFile'].setErrors(null);
  //     }
  //     this.uploadNewName = this.gen.getExpDoc(this.uploadFile.name, this.uploadFile.type);
  //     this.uploadNameDoc = this.uploadNewName;
  //     let dockind = this.gen.getExt(this.File.name);
  // }
    
}
