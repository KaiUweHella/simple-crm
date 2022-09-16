import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userID = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

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
}
