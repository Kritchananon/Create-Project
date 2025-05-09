import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: ``
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + err.message;
        this.loading = false;
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => {
          this.error = 'เกิดข้อผิดพลาดในการลบข้อมูล: ' + err.message;
        }
      });
    }
  }
}