import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductType, DataService } from '../data.service';
import {map, startWith, filter} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SellComponent implements OnInit {
  buscar = new FormControl();
  products: Array<ProductType>;
  filteredOptions: Observable<ProductType[]>;

  constructor(
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.data.open().products;
    this.filteredOptions = this.buscar.valueChanges
      .pipe(
        // startWith(''),
        map((value) => this._filter(value)),
      );
  }

  private _filter(value: string | ProductType): ProductType[] {

    let filterValue: string;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }

    return this.products/*.map(product => product.name)*/.filter((product) =>
      product.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(product: ProductType): string {
    return product && product.name ? product.name : '';
  }

  public addProduct() {
    this.router.navigate(['add-product']);
  }

  public listProducts() {
    this.router.navigate(['list-product']);
  }
}
