import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Response } from '../Response';
import { Comments } from '../Comments';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private  http: HttpClient) {  }

  createComment(data: Comments): Observable<Response<Comments>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    return this.http.post<Response<Comments>>(url, data)
  }

}
