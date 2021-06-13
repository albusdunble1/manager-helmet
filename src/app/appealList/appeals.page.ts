import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { AppealsService } from './appeals.service';
import { DetectionsService } from '../detections/detections.service';
import { StrikesService } from '../strikes/strikes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-appeals',
  templateUrl: './appeals.page.html',
  styleUrls: ['./appeals.page.scss'],
})
export class AppealsPage implements OnInit, OnDestroy {
  loadedAppeals;
  appealSub: Subscription;

  constructor(
    private appealService: AppealsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    // this.strikeService.getWorkers().subscribe(workers => {
    //   this.loadedWorkers = workers;
    //   console.log(workers);
    // });

    // this.detectionService.getDetections().subscribe(detections => {
    //   this.loadedDetections = detections;
    // });

    this.loadingCtrl.create({
      message: 'Loading Appeals...'
    }).then(loadingEl => {
      loadingEl.present();
      this.appealSub = this.appealService.getAppeals().subscribe(appeals => {
        this.loadedAppeals = appeals.filter(appeal => {
          return appeal['status'] === "pending";
        });

        console.log(this.loadedAppeals);

        // sort array by latest date
        this.loadedAppeals = this.loadedAppeals.sort(function(a,b){
          return b.date - a.date;
        });

        loadingEl.dismiss();
      });
    });


  }

  onStatusChange(appealId:string, status: string, strikeId: string){
    this.appealService.updateAppealStatus(appealId, status, strikeId);


    if(status == 'approved'){
      this.toastCtrl.create({
        message:'Appeal Approved',
        duration: 2000
      }).then(toastEl => {
        toastEl.present();
      })
    }else{
      this.toastCtrl.create({
        message:'Appeal Rejected',
        duration: 2000
      }).then(toastEl => {
        toastEl.present();
      })
    }
  }


  ngOnDestroy(){
    if(this.appealSub){
      this.appealSub.unsubscribe();
    }
  }


  // onQueryUpdate(){
  //   this.strikeService.queryUpdate('wTRXGatSN1Q0qCy2zcsh');
  // }

}
