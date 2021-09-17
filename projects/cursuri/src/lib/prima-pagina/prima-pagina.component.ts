import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';

@Component({
  selector: 'lib-prima-pagina',
  templateUrl: './prima-pagina.component.html',
  styleUrls: ['./prima-pagina.component.scss']
})
export class PrimaPaginaComponent implements OnInit {


  images = [
    // {url: 'https://i.imgur.com/pcLAVGx.jpg'},
    {url: 'https://i.imgur.com/6wIoSeN.png'},
    {url: 'https://i.imgur.com/1bJnRRS.png'}
  ];

  texts = [
    {
      text: 'Dansul este o formă de mișcare recomandată indiferent de vârstă, iar de-a lungul vremii s-a demonstrat că poate avea un rol important nu numai în menținerea stării de sănătate, îmbunătățirea flexibilității și în întreținerea musculaturii, ci chiar că poate preveni afecțiuni grave, precum bolile cardiace, problemele de memorie sau depresia. Mai mult, este dovedit că dansul contribuie la îmbunătățirea sistemului imunitar.',
      title: '...antrenament' ,
      icon: 'car'
    },
    {
      text: 'Dansul implică, în egală măsură, efort, concentrare și pasiune, astfel că poate fi considerat, fără să exagerăm, una dintre cele mai plăcute și la îndemână terapii. A rupe rutina transformată, de obicei, în sursă inepuizabilă de stres și probleme înseamnă, de fapt, găsirea unui echilibru care să ne revigoreze mintea și să ne umple sufletul, încărcându-ne cu energie pozitivă.',
      title: '...terapie',
      icon: 'car'
    },
    {
      text: 'Dansul prinde viață prin noi și, la rândul său, ne umple de viață și bucurie, pentru că presupune muzică, mișcare, dar și apropiere. Este forma perfectă de evadare dintr-o lume obișnuită ca trupul să stea în timp ce gândul fuge în zeci de direcții. Prin dans cunoști și îți apropii oameni departe de acest haos zilnic în care domnește dezechilibrul, căci găsești liniștea interioară care să te lase să-i descoperi cu adevărat pe ceilalți și să te dezvălui lor.',
      title: '... suflet',
      icon: 'car'
    },
    {
      text: 'Dansul este artă, iar arta este frumusețe. Implicit, dansatorii sunt niște artiști frumoși. O combinație perfectă de mișcare și muzică, dansul este mereu o formă plăcută și eficientă de a-ți modela trupul și a-ți lumina mintea. Variat, complex, nemuritor, dansul este o punte de legătură indestructibilă între trecut, prezent și viitor. Iar dansul popular, cu atât mai mult, ne ține legați de originile noastre valoroase, provocându-ne, totodată, să evoluăm pentru a-i spune cât mai frumos și expresiv povestea.',
      title: '... artă și tradiție',
      icon: 'car'
    }
  ];


  ngOnInit(): void {
    // this.options = {
    //   autoplay: true,
    //   muted: true,
    //   quality: 720
    // }
  }
}
