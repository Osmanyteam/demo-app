import { Injectable } from '@angular/core';

export interface ProductType {
  name: string;
  price: number;
}

export interface DataType {
  products: ProductType[];
  productsSell: Array<ProductType & { dateTime: Date; units: number }>;
  keySign: string;
  session: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
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
        name: product.name,
        price: product.price
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

}
