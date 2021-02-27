import { DetectionsService } from './../detections/detections.service';
import { StrikesService } from './../strikes/strikes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appeals',
  templateUrl: './appeals.page.html',
  styleUrls: ['./appeals.page.scss'],
})
export class AppealsPage implements OnInit {
  loadedWorkers;
  loadedDetections;

  constructor(
    private strikeService: StrikesService,
    private detectionService: DetectionsService
    ) { }

  ngOnInit() {
    this.strikeService.getWorkers().subscribe(workers => {
      this.loadedWorkers = workers;
      console.log(workers);
    });

    this.detectionService.getDetections().subscribe(detections => {
      this.loadedDetections = detections;
    });
  }


  onQueryUpdate(){
    this.strikeService.queryUpdate('wTRXGatSN1Q0qCy2zcsh');
  }

}
