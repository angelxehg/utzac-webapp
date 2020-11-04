import { Component, OnInit } from '@angular/core';
import { AuthService, Credential } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credential: Credential = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login = () => this.auth.login(this.credential);

}
