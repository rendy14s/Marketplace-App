import { HomePage } from './../home/home';
import { AjiPostingApi } from './../../shared/sdk/services/custom/AjiPosting';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RatingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  @Input() numStars: number = 5;
	
	@Input() value: number = 0;

  @Output() clicked: EventEmitter<number> = new EventEmitter<number>();

	public stars: string[] = [];

  public idBarang: any;

  public tot: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ajiposting: AjiPostingApi
    ) {
  }

  ionViewDidLoad() {
    this.idBarang = this.navParams.get('idBarang');
    console.log(this.idBarang, 'idBarang');
   
    this.ajiposting.findById(this.idBarang).subscribe((totRate)=>{
      console.log(totRate);
      this.tot = totRate
      console.log(this.tot, 'data tot');
    })

    this.calc();
  }

  public calc(){
  	this.stars = [];
	  let tmp = this.value;
	  for(let i=0; i < this.numStars; i++, tmp--)
		  if(tmp >= 1)
			  this.stars.push("star");
		  else if (tmp < 1 && tmp > 0)
			  this.stars.push("star-half");
		  else
			  this.stars.push("star-outline");
  }

  public starClicked(index){
    console.log('Klik');
    
		  this.value = index + 1;
		  this.calc();
		  this.clicked.emit(this.value);

      console.log(this.value, 'Rating');
      
  }

  public rate(){
    let sum: any;
    let rate: any;
    rate = this.value;
    console.log(rate, 'rate');
    console.log(this.tot.reputasi, 'reputasi');
    sum = parseInt(this.tot.reputasi) + parseInt(rate)
    console.log(sum, 'hasil sum');

    this.ajiposting.updateAll(
      { idBarang: this.idBarang },
      { reputasi: sum }
      ).subscribe((rate)=>{
        console.log('sukses rate');
        this.navCtrl.setRoot(HomePage);
      })
  }

}
