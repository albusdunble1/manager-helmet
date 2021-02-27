import { StrikesService } from './../../../strikes/strikes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DetectionsService } from '../../detections.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-strike-form',
  templateUrl: './strike-form.page.html',
  styleUrls: ['./strike-form.page.scss'],
})
export class StrikeFormPage implements OnInit {

  detectionId: string;
  loadedDetection;
  loadedWorkers;
  culprits;

  constructor(
    private detectionService: DetectionsService,
    private strikesService: StrikesService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.detectionId = paramMap.get('detectionId');

      this.detectionService.getDetection(this.detectionId).subscribe(data => {
        this.loadedDetection = data;
      })

      this.strikesService.getWorkers().subscribe(data => {
        this.loadedWorkers = data;
      })

    });
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    let workersArr = form.value.culprits;

    this.loadingCtrl.create({
      message: 'Creating strike...'
    }).then(loadingEl => {
      loadingEl.present();


      // BEFORE DENORMALIZATION

      // workersArr.forEach(id => {
      //   let strikeInfo = {
      //     detectionId: this.detectionId,
      //     description: form.value.description,
      //     workerId: id,
      //     status: 'active',
      //     date: new Date()
      //   }
      //   this.strikesService.createStrike(strikeInfo).then(data => {
      //     console.log(data);
      //   })
      // });

      // AFTER DENORMALIZATION
      workersArr.forEach(worker => {
        let strikeInfo = {
          description: form.value.description,
          worker: worker,
          status: 'active',
          date: new Date(),
          detection: this.loadedDetection
        }
        this.strikesService.createStrike(strikeInfo).then(data => {
          console.log(data);
        })
      });

      loadingEl.dismiss();
      this.router.navigateByUrl('/tabs/detections');
    })

  }

}
