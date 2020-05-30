import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface ProductType {
  name: string;
  price: number;
}

export type ProductSell = Array<{client: string; dateTime: Date; products: Array<ProductType & { units: number }> }>;

export interface DataType {
  products: ProductType[];
  productsSell: ProductSell;
  keySign: string;
  session: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private router: Router
  ) {
  }

  public open(): DataType {
    const data = localStorage.getItem('data');
    if (data) {
      return JSON.parse(data);
    }
    return {
      products: [],
      productsSell: [],
      keySign: '',
      session: false
    };
  }

  private setData(data: DataType) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  public addProduct(product: ProductType) {
    const data = this.open();
    data.products.push(product);
    this.setData(data);
  }

  public asingKey(key: string) {
    const data = this.open();
    data.keySign = key;
    data.session = true;
    this.setData(data);
  }

  public validateKey(key) {
    const data = this.open();
    if (data.keySign === '') {
      return false;
    }
    if (data.keySign === key) {
      data.session = true;
      this.setData(data);
    }
  }

  public updateProduct(product: ProductType, newProduct: ProductType) {
    const products = this.open().products;
    const index = products.findIndex(p => {
      return p.name === product.name && p.price === product.price;
    });
    if (index !== -1) {
      products[index] = {
        name: newProduct.name,
        price: newProduct.price
      };
      const data = this.open();
      data.products = products;
      this.setData(data);
    }

  }

  public removeProduct(product: ProductType ) {
    let products = this.open().products;
    const index = products.findIndex(p => {
      return p.name === product.name && p.price === product.price;
    });
    if (index !== -1) {
      if (products.length === 1) {
        products = [];
      } else {
        products.splice(index, 1);
      }
      const data = this.open();
      data.products = products;
      this.setData(data);
    }

  }

  public addBuy(products: Array<ProductType & { units: number }>, client: string) {
    const data = this.open();
    data.productsSell.push({
      products,
      client,
      dateTime: new Date()
    });
    this.setData(data);
  }

  public checkKey(key: string): boolean {
    const res =  this.open().keySign === key;
    if (res === true) {
      const data = this.open();
      data.session = true;
      this.setData(data);
    }
    return res;
  }

  public exit() {
    const data = this.open();
    data.session = false;
    this.setData(data);
    this.router.navigate(['']);
  }

}
