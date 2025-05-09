import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';
  productId?: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // ตรวจสอบว่าเป็นการแก้ไขหรือเพิ่มใหม่
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          stock: product.stock
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า: ' + err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    
    const product: Product = this.productForm.value;
    this.submitting = true;
    
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, product).subscribe({
        next: () => {
          this.navigateToList();
        },
        error: (err) => {
          this.error = 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ' + err.message;
          this.submitting = false;
        }
      });
    } else {
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.navigateToList();
        },
        error: (err) => {
          this.error = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + err.message;
          this.submitting = false;
        }
      });
    }
  }

  navigateToList(): void {
    this.router.navigate(['/products']);
  }
}