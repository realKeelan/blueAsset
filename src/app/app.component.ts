import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blueAsset';

  constructor(private tokenService: TokenService){
    this.tokenService.getTokenFromLocalStorage();
  }

}
