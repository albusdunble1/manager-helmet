import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private db: AngularFirestore
  ) { }


  getReports(){
    return this.db.collection('reports').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));
  }

  getReport(id: string){
    return this.db.doc('reports/' + id).valueChanges({idField: 'id'});
  }

  createReport(reportInfo){
    return this.db.collection('reports').add(reportInfo);
  }

  getMonthlyData(){

    console.log('hello');
    var date =  new Date();
    console.log(new Date(date.getFullYear(), date.getMonth(),1));
    console.log(date.getFullYear(), date.getMonth(),1);


    // get all appeals for this month
    let appealsCount = 0;
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;

    this.db.collection('appeals').ref.where('date', '>=', new Date(date.getFullYear(), date.getMonth(), 1)).get().then((query) => {
      console.log('hi');

      query.forEach((doc) => {
        console.log(doc.id);
        appealsCount += 1;

        if(doc.data()['status'] == 'pending'){
          pendingCount += 1;
        }else if (doc.data()['status'] == 'approved'){
          approvedCount += 1;
        }else{
          rejectedCount += 1;
        }
      });
    });

    // get all strikes for this month
    let strikesCount = 0;
    let activeCount = 0;
    let resolvedCount = 0;

    this.db.collection('strikes').ref.where('date', '>=', new Date(date.getFullYear(), date.getMonth(), 1)).get().then((query) => {
      console.log('hi');

      query.forEach((doc) => {
        console.log(doc.id);
        strikesCount += 1;
        if(doc.data()['status'] == 'active'){
          activeCount += 1;
        }else{
          resolvedCount +=1;
        }
      });

    });


    return new Promise((resolve, reject) => {


      // get all detections for this month
      let detectionsCount = 0;
      let detectionsReceived = false;

      this.db.collection('detections').ref.where('date', '>=', new Date(date.getFullYear(), date.getMonth(), 1)).get().then((query) => {
        console.log('hi');
        query.forEach((doc) => {
          console.log(doc.id);
          detectionsCount += 1;
        });

        detectionsReceived = true;
        if(detectionsReceived){
          let monthlydata = {
            appeals: appealsCount,
            strikes: strikesCount,
            detections: detectionsCount,
            pendingappeals: pendingCount,
            approvedappeals: approvedCount,
            rejectedappeals: rejectedCount,
            activestrikes: activeCount,
            resolvedstrikes: resolvedCount
          }
          console.log(monthlydata);
          resolve(monthlydata);
        }else{
          reject('lol');
        }
      });

    });



  }

}
