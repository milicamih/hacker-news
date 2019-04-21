import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../models/comment';
import { TopStory } from '../../models/topStory';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  
  private serverAddress = "https://hacker-news.firebaseio.com/v0/";

  constructor(private http: HttpClient) { }


  getTopStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.serverAddress}topstories.json?print=pretty`);
  }

  getItemsStories(id: number): Observable<TopStory> {
    return this.http.get<TopStory>(`${this.serverAddress}item/${id}.json?print=pretty`);
  }

  getItemsComments(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.serverAddress}item/${id}.json?print=pretty`);
  }
}


