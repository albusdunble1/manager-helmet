import { DatePipe } from '@angular/common';
import { StrikesService } from './strikes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-strikes',
  templateUrl: 'strikes.page.html',
  styleUrls: ['strikes.page.scss']
})
export class StrikesPage implements OnInit, OnDestroy{
  workerSub: Subscription;
  strikeSub: Subscription;
  loadedWorkers = [];
  loadedWorkers2 = [];

  constructor(
    private strikesService: StrikesService,
    private loadingCtrl: LoadingController,
    private datepipe: DatePipe
  ) {}


  ngOnInit(){
    this.getWorkerList();
  }

  getWorkerList(){
    this.loadingCtrl.create({
      message: 'Loading Workers...'
    }).then(loadingEl => {
      loadingEl.present();

      this.strikeSub = this.strikesService.getStrikes().subscribe((strikes) => {
        console.log(strikes)
        this.loadedWorkers2 = [];
        let workerTracker = [];

        // extract unique worker id from the strikes list
        strikes.forEach(strike => {
          if (!(workerTracker.includes(strike['worker'].id))){
            workerTracker.push(strike['worker'].id);
          }
        })

        console.log(workerTracker.length);


        let strikestracker = [];

        workerTracker.forEach(workerId => {
          // count how many strikes the worker has
          let temp = strikes.filter((strike) => {
            return strike['worker'].id === workerId && strike['status'] === 'active';
          })
          console.log(temp.length);
          if (temp.length > 0){
            let strikeCount = temp.length;
            console.log(strikeCount);

            if (!(strikestracker.includes(strikeCount))){
              strikestracker.push(strikeCount);
              let newObject = {};
              newObject['strikeCount'] = strikeCount;
              newObject['workers'] = [temp[0]['worker']];

              this.loadedWorkers2.push(newObject);
            } else {
              let obj = this.loadedWorkers2.find((o, i) => {
                if (o.strikeCount === strikeCount) {
                    this.loadedWorkers2[i]['workers'].push(temp[0]['worker']);
                    return true; // stop searching
                }
              });
            }

            console.log(this.loadedWorkers2);
            console.log(temp);
          }

          loadingEl.dismiss();
        })

        // sort from highest strike count
        this.loadedWorkers2 = this.loadedWorkers2.sort(function(a,b){
          return (b.strikeCount - a.strikeCount);
        });





        // =========== BEFORE DENORMALIZATION ===========
        // this.workerSub = this.strikesService.getWorkers().subscribe(data => {
        //   this.loadedWorkers = [];

        //   let strikestracker = [];

        //   data.forEach(worker => {
        //     let strikeCount = 0;
        //     this.strikesService.checkActiveStrikes(worker['id']).then((querySnapshot) => {

        //       querySnapshot.forEach((doc) => {
        //           console.log(doc.id, " => ", doc.data());
        //           strikeCount += 1;
        //       });

        //       console.log(strikeCount);

        //       let workerObject = {
        //         id: worker['id'],
        //         name: worker['name'],
        //         dob: worker['dob'],
        //         currentProject: worker['currentProject'],
        //         phone: worker['phone'],
        //         startDate: worker['startDate']
        //       }

        //       if (!(strikestracker.includes(strikeCount))){
        //         strikestracker.push(strikeCount);
        //         let newObject = {};
        //         newObject['strikeCount'] = strikeCount;
        //         newObject['workers'] = [workerObject]

        //         this.loadedWorkers.push(newObject);
        //       } else {
        //         let obj = this.loadedWorkers.find((o, i) => {
        //           if (o.strikeCount === strikeCount) {
        //               this.loadedWorkers[i]['workers'].push(workerObject);
        //               return true; // stop searching
        //           }
        //         });
        //       }
        //       loadingEl.dismiss();

        //     });
        //   });

        //   console.log(this.loadedWorkers);

        //   // sort array by highest strikeCount
        //   this.loadedWorkers = this.loadedWorkers.sort(function(a,b){
        //     return (b.strikeCount - a.strikeCount);
        //   });

        //   console.log(this.loadedWorkers);
        // })
        // =========== BEFORE DENORMALIZATION ===========
      })



    })
  }


  ngOnDestroy(){
    // if(this.workerSub){
    //   this.workerSub.unsubscribe();
    // }

    if(this.strikeSub){
      this.strikeSub.unsubscribe();
    }
  }
}
