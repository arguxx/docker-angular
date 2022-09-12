import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Mahasiswa } from '../model/mahasiswa';

@Injectable({
  providedIn: 'root',
})
export class MahasiswaService {
  constructor(private httpClient: HttpClient) {}

  public getList() {
    return this.httpClient.get<Mahasiswa[]>(
      'http://localhost:8080/api/mahasiswa/list',
      { responseType: 'json' }
    );
  }

  public save(value: Mahasiswa) {
    return this.httpClient.post<HttpResponse<Mahasiswa>>(
      'http://localhost:8080/api/mahasiswa/save',
      value,
      { responseType: 'json' }
    );
  }
}
