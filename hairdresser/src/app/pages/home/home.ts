import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slider } from "../../shared/slider/slider";
import ScrollReveal from 'scrollreveal';

type TabId = 'koloryzacja' | 'strzyzenie' | 'pielegnacja' | 'stylizacja' | 'przeksztalcenie';

interface PriceItem {
  name: string;
  price: string;
  note?: string;
}

interface TabData {
  id: TabId;
  label: string;
  description: string;
  items: PriceItem[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Slider, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit {
  isLoading = true;

  tabs: TabData[] = [
    {
      id: 'koloryzacja',
      label: 'Koloryzacja',
      description: 'Jednolite krycie, rozświetlanie lub wielotonowe kolory – dobierzemy odcień do Twojej urody.',
      items: [
        { name: 'Rozjaśnianie włosów', price: 'od 612 zł', note: '(baleyage/air touch/global)' },
        { name: 'Rozświetlanie włosów', price: 'od 344 zł', note: '(częściowe refleksy)' },
        { name: 'Koloryzacja + strzyżenie', price: 'od 304 zł' }
      ]
    },
    {
      id: 'strzyzenie',
      label: 'Strzyżenie',
      description: 'Strzyżenie damskie to coś więcej niż tylko skrócenie – precyzyjne cięcia i modelowanie.',
      items: [
        { name: 'Strzyżenie damskie', price: 'od 160zł', note: 'włosy krótkie' },
        { name: 'Strzyżenie damskie', price: 'od 168 zł', note: 'włosy średnie' },
        { name: 'Strzyżenie damskie', price: 'od 184 zł', note: 'włosy długie' }
      ]
    },
    {
      id: 'pielegnacja',
      label: 'Pielęgnacja włosów i skóry głowy',
      description: 'Profesjonalna pielęgnacja – dobrana indywidualnie po diagnozie skóry głowy i kondycji włosów.',
      items: [
        { name: 'Pielęgnacja włosów', price: 'od 135 zł' },
        { name: 'Detox skóry głowy', price: 'od 120 zł', note: 'peeling skóry + ampułka' },
    
      ]
    },
    {
      id: 'stylizacja',
      label: 'Stylizacja',
      description: 'Fale, loki, upięcia – na co dzień i na wyjątkowe okazje.',
      items: [
        { name: 'Modelowanie dzienne', price: 'od 80 zł' },
        { name: 'Fale/Loki', price: 'od 120 zł' },
    
      ]
    },
    {
      id: 'przeksztalcenie',
      label: 'Przekształcenie',
      description: 'Zmiany struktury włosa: prostowanie, trwała – po konsultacji.',
      items: [
        { name: 'Kreatynowe wygładzanie', price: 'od 400 zł' },
        { name: 'Trwała ondulacja', price: 'od 369 zł' },
        { name: 'Kreatin Express', price: 'od 135 zł' },
      ]
    }
  ];

  // Active tab is only for desktop
  activeTab: TabId = 'koloryzacja';

  get currentTab() {
    return this.tabs.find(t => t.id === this.activeTab);
  }

  ngOnInit(): void {
    window.addEventListener('load', () => {
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    const sr = ScrollReveal();
    const base = {
      distance: '24px',
      duration: 700,
      easing: 'ease-in-out',
      reset: false,
      mobile: true,
      viewFactor: 0.15,
    } as const;

    sr.reveal('[data-sr="fade"]',       { ...base, distance: '0px', opacity: 0 });
    sr.reveal('[data-sr="fade-up"]',    { ...base, origin: 'bottom' });
    sr.reveal('[data-sr="fade-right"]', { ...base, origin: 'right' });
    sr.reveal('[data-sr="fade-left"]',  { ...base, origin: 'left' });
  }
}
