import { AuthService } from './services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';

  constructor(public authService:AuthService) {
    authService.prepareUserData();
  }
  ngOnInit(): void {
    this.authService.prepareUserData();
  }
}
