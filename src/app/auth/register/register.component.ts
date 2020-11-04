import { Component, OnInit } from '@angular/core';
import { AuthService, Credential } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credential: Credential = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register = () => this.auth.register(this.credential);

}
