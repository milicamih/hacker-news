import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HackerNewsService } from '../shared/services/hacker-news-service/hacker-news.service';
import { SpinnerService } from '../shared/services/spinnerService/spinner.service';
import { Comment } from '../shared/models/comment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() public kidsStories: number[];

  storyComments: Comment[] = [];
  commentsAreLoaded = false;
  show = false;

  constructor(private http: HttpClient,
    private hackerNewsService: HackerNewsService,
    private spinnerService: SpinnerService) {
  }

  toggleComments() {  
    if (!this.commentsAreLoaded) {
      this.loadStoryComments();
    }
    this.show = !this.show;
  }

  loadStoryComments() {
    const observables = [];
    this.kidsStories.forEach(element => {
      observables.push(this.hackerNewsService.getItemsComments(element));
    });

    this.spinnerService.start();
    forkJoin(observables).subscribe(response => {
      response.forEach(item => {
        if (item.type == "comment") {
          this.storyComments.push(item);
        }
      })
      this.spinnerService.stop();
      this.commentsAreLoaded = true;
    }, error => {
      this.spinnerService.stop();
    })
  }


}
