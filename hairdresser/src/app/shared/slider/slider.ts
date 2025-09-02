import { Component, AfterViewInit } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class Slider implements AfterViewInit {
  ngAfterViewInit(): void {
    new Splide('#image-slider', {
      type: 'loop',
      autoplay: true,
      interval: 4000,
      arrows: false,
      pagination: false,
      height: '100vh',
      cover: true,
      pauseOnHover: false,
      drag: false,      
      keyboard: false,
      speed:1200,
    }).mount();
  }
} 
