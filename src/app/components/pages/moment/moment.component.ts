import { Comment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validator, FormGroupDirective, Validators } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';

import { MessagesService } from 'src/app/service/messages.service';
import { MomentsService } from 'src/app/service/moments.service';

import { Moment } from 'src/app/Moment';
import { Comments } from 'src/app/Comments';

import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment?: Moment;
  //Importação da URL
  baseApiUrl = environment.baseApiUrl 
  //Ícones
  faTimes = faTimes;
  faEdit = faEdit;

  commentForm! : FormGroup
  
  constructor(private momentService: MomentsService,
     private route: ActivatedRoute, 
     private messagesService: MessagesService, 
     private router: Router,
     private commentService: CommentService   
     ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup ({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    })
  }

  get text() {
    return this.commentForm.get('text')!;
  }
  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {


    //Não deixar enviar o formulário sem os campos estarem preenchidos.
    if(this.commentForm.invalid){
      return
    }

    const data: Comments = this.commentForm.value

    data.momentId = Number(this.moment!.id);
    this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add("Comentário adicionado!");

    //Resetar  o form
    this.commentForm.reset();

    formDirective.resetForm();
   

  }



  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluído com sucesso!");

    this.router.navigate(['/']);
  }



}
