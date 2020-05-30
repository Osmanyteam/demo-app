import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductType, DataService } from '../data.service';
import {map, startWith, filter} from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../list-product/list-product.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  sellToProducts: Array<ProductType & { units: number }> = [];

  constructor(
    private data: DataService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  openDialog(product: ProductType): void {
    const dialogRef = this.dialog.open(DialogUnitsComponent, {
      width: '250px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result && !isNaN(result)) {
        this.sellToProducts.push({...product, units: Number(result)});
      }
    });
    this.buscar.patchValue('');
  }

  public addProduct() {
    this.router.navigate(['add-product']);
  }

  public listProducts() {
    this.router.navigate(['list-product']);
  }

  public buy() {
    let total = 0;
    for (const prod of this.sellToProducts) {
      total += prod.price * prod.units;
    }
    const dialogRef = this.dialog.open(DialogBuyComponent, {
      data: {
        total: total.toFixed(2)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result && result !== '') {
        this.data.addBuy(this.sellToProducts, result);
        this.sellToProducts = [];
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    const refSnack = this.snackBar.openFromComponent(SnackBarBuySuccessComponent, {
      duration: 3500,
    });
    refSnack.afterDismissed().subscribe(this.openReports.bind(this));
  }

  openReports() {
    this.router.navigate(['report-sells']);
  }

  removeProductSells(product: ProductType & {units: number}) {
    const index = this.sellToProducts.findIndex(p => {
      return p.name === product.name &&
        p.price === product.price &&
        p.units === product.units;
    });
    if (index !== -1) {
      if (this.sellToProducts.length === 1) {
        this.sellToProducts = [];
      } else {
        this.sellToProducts.splice(index, 1);
      }
    }
  }

  public exitApp() {
    this.data.exit();
  }

}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-units',
  templateUrl: 'dialog/dialog-units.html',
})
export class DialogUnitsComponent {

  units: string;

  constructor(
    public dialogRef: MatDialogRef<SellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData & {name: string } ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-buy',
  templateUrl: 'dialog/dialog-buy.html',
})
export class DialogBuyComponent {

  client: string;

  constructor(
    public dialogRef: MatDialogRef<SellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData & {total: number; }) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'snack-bar-buy-success',
  templateUrl: 'snack/snack-buy-success.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
      text-align: center;
    }
  `],
})
export class SnackBarBuySuccessComponent {

}
