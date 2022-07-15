import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formLogin: FormGroup = new FormGroup({
    login: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  login() {
    const credetials = this.formLogin.value
    this.authService.signIn(credetials).subscribe(
      () => {
        this.snackBar.open("Logado com sucesso", "OK", {
          duration: 3000
        })
        this.router.navigateByUrl('/funcionarios')
      }
    )
  }

}
