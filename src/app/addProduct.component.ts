import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from './productDetail.component';
import { FormsModule } from '@angular/forms'; // Tambahkan ini

@Component({
  selector: 'app-add-data-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductModalComponent, FormsModule],
  template:`
  <div class="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
  <h2 class="text-2xl font-semibold text-center mb-6">Tambah Data Barang</h2>

  <form (ngSubmit)="submitData()" #dataForm="ngForm" class="space-y-4">
    <div>
      <label for="nomor" class="block text-sm font-medium text-gray-700">Nomor</label>
      <input
        type="text"
        id="nomor"
        name="nomor"
        [(ngModel)]="formData.nomor"
        required
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="namaBarang" class="block text-sm font-medium text-gray-700">Nama Barang</label>
      <input
        type="text"
        id="namaBarang"
        name="namaBarang"
        [(ngModel)]="formData.namaBarang"
        required
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="urlGambar" class="block text-sm font-medium text-gray-700">URL Gambar</label>
      <input
        type="text"
        id="urlGambar"
        name="urlGambar"
        [(ngModel)]="formData.urlGambar"
        required
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="urlBeliTikTok" class="block text-sm font-medium text-gray-700">URL TikTok</label>
      <input
        type="text"
        id="urlBeliTikTok"
        name="urlBeliTikTok"
        [(ngModel)]="formData.urlBeliTikTok"
        required
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="urlBeliShopee" class="block text-sm font-medium text-gray-700">URL Shopee</label>
      <input
        type="text"
        id="urlBeliShopee"
        name="urlBeliShopee"
        [(ngModel)]="formData.urlBeliShopee"
        required
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="urlBeliTokopedia" class="block text-sm font-medium text-gray-700">URL Tokopedia</label>
      <input
        type="text"
        id="urlBeliTokopedia"
        name="urlBeliTokopedia"
        [(ngModel)]="formData.urlBeliTokopedia"
        required
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Kirim
    </button>
  </form>

  <p *ngIf="statusMessage" class="mt-4 text-center font-medium text-green-600">{{ statusMessage }}</p>
</div>

  `
})
export class AddDataFormComponent {
  formData = {
    nomor: '',
    namaBarang: '',
    urlGambar: '',
    urlBeliTikTok: '',
    urlBeliShopee: '',
    urlBeliTokopedia: ''
  };

  scriptUrl = 'https://script.google.com/macros/s/AKfycbznSdALdPUlhwUBj4ZJfZ1TY0s6mTGbAfCrMs6nwgiZWMJLY07PaZpKnNaYQOhu5gOKZw/exec'; // Ganti dengan URL Apps Script Anda
  statusMessage = '';

  constructor(private http: HttpClient) {}

  submitData() {
    console.log('Data yang dikirim:', this.formData); // Logging data

  this.http.post(this.scriptUrl, this.formData).subscribe({
    next: (response: any) => {
      console.log('Respons dari API:', response); // Logging respons
      this.statusMessage = response.message;
      this.clearForm();
    },
    error: (error) => {
      console.error('Error:', error); // Logging error
      this.statusMessage = error.message+'Terjadi kesalahan saat mengirim data.';
    }
  });
  }

  clearForm() {
    this.formData = {
      nomor: '',
      namaBarang: '',
      urlGambar: '',
      urlBeliTikTok: '',
      urlBeliShopee: '',
      urlBeliTokopedia: ''
    };
  }
}
