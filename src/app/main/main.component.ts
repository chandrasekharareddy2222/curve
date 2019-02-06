import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_service/auth.service';
import { first } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    // Sidenav responsive
    width;
    height;
    mode = 'side';
    open = 'true';
    title = 'Witcurve: Admin App';
    isLoggedIn = false;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    uc;

    constructor(public ngZone: NgZone,
                private formBuilder: FormBuilder,
                private router: Router,
                private toastr: ToastrService,
                private authenticationService: AuthenticationService) {
        this.changeMode();
        window.onresize = (e) => {
            ngZone.run(() => {
                this.changeMode();
            });
        };
        const uc = this.authenticationService.getUserContext();
        if (uc) {
          this.uc = uc;
        }
    }

    checkLogin() {
      const jwtToken = localStorage.getItem('token_jwt');
      if (jwtToken) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }

    ngOnInit() {
      this.checkLogin();
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoggedIn = true;
          this.loading = false;
          this.authenticationService.setUserContext().subscribe(user => {
            localStorage.setItem('user_context', JSON.stringify(user));
            this.uc = user;
            console.log(this.uc);
          });
        },
        error => {
          this.toastr.error(`Login Failed ${error}`, 'Error', { closeButton: true });
          this.loading = false;
        });
  }

  logout() {
      this.authenticationService.logout();
      this.checkLogin();
  }

  changeMode() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      if (this.width <= 800) {
          this.mode = 'over';
          this.open = 'false';
      }
      if (this.width > 800) {
          this.mode = 'side';
          this.open = 'true';
      }
  }

}

export class NavLinks {
  public static NAVIGATION_DATA = [
    {
      name: 'Home',
      icon: 'fa-home',
      children: null,
      link: '/'
    },
    {
      name: 'Academics',
      icon: ''
    }
  ];
}
