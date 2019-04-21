import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  start() { 
    const spinner = document.getElementById('spinner');
    spinner.className = "start-spinner";
   }
 
   stop() {
    const spinner = document.getElementById('spinner');
    spinner.className = "stop-spinner";
   }
}
