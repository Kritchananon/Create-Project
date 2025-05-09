import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // You can add component logic here
  toggleUserMenu() {
    // For demo purposes. In a real component, you would implement toggle logic
    const menu = document.querySelector('.dropdown-menu');
    menu?.classList.toggle('show');
    
    const button = document.querySelector('.menu-toggle');
    if (menu?.classList.contains('show')) {
      button?.setAttribute('style', 'transform: rotate(180deg)');
    } else {
      button?.setAttribute('style', 'transform: rotate(0)');
    }
  }
  
  // You can add dark mode toggle method here
  toggleDarkMode() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('dark-mode');
  }
}