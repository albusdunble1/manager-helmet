import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from './../reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  reportId: string;
  reportSub;
  loadedReport;
  isLoading = true;

  constructor(
    private reportsService: ReportsService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Loading Report...'
    }).then(loadingEl => {
      loadingEl.present();
      this.isLoading = true;

      this.route.paramMap.subscribe(paramMap => {
        this.reportId = paramMap.get('reportId');
        console.log(this.reportId);
        this.reportSub = this.reportsService.getReport(this.reportId).subscribe(data => {
          this.loadedReport = data;
          console.log(this.loadedReport);

          this.isLoading = false;
          loadingEl.dismiss();
        })

        console.log('hi');
      });
    });


  }


  ngOnDestroy(){
    if(this.reportSub){
      this.reportSub.unsubscribe();
    }
  }

}
