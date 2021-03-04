import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  constructor(
    private fireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    this.loadingCtrl.create({
      message: 'Logging In...'
    }).then(loadingEl => {
      loadingEl.present();
      let res = this.fireAuth.signInWithEmailAndPassword(form.value.email, form.value.password);
      res.then(data => {
        console.log(data);
        loadingEl.dismiss();
        if(data.user.uid === 'VxpBkac1aXhrHVzQcQFJg2rEIwi1'){
          this.navCtrl.navigateForward('/tabs/home');
        }else{
          this.alertCtrl.create({
            header: 'Invalid Login!',
            message: 'Your account does not have the permission to access.',
            buttons: ['Ok']
          }).then(alertEl => {
            alertEl.present();
          });
        }

      }).catch(err => {
        loadingEl.dismiss();
        this.alertCtrl.create({
          header: 'Invalid Login!',
          message: err,
          buttons: ['Ok']
        }).then(alertEl => {
          alertEl.present();
        });
      })
    });
  }

}
