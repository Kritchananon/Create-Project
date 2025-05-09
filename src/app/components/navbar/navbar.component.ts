import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// จำเป็นต้อง import Bootstrap JavaScript หากไม่ได้เพิ่มใน angular.json
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // เริ่มต้น dropdown ของ Bootstrap ด้วย JavaScript
    this.initBootstrapDropdowns();
  }

  // ฟังก์ชันสำหรับเริ่มต้น dropdown ของ Bootstrap
  initBootstrapDropdowns(): void {
    // ตรวจสอบว่ามีการโหลด Bootstrap JavaScript หรือไม่
    if (typeof bootstrap !== 'undefined') {
      // ค้นหา dropdown elements ทั้งหมด
      const dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
      
      // สร้าง dropdown instances ให้กับทุก element
      dropdownElementList.forEach((dropdownToggleEl) => {
        new bootstrap.Dropdown(dropdownToggleEl);
      });
    } else {
      console.error('Bootstrap JavaScript ไม่ได้ถูกโหลด กรุณาตรวจสอบว่าได้เพิ่ม Bootstrap JavaScript ในโปรเจคของคุณแล้ว');
    }
  }

  // ฟังก์ชันสำหรับแสดง dropdown ด้วย JavaScript (กรณีที่ต้องการควบคุมเอง)
  toggleDropdown(id: string): void {
    if (typeof bootstrap !== 'undefined') {
      const dropdownEl = document.getElementById(id);
      if (dropdownEl) {
        const dropdown = bootstrap.Dropdown.getInstance(dropdownEl);
        if (dropdown) {
          dropdown.toggle();
        } else {
          new bootstrap.Dropdown(dropdownEl).toggle();
        }
      }
    }
  }
}