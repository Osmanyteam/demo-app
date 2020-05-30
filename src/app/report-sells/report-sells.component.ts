import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, ProductSell } from '../data.service';

@Component({
  selector: 'app-report-sells',
  templateUrl: './report-sells.component.html',
  styleUrls: ['./report-sells.component.scss']
})
export class ReportSellsComponent implements OnInit {

  public products: ProductSell;

  constructor(
    private router: Router,
    private data: DataService
  ) {

   }

  ngOnInit() {
    this.products = this.data.open().productsSell;
    this.products.reverse();
  }

  togoHome() {
    this.router.navigate(['sell']);
  }
}
