import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moments-form',
  templateUrl: './moments-form.component.html',
  styleUrls: ['./moments-form.component.css']
})
export class MomentsFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup

  constructor() { }

  ngOnInit(): void {

    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id:''),
      title: new FormControl(this.momentData ? this.momentData.title: '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description: '', [Validators.required]),
      image: new FormControl('')
    });   
  }

  get title() {
    return this.momentForm.get('title')!;
  }
  
  get description() {
    return this.momentForm.get('description')!;
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }

    this.onSubmit.emit(this.momentForm.value);
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    this.momentForm.patchValue({image: file});
  }














}
