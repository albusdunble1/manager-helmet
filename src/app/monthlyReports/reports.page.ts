import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ReportsService } from './reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  reportsSub: Subscription;
  loadedReports;
  monthlydata;
  isLoading = true;

  constructor(
    private reportsService: ReportsService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Loading Reports...'
    }).then(loadingEl => {
      loadingEl.present();
      this.isLoading = true;

      this.reportsService.getMonthlyData().then(value => {
        console.log(value);
        this.monthlydata = value;

      });

      this.reportsSub = this.reportsService.getReports().subscribe(reports => {
        this.loadedReports = reports;

        this.isLoading = false;
        loadingEl.dismiss();

        // sort array by latest date
        this.loadedReports = this.loadedReports.sort(function(a,b){
          return b.date - a.date;
        });

      });

    });
  }

  createReport(){
    let reportInfo = {
      details: this.monthlydata,
      date: new Date()
    }
    this.reportsService.createReport(reportInfo).then(data => {
      console.log(data);
    })
  }

  ngOnDestroy(){
    if(this.reportsSub){
      this.reportsSub.unsubscribe();
    }
  }

}
