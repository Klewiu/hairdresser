import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slider } from "../../shared/slider/slider";
import { Navbar } from "../../layout/navbar/navbar";
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Slider, Navbar, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] // fixed typo: should be styleUrls
})
export class Home implements OnInit {

  isLoading = true;

  ngOnInit(): void {
    // Initialize animations
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: false
    });

    // Simulate load (e.g. wait for slider/images)
    window.addEventListener('load', () => {
      this.isLoading = false;
    });
  }
}
