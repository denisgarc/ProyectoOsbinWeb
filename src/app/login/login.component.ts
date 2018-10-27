import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/shared/session.service';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model: any = {
    username: '',
    password: ''
  };

  constructor(public router: Router,
    private sessionService: SessionService) { }

  ngOnInit() {
    init_plugins();
  }

  logIn() {
    if (this.model.username === '' || this.model.password === '') {
      return;
    }

    this.sessionService.TryLogin(this.model.username, this.model.password)
      .subscribe(
        (success: boolean) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          }
        }, (error) => {
          console.error(error);
        }
      );
  }
}
