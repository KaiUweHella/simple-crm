import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { FormControl, Validators } from '@angular/forms';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent implements OnInit {
  user: User;
  birthDate: Date;
  loading = false;
  userID;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    console.log(this.user);
  }

  async save() {
    this.loading = true;

    const coll = collection(this.firestore, 'users');
    const userRef = doc(coll, this.userID);
    console.log(this.user.address);
    await updateDoc(userRef, this.user.toJson());
    this.loading = false;
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
