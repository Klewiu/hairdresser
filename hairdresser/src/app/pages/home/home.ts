import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
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
  description: string; // short
  items: PriceItem[];
}

interface ServiceCard {
  id: TabId;
  label: string;
  img: string;
  description: string; // short (on card if needed later)
  longdescr: string;   // long (used in modal)
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

  // --- Existing pricing/tabs data (kept) ---
  tabs: TabData[] = [
    {
      id: 'koloryzacja',
      label: 'Koloryzacja',
      description: 'Jednolite krycie, rozświetlanie lub wielotonowe kolory – dobierzemy odcień do Twojej urody.',
      items: [
        { name: 'Rozjaśnianie włosów', price: '612 zł', note: '(baleyage/air touch/global)' },
        { name: 'Rozświetlanie włosów', price: '344 zł', note: '(częściowe refleksy)' },
        { name: 'Koloryzacja + strzyżenie', price: '304 zł' }
      ]
    },
    {
      id: 'strzyzenie',
      label: 'Strzyżenie',
      description: 'Strzyżenie damskie to coś więcej niż tylko skrócenie – precyzyjne cięcia i modelowanie.',
      items: [
        { name: 'Strzyżenie damskie', price: '160 zł', note: 'włosy krótkie' },
        { name: 'Strzyżenie damskie', price: '168 zł', note: 'włosy średnie' },
        { name: 'Strzyżenie damskie', price: '184 zł', note: 'włosy długie' }
      ]
    },
    {
      id: 'pielegnacja',
      label: 'Pielęgnacja włosów i skóry głowy',
      description: 'Profesjonalna pielęgnacja – dobrana indywidualnie po diagnozie skóry głowy i kondycji włosów.',
      items: [
        { name: 'Pielęgnacja włosów', price: '135 zł' },
        { name: 'Detox skóry głowy', price: '120 zł', note: 'peeling skóry + ampułka' },
      ]
    },
    {
      id: 'stylizacja',
      label: 'Stylizacja',
      description: 'Fale, loki, upięcia – na co dzień i na wyjątkowe okazje.',
      items: [
        { name: 'Modelowanie dzienne', price: '80 zł' },
        { name: 'Fale/Loki', price: '120 zł' },
      ]
    },
    {
      id: 'przeksztalcenie',
      label: 'Przekształcenie',
      description: 'Zmiany struktury włosa: prostowanie, trwała – po konsultacji.',
      items: [
        { name: 'Kreatynowe wygładzanie', price: '400 zł' },
        { name: 'Trwała ondulacja', price: '369 zł' },
        { name: 'Kreatin Express', price: '135 zł' },
      ]
    }
  ];

  // Active tab (if you still use it elsewhere)
  activeTab: TabId = 'koloryzacja';
  get currentTab() {
    return this.tabs.find(t => t.id === this.activeTab);
  }

  // --- New: Services cards + modal ---

  // Your images (you already customized these paths)
  serviceImages: Record<TabId, string> = {
    koloryzacja: 'redhead.webp',
    strzyzenie: 'hand.webp',
    pielegnacja: 'img1.jpg',
    stylizacja: 'img3.jpg',
    przeksztalcenie: 'img2.jpg',
  };

  // Long descriptions used in modal
  longDescriptions: Record<TabId, string> = {
    koloryzacja:
      'Koloryzacja to nie tylko zmiana koloru włosów, ale przede wszystkim sposób na podkreślenie urody, odświeżenie wizerunku i nadanie fryzurze wyjątkowego charakteru. W naszym salonie pracujemy wyłącznie na profesjonalnych produktach fryzjerskich, które zapewniają piękny efekt i jednocześnie dbają o kondycję włosów. Oferujemy rozjaśnianie włosów z wykorzystaniem nowoczesnych technik, takich jak baleyage, air touch, sunlight czy koloryzacja brazylijska. Dzięki nim możemy uzyskać zarówno delikatne, naturalne przejścia kolorystyczne, jak i spektakularne, wielotonowe efekty. Wykonujemy również rozświetlanie wybranych partii włosów w formie refleksów, które nadają fryzurze lekkości, świeżości i objętości. Zawsze dbamy o indywidualny dobór odcieni – dopasowujemy kolor do karnacji, rysów twarzy i stylu życia, aby całość była harmonijna i podkreślała naturalne piękno. Oferujemy także tonowanie włosów, które pozwala uzyskać idealny odcień, neutralizuje niechciane refleksy i nadaje fryzurze połysk. Koloryzację poprzedza konsultacja z naszym stylistą, podczas której omawiamy Twoje oczekiwania, możliwości włosów oraz proponujemy rozwiązania najlepiej dopasowane do ich kondycji. Dzięki temu możesz mieć pewność, że efekt końcowy będzie nie tylko estetyczny, ale również bezpieczny dla Twoich włosów.',
    strzyzenie:
      'Strzyżenie damskie to sztuka łączenia precyzji z kreatywnością, dzięki której fryzura zyskuje kształt, lekkość i świeżość. W naszym salonie oferujemy profesjonalne cięcia dopasowane do długości włosów – krótkich, średnich i długich – tak aby podkreślały naturalne piękno i były wygodne w codziennym noszeniu. Każde strzyżenie poprzedzone jest konsultacją ze stylistą, który doradza najlepszą formę i długość, uwzględniając kształt twarzy, strukturę włosów oraz oczekiwania klientki. Stawiamy na nowoczesne techniki i dbałość o detale, aby uzyskany efekt był nie tylko estetyczny, ale także trwały i łatwy w stylizacji.',
    pielegnacja:
      'Profesjonalna pielęgnacja włosów i skóry głowy to podstawa zdrowej, lśniącej fryzury. W naszym salonie oferujemy zabiegi dopasowane indywidualnie do potrzeb włosów – od intensywnego nawilżenia i regeneracji, przez odżywienie i odbudowę, aż po zabiegi oczyszczające i detoksykujące. Wykonujemy rytuały pielęgnacyjne z wykorzystaniem specjalistycznych ampułek, masek oraz peelingów skóry głowy, które przywracają równowagę i pobudzają cebulki włosów do wzrostu. Każdy zabieg poprzedzony jest diagnozą kondycji włosów i skóry głowy, aby dobrać odpowiednie preparaty i techniki. Dzięki temu efektem pielęgnacji jest nie tylko poprawa wyglądu, ale również wzmocnienie struktury włosa i przywrócenie mu naturalnego blasku.',
    stylizacja:
      'Stylizacja włosów to sposób na podkreślenie wyjątkowego charakteru i stworzenie fryzury idealnej na każdą okazję. W naszym salonie oferujemy modelowanie dzienne, które nadaje włosom lekkości i świeżości, a także tworzymy fale, loki i eleganckie upięcia na wyjątkowe wydarzenia. Korzystamy z profesjonalnych kosmetyków stylizacyjnych, które zapewniają trwałość fryzury bez obciążania włosów. Każda stylizacja dobierana jest indywidualnie do typu włosów, rysów twarzy oraz charakteru uroczystości, tak aby efekt był spójny i podkreślał naturalne piękno. Dzięki doświadczeniu naszych stylistów możesz być pewna, że Twoja fryzura będzie wyglądała perfekcyjnie zarówno na co dzień, jak i podczas szczególnych chwil',
    przeksztalcenie:
      'Przekształcenie włosów to usługi pozwalające całkowicie odmienić ich strukturę i charakter. W naszym salonie oferujemy zabiegi wygładzania kreatynowego, które sprawiają, że włosy stają się proste, gładkie i pełne blasku, a także trwałą ondulację nadającą im objętość i sprężystość w postaci fal lub loków. Wszystkie zabiegi poprzedzone są dokładną konsultacją, aby dobrać najlepszą metodę do rodzaju i kondycji włosów, a także oczekiwanego efektu. Stosujemy wyłącznie profesjonalne preparaty, które zapewniają nie tylko długotrwały rezultat, ale również dbają o zdrowie i kondycję włosów. Dzięki temu każda metamorfoza jest bezpieczna, a efekt końcowy podkreśla indywidualny styl i piękno klientki.',
  };

  // 3+2 desired order
  private serviceOrder: TabId[] = [
    'koloryzacja', 'strzyzenie', 'pielegnacja', 'stylizacja', 'przeksztalcenie'
  ];

  // Build cards from tabs + images + long descriptions
  get serviceCards(): ServiceCard[] {
    return this.serviceOrder
      .map(id => this.tabs.find(t => t.id === id))
      .filter((t): t is TabData => !!t)
      .map(t => ({
        id: t.id,
        label: t.label,
        img: this.serviceImages[t.id],
        description: t.description,
        longdescr: this.longDescriptions[t.id],
      }));
  }

  // Modal state
  isModalOpen = false;
  modalId: TabId | null = null;
  modalBgUrl = '';

  get currentModalCard(): ServiceCard | undefined {
    if (!this.modalId) return undefined;
    const base = this.tabs.find(x => x.id === this.modalId);
    if (!base) return undefined;
    return {
      id: base.id,
      label: base.label,
      img: this.serviceImages[base.id],
      description: base.description,
      longdescr: this.longDescriptions[base.id],
    };
  }

  openModal(id: TabId) {
    this.modalId = id;
    this.modalBgUrl = this.serviceImages[id] || '';
    this.isModalOpen = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalId = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape')
  handleEsc() {
    if (this.isModalOpen) this.closeModal();
  }

  // --- Lifecycle / ScrollReveal (kept) ---
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
