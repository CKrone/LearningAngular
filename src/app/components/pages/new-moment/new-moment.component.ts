import { MessagesService } from 'src/app/service/messages.service';
import { MomentsService } from './../../../service/moments.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Moment } from '../../../Moment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText = 'Compartilhar!';

  constructor(private momentService: MomentsService, private messagesService: MessagesService, private router: Router) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moment) {
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if(moment.image){
      formData.append('image', moment.image);
    }


    //Enviar dados para o service
    await this.momentService.createMoment(formData).subscribe();

    //Exibindo mensagem
    this.messagesService.add("Momento Adicionado com Sucesso!");

    //Redirecionando usuário
    this.router.navigate(['/']);
  }

}
