import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Credential } from '../auth.service';

interface ProcessStatus {
  status: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  statusMsg: ProcessStatus;

  credential: Credential = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  statusText(): string {
    if (!this.statusMsg) {
      return '';
    }
    return `text-${this.statusMsg.status}`;
  }

  login(): void {
    this.statusMsg = null;
    this.auth.login(this.credential).then(user => {
      this.statusMsg = { status: 'success', message: 'Inicio de sesión correcto' };
      console.log('Correct login');
      setTimeout((router: Router) => {
        router.navigateByUrl('/app');
      }, 2000, this.router);
    }).catch(err => {
      console.log(err);
      this.statusMsg = { status: 'danger', message: err.error.message };
    });
  }

}
