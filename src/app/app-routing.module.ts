import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { ListProductComponent } from './list-product/list-product.component';
import { Sign } from './sign';
import { SellComponent } from './sell/sell.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  {
    path: '',
    component: SignComponent
  },
  {
    path: 'list-product',
    component: ListProductComponent,
    canActivate: [Sign]
  },
  {
    path: 'sell',
    component: SellComponent,
    canActivate: [Sign]
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [Sign]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
