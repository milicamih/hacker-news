import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HackerNewsService } from './shared/services/hacker-news-service/hacker-news.service';
import { SpinnerService } from './shared/services/spinnerService/spinner.service';
import { TopStory } from './shared/models/topStory';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  storiesIds: number[] = [];
  allStories: TopStory[] = [];
  showLoadMoreButton = true;

  constructor(private http: HttpClient,
    private hackerNewsService: HackerNewsService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.start();
    this.hackerNewsService.getTopStoriesIds().subscribe((storiesIds) => {
      this.storiesIds = storiesIds;
      this.loadTopStoriesForkJoin();     
    })
    this.spinnerService.stop();
  }

  loadTopStoriesForkJoin() {
    const observables = [];
    if (this.storiesIds.length - this.allStories.length > 20) {
      this.storiesIds.slice(this.allStories.length, this.allStories.length + 20).forEach(element => {
        observables.push(this.hackerNewsService.getItemsStories(element));
      });
    } else {
      this.storiesIds.slice(this.allStories.length).forEach(element => {
        observables.push(this.hackerNewsService.getItemsStories(element));
      });
    }
    this.spinnerService.start();
    forkJoin(observables).subscribe(response => {
      this.allStories = this.allStories.concat(response);
      this.showLoadMoreButton = ((this.storiesIds.length - this.allStories.length) < 20);
      this.spinnerService.stop();
    }, error => {
      this.spinnerService.stop();
    })
  }

  onCLickLoadMoreButton() {
    this.loadTopStoriesForkJoin();
  }

}
