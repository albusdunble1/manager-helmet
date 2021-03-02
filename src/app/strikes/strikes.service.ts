import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StrikesService {
  constructor(
    private db: AngularFirestore
  ) { }

  getWorkers(){
    return this.db.collection('workers').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));

  }

  getStrikes(){
    return this.db.collection('strikes').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));
  }

  // getWorker(workerId: string){
  //   return this.db.doc('workers/' + workerId).valueChanges({idField: 'id'});
  // }

  // getWorkerStrikes(workerId: string){
  //   return this.db.collection("strikes").ref.where("workerId", "==", workerId).get();
  // }

  createStrike(strikeInfo){
    return this.db.collection('strikes').add(strikeInfo);
  }

  // checkActiveStrikes(workerId: string){
  //   return this.db.collection("strikes").ref.where("workerId", "==", workerId).where("status", "==", 'active').get();
  // }

  updateStrikeStatus(strikeId: string){
    return this.db.doc('strikes/'+ strikeId).update({status: 'resolved'})
    .then(() => {
      this.db.collection('appeals').ref.where('strike.id', '==', strikeId).get().then((query) => {
        query.forEach((doc) => {
          this.db.doc('appeals/'+ doc.id).update({'strike.status': 'resolved'});
        });
      });
    });

  }


  queryUpdate(detectionId: string){
    this.db.collection('strikes').ref.where('detectionId', '==', detectionId).get().then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.db.doc('strikes/'+ doc.id).update({status: 'active'});

    });
  });
  }
}
