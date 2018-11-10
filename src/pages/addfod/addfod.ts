import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery'
import { AngularFireDatabase } from '@angular/fire/database';
import { OneSignal } from '@ionic-native/onesignal';
import { CameraOptions, Camera } from '@ionic-native/camera';
import * as firebase from 'firebase/app';

/**
 * Generated class for the AddfodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfod',
  templateUrl: 'addfod.html',
})
export class AddfodPage {


  imageurl = "";
  imagecheck= false;

  mySelectedPhoto;
  loading;
  currentPhoto ;
  imgSource;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase, public toast : ToastController,
    public oneSignal: OneSignal, private camera:Camera,public load : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfodPage');
    var navh = $(".header").innerHeight();
    console.log(navh);
  }


    
  ngOnInit(){
 
    }


    addfod(name,price,des){

      var d = new Date();

      const monthNames = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      

      if(name.length > 0 && price.length > 0 && des.length > 0 && this.imageurl.length > 0){

        this.db.list("fods").push({
          name:name,
          price:price,
          des:des,
          image:this.imageurl,
          date: d.getFullYear() + "/" + d.getDate() + "/" + monthNames[d.getMonth()],
        }).then( done => {
          var toast = this.toast.create({
            message:"تم نشر الاكلة",
            duration:3000,
            cssClass:"setdire"
          }).present();
          this.navCtrl.popToRoot();



          this.db.list("ids").valueChanges().subscribe( ids => {

            ids.forEach(id => {
        
        
              this.oneSignal.postNotification({
                app_id:"e2de86a3-f6de-41d7-b722-31bb510f92dd",
                include_player_ids:[id['id']],
                contents: {
                  en: des
                },
                headings: {
                  en: "اكلة جديدة"
                }
              })
      
             
            })
        
          })



          
        })

      }

    }







    takePhoto(){
      const options: CameraOptions = {
        targetHeight:720 ,
        targetWidth:720,
        quality:100, 
        destinationType : this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
      }

      
      this.camera.getPicture(options).then((imageData) =>{
        this.loading = this.load.create({
          content: "جاري اضافة الصورة ",
          cssClass:"setdire"
           });
    this.loading.present();
      this.mySelectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+imageData);
          this.upload();
              
              },(err)=>{
          alert(JSON.stringify(err));
              });
      
      
      }
      
          
          
      dataURLtoBlob(myURL){
          let binary = atob(myURL.split(',')[1]);
      let array = [];
      for (let i = 0 ; i < binary.length;i++){
          array.push(binary.charCodeAt(i));
      }
          return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
      }    
          
          
      upload(){

        
      var char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];
      var rand1 = Math.floor(Math.random() * char.length);
      var rand2 = Math.floor(Math.random() * char.length);
      var rand3 = Math.floor(Math.random() * char.length);
      var rand4 = Math.floor(Math.random() * char.length);
      var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

      if(this.mySelectedPhoto){
          var uploadTask = firebase.storage().ref().child('images/'+rand+".jpg");
          var put = uploadTask.put(this.mySelectedPhoto);
          put.then( ()=> {
            this.loading.dismiss();

            uploadTask.getDownloadURL().then(url =>{
              
              this.imagecheck = true;
              this.imageurl = url;
    
            });

          });

          put.catch(err =>{
            this.loading.dismiss();

            alert(JSON.stringify(err));
          })
    

      }
      }    

}
