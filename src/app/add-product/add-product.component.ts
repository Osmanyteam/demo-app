import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService, ProductType } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public addProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  });

  private prod: ProductType;
  public isEdit = false;

  constructor(
    private data: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    if ('price' in history.state) {
      try {
        this.prod = history.state;
        this.addProduct.patchValue({
          name: this.prod.name,
          price: this.prod.price
        });
        this.isEdit = true;
      } catch (e)  {
        console.error(e);
      }
    }
  }

  public submit() {
    if (this.isEdit === false) {
      this.data.addProduct({
        name: this.addProduct.value.name,
        price: this.addProduct.value.price
      });
      this.router.navigate(['sell']);
    } else {
      this.data.updateProduct(this.prod, {
        name: this.addProduct.value.name,
        price: this.addProduct.value.price
      });
      this.router.navigate(['list-product']);
    }
  }

  togoHome() {
    this.router.navigate(['sell']);
  }

}
