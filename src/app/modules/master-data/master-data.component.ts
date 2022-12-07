import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    alert('hi');
  }
  productMasterClick() {
    alert('hi');
    this.router.navigate(['masters/productMaster']);
  }
  storeMasterClick() {
    this.router.navigate(['masters/storeMaster']);
  }

  distributionMasterClick() {
    this.router.navigate(['masters/distributionMaster']);
  }
  supplierMasterClick() {
    this.router.navigate(['masters/supplierMaster']);
  }
  storeSupplierMasterClick() {
    this.router.navigate(['masters/storeSupplyMaster']);
  }
}
