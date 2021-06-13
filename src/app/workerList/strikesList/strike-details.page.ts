import { DetectionsService } from './../../detectionList/detections.service';
import { StrikesService } from './../strikes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-strike-details',
  templateUrl: './strike-details.page.html',
  styleUrls: ['./strike-details.page.scss'],
})
export class StrikeDetailsPage implements OnInit, OnDestroy {
  workerId: string;
  loadedWorker;
  loadedStrikes = [];

  workerSub: Subscription;
  strikeSub: Subscription;
  detectionSub: Subscription;

  constructor(
    private detectionService: DetectionsService,
    private strikesService: StrikesService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.workerId = paramMap.get('workerId');
      console.log(this.workerId);

      this.strikeSub = this.strikesService.getStrikes().subscribe((strikes) => {
        // count how many strikes the worker has
        this.loadedStrikes = strikes.filter((strike) => {
          return strike['worker'].id === this.workerId;
        })

        this.loadedWorker = this.loadedStrikes[0].worker;

        // this.workerSub = this.strikesService.getWorker(this.workerId).subscribe(data => {
        //   this.loadedWorker = data;
        //   console.log(this.loadedWorker);
        // })

        // this.strikesService.getWorkerStrikes(this.workerId).then(querySnapshot => {

        //   this.loadedStrikes = [];

        //   querySnapshot.forEach(strike => {
        //       console.log(strike.id, " => ", strike.data());

        //       let detectionId = strike.data()['detectionId'];
        //       this.detectionSub = this.detectionService.getDetection(detectionId).subscribe(detection => {
        //         let loadedDetection = detection;
        //         console.log(loadedDetection);
        //         this.loadedStrikes.push({id: strike.id, frameUrl: loadedDetection['frameUrl'], ...strike.data() as {}});
        //       })
        //   });
        //   console.log(this.loadedStrikes);
        // });
      })

    });
  }

  onResolve(id: string){
    this.alertCtrl.create({
      header: 'Confirm Resolve',
      message: 'Do you really want to resolve this strike?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.toastCtrl.create({
              message:'Resolve Successful',
              duration: 2000
            }).then(toastEl => {
              this.strikesService.updateStrikeStatus(id).then(() => {
                toastEl.present();
              });
            })
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });



  }

  ngOnDestroy(){
    // if(this.workerSub){
    //   this.workerSub.unsubscribe();
    // }

    if(this.strikeSub){
      this.strikeSub.unsubscribe();
    }

    // if(this.detectionSub){
    //   this.detectionSub.unsubscribe();
    // }
  }
}
