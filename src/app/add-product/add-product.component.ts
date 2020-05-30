import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
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

  constructor(
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public submit() {
    this.data.addProduct({
      name: this.addProduct.value.name,
      price: this.addProduct.value.price
    });
    this.router.navigate(['sell']);
  }

  togoHome() {
    this.router.navigate(['sell']);
  }

}
