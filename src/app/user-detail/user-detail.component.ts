import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import {
  collection,
  doc,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userID = '';
  user: User = new User();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (pm) => {
      this.userID = pm.get('id');
      console.log(this.userID);

      const coll = collection(this.firestore, 'users');
      this.userID = pm.get('id');
      const docRef = doc(coll, this.userID);
      const unsub = onSnapshot(docRef, (doc) => {
        const data: any = doc.data();
        this.user = new User(data);
        this.user.address = data.address;
      });
    });
  }

  openAddressDialog() {}

  editMenu() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    console.log(this.user.toJson());
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userID = this.userID;
  }

  editUserDetail() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    console.log(this.user.toJson());
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userID = this.userID;
  }
}
