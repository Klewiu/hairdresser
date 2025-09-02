import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
   imports: [CommonModule],
})
export class Navbar {
  isMenuOpen = false;

scrollTo(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  this.isMenuOpen = false;
}

get isMobile(): boolean {
  return window.innerWidth < 768;
}

openBooksy() {
  window.open('https://booksy.com/pl-pl/dl/show-business/294506?utm_medium=c2c_referral', '_blank');
}


}
