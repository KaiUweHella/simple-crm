import { Component, OnInit } from '@angular/core';
import { doc, onSnapshot } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { collection, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers = [];
  userID;

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  async ngOnInit(): Promise<void> {
    const coll = collection(this.firestore, 'users');

    const unsubscribe = onSnapshot(coll, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allUsers.push({ ...doc.data(), id: doc.id });
      });
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
