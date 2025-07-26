import { Component } from '@angular/core';
import { Slider } from "../../shared/slider/slider";
import { Navbar } from "../../layout/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [Slider, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
