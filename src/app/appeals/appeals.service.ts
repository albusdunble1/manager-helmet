import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppealsService {

  constructor(
    private db: AngularFirestore
  ) { }

  getAppeals(){
    return this.db.collection('appeals').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));
  }

  updateAppealStatus(appealId: string, status: string, strikeId: string){
    if (status == 'rejected'){
      return this.db.doc('appeals/'+ appealId).update({status: status});
    } else {
      return this.db.doc('appeals/'+ appealId).update({status: status, 'strike.status': 'resolved'})
      .then(() => {
        this.db.doc('strikes/'+ strikeId).update({'status': 'resolved'});
      });
    }


  }

}
