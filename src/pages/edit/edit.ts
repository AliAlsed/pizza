import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  key
  imageh
  nameh
  desh
  priceh
  imagecheck =true;

  
  mySelectedPhoto;
  loading;
  currentPhoto ;
  imgSource;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase,public load : LoadingController, private camera:Camera,
    public alert : AlertController,public toast : ToastController) {

    this.key = navParams.get("key");
    this.imageh = navParams.get("image");
    this.nameh = navParams.get("name");
    this.desh = navParams.get("des");
    this.priceh = navParams.get("price");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  editphoed(key,name,price,des){

   this.alert.create({
     subTitle:"هل تريد تعديل الاكلة؟",
     cssClass:"setdire",
     buttons:[{text:"تعديل",handler: ()=> {
      this.db.list("fods").update(key,{
        name:name,
        price:price,
        des:des,
        image:this.imageh
        });
      this.toast.create({
        message:"تم تعديل الاكلة",
        duration:3000,
        cssClass:"setdire"
      }).present();
      this.navCtrl.pop();
     }},"الغاء"]
   }).present();

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
            
            this.imageh = url;
  
          });

        });

        put.catch(err =>{
          this.loading.dismiss();

          alert(JSON.stringify(err));
        })
  

    }
    }    

}
