import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class Sign implements CanActivate {

    constructor(private data: DataService) { }

    canActivate() {
      return this.data.open().keySign !== '' && this.data.open().session === true;
    }
}
