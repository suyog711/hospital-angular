import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  submitting: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  login() {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 2000)
  }

}
