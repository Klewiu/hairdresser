import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slider } from "../../shared/slider/slider";
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Slider, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit {
  isLoading = true;

  ngOnInit(): void {
    // Simulate load (e.g., wait for slider/images)
    window.addEventListener('load', () => {
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    const sr = ScrollReveal();

    // Generic defaults
    const base = {
      distance: '24px',
      duration: 700,
      easing: 'ease-in-out',
      reset: false,       // like AOS 'once: true' (false = reveal once)
      mobile: true,
      viewFactor: 0.15,   // reveal when ~15% visible
    };

    // Replace AOS data attributes with classes or selectors you want to animate:
    sr.reveal('[data-sr="fade"]',   { ...base, distance: '0px', opacity: 0 });
    sr.reveal('[data-sr="fade-up"]',{ ...base, origin: 'bottom' });
    sr.reveal('[data-sr="fade-right"]',{ ...base, origin: 'right' });
    sr.reveal('[data-sr="fade-left"]',{ ...base, origin: 'left' });
  }
}
