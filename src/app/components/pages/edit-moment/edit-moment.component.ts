import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Moment } from 'src/app/Moment';
import { MomentsService } from 'src/app/service/moments.service';
import { MessagesService } from 'src/app/service/messages.service';



@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment
  btnText: string = 'Editar';

  constructor(private momentService: MomentsService, private route: ActivatedRoute, private messagesService: MessagesService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async editHandler(momentData: Moment){
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if(this.moment.image){
      formData.append('image', momentData.image);
    }
    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messagesService.add(`Momento ${id} alterado com sucesso!`);

    this.router.navigate(['/']);

  }

}
