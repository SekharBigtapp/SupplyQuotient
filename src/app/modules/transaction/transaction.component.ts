import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  // priceMarkdown(){
  //   //alert('hi');
  //   this.router.navigate(['transaction/pricemarkdown']);
  // }
  // phaseOutItems(){
  //   //alert('hi');
  //   this.router.navigate(['transaction/phaseoutitem']);
  // }
  // newLaunchItem(){
  //   //alert('hi');
  //   this.router.navigate(['transaction/newLauchItem']);
  // }
  // storeStoreTransfer(){
  //   //alert('hi');
  //   this.router.navigate(['transaction/store2storetransfer']);
  // }
  // backButtonClick(){
  //   this.router.navigate(['transaction']);
  // }
  // vendorManagedInventory(){
  //   this.router.navigate(['transaction/vendormanagedinventory'])
  // }
  // stockRegister(){
  //   this.router.navigate(['transaction/stockRegister'])
  // }
  // posSale(){
  //   this.router.navigate(['transaction/posSale'])
  // }
  // promotionDetails(){
  //   this.router.navigate(['transaction/promotionDetails'])
  // }
  // PhysicalStock(){
  //   this.router.navigate(['transaction/physicalStock'])
  // }
}
