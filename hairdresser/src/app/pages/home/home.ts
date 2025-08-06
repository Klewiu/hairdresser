import { Component, OnInit } from '@angular/core';
import { Slider } from "../../shared/slider/slider";
import { Navbar } from "../../layout/navbar/navbar";
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Slider, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

ngOnInit(): void {
  AOS.init({
    duration: 700,
    easing: 'ease-in-out',
    once: false // allow animations every time the element is visible
  });
}
}
