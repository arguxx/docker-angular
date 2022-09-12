import { Component, OnInit } from '@angular/core';
import { MahasiswaService } from '../../service/mahasiswa.service';
import { Mahasiswa } from '../../model/mahasiswa';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mahasiswa-list',
  templateUrl: './mahasiswa-list.component.html',
  styleUrls: ['./mahasiswa-list.component.css'],
})
export class MahasiswaListComponent implements OnInit {
  list: Mahasiswa[] = [];
  formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _mahasiswaService: MahasiswaService
  ) {
    this.formGroup = this._formBuilder.group({
      id: this._formBuilder.control(''),
      nim: this._formBuilder.control(''),
      nama: this._formBuilder.control(''),
      semester: this._formBuilder.control(''),
    });
  }

  reloadData() {
    this._mahasiswaService.getList().subscribe(
      (resp) => {
        console.log('HTTP Response ==> mahasiswa list', resp);
        this.list = resp;
      },
      (error) => {
        console.error('HTTP Response error ==> mahasiswa list', error.message);
      }
    );
  }

  ngOnInit(): void {
    this.reloadData();
  }

  submit() {
    const value: Mahasiswa = this.formGroup.value;
    console.info('Submit value ==> ', value);
    this._mahasiswaService.save(value).subscribe(
      (resp) => {
        console.log('HTTP Response mahasiswa save ==> ', resp.body);
        this.reloadData();
      },
      (error) => {
        console.log('HTTP Response mahasiswa save error ==> ', error.message);
      }
    );
  }
}
