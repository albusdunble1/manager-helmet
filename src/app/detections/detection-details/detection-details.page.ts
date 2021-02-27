import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DetectionsService } from '../detections.service';

@Component({
  selector: 'app-detection-details',
  templateUrl: './detection-details.page.html',
  styleUrls: ['./detection-details.page.scss'],
})
export class DetectionDetailsPage implements OnInit {

  detectionId: string;
  loadedDetection;

  constructor(
    private detectionService: DetectionsService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.detectionId = paramMap.get('detectionId');
      console.log(this.detectionId);
      this.detectionService.getDetection(this.detectionId).subscribe(data => {
        this.loadedDetection = data;
        console.log(this.loadedDetection);
      })
    });
  }


  onDelete(id: string){
    this.toastCtrl.create({
      message:'Detection Removed',
      duration: 2000
    }).then(toastEl => {
      this.detectionService.removeDetection(id);
      this.navCtrl.navigateBack('/tabs/detections');
      toastEl.present();
    })
  }

}
