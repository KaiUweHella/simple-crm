import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent implements OnInit {
  user: User;
  loading = false;
  userID;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {}

  async save() {
    this.loading = true;

    const coll = collection(this.firestore, 'users');
    const userRef = doc(coll, this.userID);
    console.log(this.user.address);
    await updateDoc(userRef, this.user.toJson());
    this.loading = false;
  }
}
