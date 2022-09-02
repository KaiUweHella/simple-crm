import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date;
  loading = false;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
  }

  onNoClick(){
    
  }

  async save(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    const coll = collection(this.firestore, 'users');
    const userRef = doc(coll);
    await setDoc(userRef, this.user.toJson());
    this.loading = false;
  }
}
