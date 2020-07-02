import { AlertService } from './../../../services/alert/alert.service';
import { CartService } from './../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   authCredentialsDto:FormGroup;
   showPass = true;
   modalRef:BsModalRef;
   @ViewChild('invalidCredentials', {static: true}) invCredentials: TemplateRef<any>;
  constructor(private authService:AuthService, private router:Router,private modalService:BsModalService,
    private fb:FormBuilder,private alertService:AlertService, private cartService:CartService) { 
      if(this.authService.isLoggedIn())
      this.router.navigate(['/home']);
    }

  ngOnInit(): void {
    this.authCredentialsDto = this.fb.group({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    });
  }

  userLogin(){
    this.authService.login(this.authCredentialsDto.value).subscribe(
      res=>{
        localStorage.setItem('token',res.accessToken);
        this.authService.prepareUserData();
        this.authService.getCurrentUser().subscribe(resUser=>{
          this.authService.currentUser=resUser;
        });
        this.router.navigate(['/home']);
      },
      error=>{
        this.alertService.error(error);
        this.modalService.show(this.invCredentials);
      }
    )
  }

  openModal(template: TemplateRef<any>){
    this.modalRef =this.modalService.show(template);
  }
  hide(): void {
    this.modalService.hide(1);
  }
}
