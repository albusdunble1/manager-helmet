import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetectionsService {

  constructor(
    private db: AngularFirestore
  ) { }


  getDetections(){
    return this.db.collection('detections').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));
  }

  getDetection(id: string){
    return this.db.doc('detections/' + id).valueChanges({idField: 'id'});
  }


  removeDetection(id: string){
    this.db.doc('detections/' + id).delete();
  }



}
