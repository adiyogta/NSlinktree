import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';

interface Product {
    nomor: string;
    namaBarang: string;
    urlGambar: string;
    urlBeliTikTok: string;
    urlBeliShopee: string;
    urlBeliTokopedia: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  animations: [
    trigger('viewChange', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
   <div class="max-w-md mx-auto bg-gradient-to-r from-[#F3F8F2] to-[#FFF7EC] min-h-screen pb-4 px-4 flex flex-col">
      <!-- Header Profile -->
      <div class="sticky top-0 z-10 bg-gradient-to-r from-[#F3F8F2] to-[#FFF7EC]" (scroll)="onScroll($event)">
    <!-- Header Profile -->
    <div class="bg-gradient-to-r from-[#CDD5AE] to-[#9C9D7D] drop-shadow-lg rounded-b-xl py-6 px-4 mb-4">
      <div class="flex justify-center gap-12 items-center">
        <div class="w-24 h-24 rounded-full overflow-hidden drop-shadow-md">
          <img src="https://res.cloudinary.com/dvqq3izfb/image/upload/v1731858818/ns_lepedk.png" alt="Profile Picture" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col gap-2 items-center">
          <span class="text-[#fffaea] text-xl font-medium drop-shadow-md">&#64;nesiseptiani</span>
          <div class="flex gap-2">
            <a href="https://www.instagram.com/nesisept/" target="_blank">
              <svg class="w-8 h-8 drop-shadow-md" fill="#fffaea" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@nesiseptiani" target="_blank">
              <svg class="w-8 h-8 drop-shadow-md" fill="#fffaea" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Title Section -->
    <div class="flex justify-between items-center mb-2 px-4">
      <h1 class="text-xl font-bold text-[#4a524a]">Daftar Barang Rekomendasi</h1>
      <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors" (click)="toggleView()">
          @if (isListView) {
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zM14 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z"/>
            </svg>
          } @else {
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16m-16 6h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          }
        </button>
    </div>
  </div>

  <div class="overflow-y-auto flex-grow">
      <!-- Product List View -->
      @if (isListView) {
        <div class="space-y-4" >
          @for (product of products; track product.nomor) {
            <div class="flex items-center gap-2 bg-[#FBF4D7] rounded-lg p-2 drop-shadow-lg">
              <div class="w-12 h-12 flex items-center justify-center bg-[#9C9D7D] rounded-lg text-white font-bold drop-shadow-md">
                {{ product.nomor }}
              </div>
              <div class="flex-1 flex-col">
                <div class="bg-[#fffaea] rounded-lg p-3 drop-shadow-md">
                  <h2 class="justify-self-start text-wrap">{{ product.namaBarang }}</h2>
                </div>
                <div class="p-1"></div>
                <div class="grid grid-cols-3 gap-1">
                  <a [href]="product.urlBeliTikTok" target="_blank" 
                    class="bg-black text-white py-2 px-3 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    TikTok
                  </a>
                  <a [href]="product.urlBeliShopee" target="_blank" 
                    class="bg-[#EE4D2D] text-white py-2 px-3 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity">
                    Shopee
                  </a>
                  <a [href]="product.urlBeliTokopedia" target="_blank" 
                    class="bg-[#03AC0E] text-white py-2 px-1 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity">
                    Tokopedia
                  </a>
                </div>
              </div>
              <div class="w-24 h-28 bg-gray-200 rounded-lg drop-shadow-md">
                <img [src]="product.urlGambar" [alt]="product.namaBarang"
                  class="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                  onerror="this.src='https://via.placeholder.com/96'">
              </div>
            </div>
          }
        </div>
      } 
      
      <!-- Product Bento Grid View -->
      <!-- Product Bento Grid View -->
@else {
  <div class="grid grid-cols-2 gap-2" >
    @for (product of products; track product.nomor) {
      <div class="bg-[#FBF4D7] rounded-lg p-2 drop-shadow-lg flex flex-col">
        <div class="relative w-full h-40 mb-2">
          <div class="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-[#9C9D7D] rounded-lg text-white font-bold drop-shadow-md z-10">
            {{ product.nomor }}
          </div>
          <img [src]="product.urlGambar" [alt]="product.namaBarang"
            class="w-full h-full object-cover rounded-lg"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/96'">
        </div>
        <div class="bg-[#fffaea] rounded-lg p-2 mb-2 drop-shadow-md flex-grow">
          <h2 class="text-sm text-wrap line-clamp-2">{{ product.namaBarang }}</h2>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <a [href]="product.urlBeliTikTok" target="_blank" 
            class="bg-black text-white py-2 px-3 rounded-lg text-xs font-medium text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            TikTok
          </a>
          <a [href]="product.urlBeliShopee" target="_blank" 
            class="bg-[#EE4D2D] text-white py-2 px-3 rounded-lg text-xs font-medium text-center hover:opacity-90 transition-opacity">
            Shopee
          </a>
          <a [href]="product.urlBeliTokopedia" target="_blank" 
            class="bg-[#03AC0E] text-white py-2 px-3 rounded-lg text-xs font-medium text-center hover:opacity-90 transition-opacity">
            Tokopedia
          </a>
        </div>
      </div>
    }
  </div>
}
</div>
    </div>
  `,
  styles:`
  @media (min-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
`
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isListView = true;
  isScrolled = false;
  constructor(private http: HttpClient) {}
  onScroll(event: Event): void {
    
    this.isScrolled = true; // Adjust threshold as needed
  }
  ngOnInit(): void {
    const apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=UzCbX8fc9JcPWbsTETz1lxgmef--CVehbSZhwNc3KQ5l9-aG8lvoQ3Sn3ZJHLhwKuTpngOfZW8g8wPbyQHVhKBfrBpJrt7a-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJktRd9gU8Afv6P8N-wKfGIccLDcmlOvBWDsq2VE5Ycgb7KT5oOZSbPrx2KNmcJsTAP4TkwPPibTtfKkq_Y6tW-xXeqnIF-jqtz9Jw9Md8uu&lib=MVXYB5346CT_WvuckoVNZlRgaKOwQqP8j';
  
    this.http.get<Product[]>(apiUrl).subscribe({
      next: (data) => {
        if(data.length != 0) {
          console.log('Products fetched:', data);
          this.products = data;
        } else {
          this.products = this.getFallbackProducts();
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products = this.getFallbackProducts();
      }
    });
  }

  toggleView(): void {
    this.isListView = !this.isListView;
  }
  
  trackByNomor(index: number, product: Product): string {
    return product.nomor;
  }

  private getFallbackProducts(): Product[] {
    return [
      {
        nomor: '1',
        namaBarang: 'Produk 1',
        urlGambar: 'https://via.placeholder.com/96',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '2',
        namaBarang: 'Produk 2',
        urlGambar: 'https://via.placeholder.com/96',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '3',
        namaBarang: 'Produk 3',
        urlGambar: 'https://via.placeholder.com/96',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '4',
        namaBarang: 'Produk 4',
        urlGambar: 'https://via.placeholder.com/96',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
      {
        nomor: '5',
        namaBarang: 'Produk 5',
        urlGambar: 'https://via.placeholder.com/96',
        urlBeliTikTok: '',
        urlBeliShopee: '',
        urlBeliTokopedia: ''
      },
    ];
  }
}