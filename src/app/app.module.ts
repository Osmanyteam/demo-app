import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SignComponent,  } from './sign/sign.component';
import { ListProductComponent, DialogDeleteComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SellComponent, DialogUnitsComponent, SnackBarBuySuccessComponent, DialogBuyComponent } from './sell/sell.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DataService } from './data.service';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sign } from './sign';
import { ReportSellsComponent } from './report-sells/report-sells.component';


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    ListProductComponent,
    AddProductComponent,
    SellComponent,
    DialogDeleteComponent,
    DialogUnitsComponent,
    SnackBarBuySuccessComponent,
    ReportSellsComponent,
    DialogBuyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DialogDeleteComponent,
    DialogUnitsComponent,
    SnackBarBuySuccessComponent,
    DialogBuyComponent,
  ],
  providers: [
    DataService,
    Sign
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
