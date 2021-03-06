import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,) {
    if(this.authService.isLoggedIn())
      this.router.navigate(['/home']);
   }
  get userName(){
    return this.registrationForm.get("authCredentialsDto").get("username");
  }
  get password(){
    return this.registrationForm.get("authCredentialsDto").get("password");
  }
  ngOnInit(): void {
    this.registrationForm= this.fb.group({
      authCredentialsDto: new FormGroup({
        username: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required),
      }),
      createProfileDto : new FormGroup({
        firstname: new FormControl(null,Validators.required),
        lasttname: new FormControl(null,Validators.required),
        email: new FormControl(null,[Validators.required,Validators.email]),
        gender: new FormControl(null,Validators.required),
        age: new FormControl(null,Validators.required),
        phone: new FormControl(null,Validators.required),
        country: new FormControl(null,Validators.required),
        city: new FormControl(null,Validators.required),
        address: new FormControl(null,Validators.required),
      }),})
  }

  register(){
    const userCredentials={
      username:this.userName.value,
      password:this.password.value,
    };
    this.authService.register(this.registrationForm.value).subscribe(
      res=>{
        this.authService.login(userCredentials).subscribe(
          resToken=>{
            localStorage.setItem('token',resToken.accessToken);
            this.authService.prepareUserData();
            this.authService.getCurrentUser().subscribe(resUser=>{
              this.authService.currentUser=resUser;
            },
              error=>{
                console.error(error);
              }
            );
            this.router.navigate(['/home']);
          },error=>{

          }
          )
        },
      error=>{

      }
    )
  }

}
