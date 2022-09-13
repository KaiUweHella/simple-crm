import { Component, OnInit } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date;
  loading = false;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {}

  async save() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    const coll = collection(this.firestore, 'users');
    const userRef = doc(coll);
    await setDoc(userRef, this.user.toJson());
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
