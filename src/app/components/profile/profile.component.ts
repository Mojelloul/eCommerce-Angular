import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Profile } from './../../models/profile';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  modalRef:BsModalRef;
  constructor(private authService:AuthService, private modalService:BsModalService,private router:ActivatedRoute) 
  {
    if(router.snapshot.data.profile){
      this.profile=router.snapshot.data.profile;
      this.updateObject.firstname=this.profile.firstname;
      this.updateObject.lastname=this.profile.lastname;
      this.updateObject.age=this.profile.age;
      this.updateObject.email=this.profile.email;
      this.updateObject.gender=this.profile.gender;
      this.updateObject.phone=this.profile.phone;
      this.updateObject.country=this.profile.country;
      this.updateObject.city=this.profile.city;
      this.updateObject.address=this.profile.address;
    }
  }

  updateObject={
    firstname:null,
    lastname:null,
    email:null,
    gender:null,
    age:null,
    phone:null,
    country:null,
    city:null,
    address:null
  }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>){
    this.modalRef =this.modalService.show(template);
  }
  updateProfile(){
    this.authService.updateProfile(this.updateObject).subscribe(
      result=>{
        this.profile=result;
        this.authService.username=`${result.firstname} ${result.lastname}`;
      }
    )
  }
  hide(): void {
    this.modalService.hide(1);
  }
}
