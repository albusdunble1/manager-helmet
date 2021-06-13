import { DetectionsService } from './detections.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detections',
  templateUrl: 'detections.page.html',
  styleUrls: ['detections.page.scss']
})
export class DetectionsPage implements OnInit, OnDestroy{
  detectionSub: Subscription;
  loadedDetections = [];

  constructor(
    private datepipe: DatePipe,
    private detectionService: DetectionsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(){
    this.getDetectionList();
  }

  getDetectionList(){
    this.loadingCtrl.create({
      message: 'Loading Detections...'
    }).then(loadingEl => {
      loadingEl.present();
      this.detectionSub = this.detectionService.getDetections().subscribe(data => {
        this.loadedDetections = [];

        let datetracker = [];

        data.forEach(detection => {
          console.log(detection['date'].toDate());
          let date1 = detection['date'].toDate();
          let date2 =this.datepipe.transform(date1, 'yyyy-MM-dd');
          console.log(date2);

          let detectionObject = {
            id: detection['id'],
            frameUrl: detection['frameUrl'],
            location: detection['location'],
            helmetNum: detection['helmetNum'],
            personNum: detection['personNum']
          }

          if (!(datetracker.includes(date2))){
            datetracker.push(date2);
            let newObject = {};
            newObject['date'] = date2;
            newObject['fulldate'] = date1;
            newObject['detections'] = [detectionObject]

            this.loadedDetections.push(newObject);
          } else {
            let obj = this.loadedDetections.find((o, i) => {
              if (o.date === date2) {
                  this.loadedDetections[i]['detections'].push(detectionObject);
                  return true; // stop searching
              }
            });
          }
        });

        console.log(this.loadedDetections);

        // sort array by latest date
        this.loadedDetections = this.loadedDetections.sort(function(a,b){
          return b.fulldate - a.fulldate;
        });

        console.log(this.loadedDetections);


        loadingEl.dismiss();
      })

    })
  }

  ngOnDestroy(){
    if(this.detectionSub){
      this.detectionSub.unsubscribe();
    }
  }
}
