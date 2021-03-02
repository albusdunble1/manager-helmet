import { AppealsService } from './../appeals/appeals.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DetectionsService } from '../detections/detections.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  canvas;
  ctx;
  loadedDetections;
  loadedAppeals;
  detectionsToday;
  appealsToday;


  isLoading = false;

  detectionSub: Subscription;
  appealSub: Subscription;
  @ViewChild("detectionChart" , {static: true}) detectionChart;
  @ViewChild("appealChart" , {static: true}) appealChart;
  detectionBar;


  constructor(
    private detectionService: DetectionsService,
    private appealService: AppealsService,
    private loadingCtrl: LoadingController
  ) {}


  ngOnInit(){



    this.loadingCtrl.create({
      message: 'Loading...'
    }).then(loadingEl => {
      loadingEl.present();
      this.isLoading = true;

      this.detectionSub = this.detectionService.getDetections().subscribe(detections => {

        // =========================Detection Stats=======================
        // sort detections by earliest
        let sortedDetections = detections.sort(function(a,b){
          return a['date'] - b['date'];
        });

        let detectionDateTracker = [];
        let detectionDateCounter = [];

        // generate data for detections chart
        sortedDetections.forEach(detection => {
          let temp = detection['date'].toDate().toISOString().split('T')[0];
          let detectionIndex = detectionDateTracker.indexOf(temp);
          if(detectionIndex < 0){
            detectionDateTracker.push(temp);

            detectionDateCounter.push(1);
            console.log(temp);
            console.log('notfound');
          } else {
            detectionDateCounter[detectionIndex] += 1;
            console.log('found, adding');

          }
          console.log('datetracker', detectionDateTracker);
          console.log('datecounter', detectionDateCounter);
        });



        this.loadedDetections = detections.filter(detection => {
          let today = new Date().getTime();
          let detectionDate = detection['date'].toDate().getTime();
          let diff = Math.floor((today - detectionDate) / 1000 / 60 / 60 / 24);
          console.log(detection.id, diff);
          return diff < 1;
        });

        this.detectionsToday = this.loadedDetections.length;
        console.log('Detections');
        console.log(this.detectionsToday, this.loadedDetections);

        // =========================Appeal Stats=======================

        this.appealSub = this.appealService.getAppeals().subscribe(appeals => {

          // sort appeals by earliest
          let sortedAppeals = appeals.sort(function(a,b){
            return a['date'] - b['date'];
          });

          let appealDateTracker = [];
          let appealDateCounter = [];

          // generate data for appeals chart
          sortedAppeals.forEach(appeal => {
            let temp = appeal['date'].toDate().toISOString().split('T')[0];
            let appealIndex = appealDateTracker.indexOf(temp);
            if(appealIndex < 0){
              appealDateTracker.push(temp);

              appealDateCounter.push(1);
              console.log(temp);
              console.log('notfound');
            } else {
              appealDateCounter[appealIndex] += 1;
              console.log('found, adding');

            }

            console.log('datetracker', appealDateTracker);
            console.log('datecounter', appealDateCounter);
          });




          this.loadedAppeals = appeals.filter(appeal => {
            let today = new Date().getTime();
            let appealDate = appeal['date'].toDate().getTime();
            let diff = Math.floor((today - appealDate) / 1000 / 60 / 60 / 24);
            console.log(appeal.id, diff);
            return diff < 1;
          });

          this.appealsToday = this.loadedAppeals.length;
          console.log('Appeals');
          console.log(this.appealsToday, this.loadedAppeals);

          let ddtClone = [...detectionDateTracker];
          let ddcClone = [...detectionDateCounter];
          let adtClone = [...appealDateTracker];
          let adcClone = [...appealDateCounter];


          // pass the last 4 values of the arrays into the charts
          this.createDetectionChart(ddtClone.slice(Math.max(ddtClone.length - 4, 0)), ddcClone.slice(Math.max(ddcClone.length - 4, 0)));
          this.createAppealChart(adtClone.slice(Math.max(adtClone.length - 4, 0)), adcClone.slice(Math.max(adcClone.length - 4, 0)));
          console.log('lol');

          this.isLoading = false;
          loadingEl.dismiss();
        })
      })
    })
  }

  ionViewWillEnter(){

  }

  createAppealChart(xlabels, ylabels){
    var myChart = new Chart(this.appealChart.nativeElement, {
      type: 'line',
      data: {
          labels: xlabels,
          datasets: [{
              label: 'No. of Appeals',
              fill: false,
              data: ylabels,
              borderColor: 'green',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
          //   xAxes: [{
          //     ticks: {
          //         autoSkip: false,
          //         maxRotation: 90,
          //         minRotation: 90
          //     }
          // }],
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      callback: (value: number) => {if (value % 1 === 0) {return value;}}
                  }
              }]
          }
      }
    });
  }

  createDetectionChart(xlabels, ylabels){
    var myChart = new Chart(this.detectionChart.nativeElement, {
      type: 'line',
      data: {
          labels: xlabels,
          datasets: [{
              label: 'No. of Detections',
              fill: false,
              data: ylabels,
              borderColor: 'red',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
          //   xAxes: [{
          //     ticks: {
          //         autoSkip: false,
          //         maxRotation: 90,
          //         minRotation: 90
          //     }
          // }],
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      callback: (value: number) => {if (value % 1 === 0) {return value;}}
                  }
              }]
          }
      }
    });
  }

  // createDetectionChart2(){
  //   this.detectionBar = new Chart(this.detectionChart.nativeElement, {
  //       type: 'bar',
  //       data: {
  //           labels: [2017, 2018, 2019, 2020],
  //           datasets: [{
  //               label: 'Type 1',
  //               data: [12, 19, 3, 5],
  //               backgroundColor: '#E1BA24',
  //               barPercentage: 0.8,
  //               barThickness:'flex',
  //               stack: 'Base',
  //               borderWidth: 1
  //           },{
  //             label: 'Type 2',
  //             data: [20, 38, 20, 30],
  //             backgroundColor: '#2A93CE',
  //             barPercentage: 0.8,
  //             barThickness:'flex',
  //             stack: 'Sensitivity',
  //             borderWidth: 1
  //           }
  //         ]
  //       },
  //       options: {
  //           scales: {
  //               yAxes: [{
  //                   ticks: {
  //                       beginAtZero: true
  //                   }
  //               }]
  //           }
  //       }
  //   });
  // }

  ngOnDestroy(){
    if(this.detectionSub){
      this.detectionSub.unsubscribe();
    }

    if(this.appealSub){
      this.appealSub.unsubscribe();
    }
  }
}
