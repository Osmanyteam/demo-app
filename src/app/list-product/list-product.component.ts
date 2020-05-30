import { Component, OnInit, Inject } from '@angular/core';
import { DataService, ProductType } from '../data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  public products: ProductType[] = [];

  constructor(
    private data: DataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.products = this.data.open().products;
  }

  openDialogDelete(product: ProductType) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.componentInstance.data = {
      product
    };
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.data.removeProduct(product);
        this.products = this.data.open().products;
      }
    });
  }

  public editProduct(product: ProductType) {
    this.router.navigate(['add-product'], { state: product });
  }

  togoHome() {
    this.router.navigate(['sell']);
  }

}

export interface DialogData {
  product: ProductType;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete/dialog-delete.html',
})
export class DialogDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
