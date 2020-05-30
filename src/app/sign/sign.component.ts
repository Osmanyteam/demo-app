import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  form = new FormGroup({
    key: new FormControl('', [Validators.required]),
  });

  registerKey = true;

  constructor(
    private data: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerKey = this.data.open().keySign === '';
    if (this.registerKey === false && this.data.open().session === true) {
      this.router.navigate(['sell']);
    }
  }

  setKey() {
    if (this.registerKey === true) {
    this.data.asingKey(this.form.value.key);
    this.router.navigate(['sell']);
    } else {
      if (this.data.checkKey(this.form.value.key) === true) {
        this.router.navigate(['sell']);
      } else {
        this.snackBar.open('Clave incorrecta', '', {
          duration: 3500
        });
      }
    }
  }


}
