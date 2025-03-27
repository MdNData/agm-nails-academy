import cursBazaImg from "../../../images/curs-baza.webp";
import cursDePerfectionareImg from "../../../images/curs-de-perfectionare.webp";

const coursesData = [
  {
    id: 1,
    title: "Curs de bază",
    secondTitle: "Stilist - Protezist",
    thirdTitle: "~ de la 0 la profesionist în 5 zile ~",
    price: "1.800 lei - 5 zile",
    price2: "2.450 lei cu acreditare",
    img: cursBazaImg,
    elements: [
      {
        id: 1,
        title: "Cui se adresează acest curs?",
        details: [
          "Acest curs se adresează tuturor celor care doresc să învețe de la 0.",
          "Este creat special pentru începători și îți oferă toate cunoștințele și tehnicile necesare pentru a realiza unghii durabile și atrăgătoare.",
          "La final, vei pleca nu doar cu o Diplomă Acreditată, ci și cu încrederea de a începe o carieră în domeniul manichiurii.",
        ],
      },
      {
        id: 2,
        title: "Ce vei învăța?",
        details: [
          "Cum să pregătești corect unghia naturală și cum să lucrezi în siguranță.",
          "Anatomia unghiei naturale.",
          "Tipuri de pat unghial.",
          "Tipuri de cuticulă și recomandări pentru îndepărtarea corectă.",
          "Tehnici de aplicare a diferitelor tipuri de materiale (gel, acrygel, polygel, rubber base, gel lichid, polygel lichid).",
          "Realizarea blicului corect și importanța lui.",
          "Protecția pe unghia naturală.",
          "Construcția cu șablon.",
          "Construcția și întreținerea cu tips reutilizabil.",
          "Piliarea corectă și rapidă pentru diferitele forme.",
          "Tehnica fără pilire.",
          "Tehnica hibrid și diferite tehnici însușite și perfecționate în timp.",
          "Pătrat natural și oval natural.",
          "Diferența dintre formele naturale, clasice și formele moderne.",
          "Întreținere simplă și întreținere complexă.",
          "Design-uri rapide și de efect, degradeuri, babyboomer, aplicarea ideală a culorii.",
          "Curățarea, dezinfectarea și sterilizarea instrumentarului metalic folosit.",
        ],
      },
      {
        id: 3,
        title: "Structura pe zile",
        days: [
          {
            id: 1,
            title: "Ziua 1",
            lista: [
              "Pregătirea corectă a plăcii unghiale.",
              "Stilizarea cuticulei în diferite tehnici.",
              "Realizarea protecției pe unghia naturală cu diferite materiale autonivelante: rubber base, gel lichid, polygel lichid.",
              "Realizarea corecțiilor ușoare în tehnica modernă.",
              "Aplicarea perfectă a culorii sub faldul proximal.",
              "Realizarea blicului.",
            ],
          },
          {
            id: 2,
            title: "Ziua 2",
            lista: [
              "Întreținerea simplă și rapidă și diferențele față de întreținerea complexă.",
              "Cantitatea de material vechi care trebuie îndepărtată.",
              "Cum să îndepărtezi materialul vechi fără să distrugi placa unghială.",
              "Refacerea structurii corecte a unghiei.",
              "Întărirea vârfului unghiei în diferite tehnici.",
            ],
          },
          {
            id: 3,
            title: "Ziua 3",
            lista: [
              "Construcția pe șablon a formei pătrat natural.",
              "Pașii de pilire a pătratului.",
              "French pictat și texturat.",
            ],
          },
          {
            id: 4,
            title: "Ziua 4",
            lista: [
              "Construcția pe șablon/tips a formei oval natural.",
              "Pașii de pilire a formei oval.",
              "Realizarea diferitelor design-uri ușoare: aplicare ștampilă, aplicare folie de transfer, aplicare pigmenți etc.",
            ],
          },
          {
            id: 5,
            title: "Ziua 5",
            lista: ["Întreținerea complexă în diferite tehnici."],
          },
        ],
      },
      {
        id: 4,
        title: "Beneficii",
        details: [
          "Sprijin permanent: după finalizarea cursului vei avea parte de susținerea mea pentru orice întrebări sau dificultăți întâlnite.",
          "Materiale incluse: toate produsele în timpul cursului vă sunt asigurate astfel încât să vă concentrați doar pe învățare.",
          "Cadouri: vei primi un Kit de produse de început și „Caietul începătorului” - ghidul complet pentru a lucra organizat și eficient.",
          "Diplomă Acreditată de Ministerul Muncii.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Curs de perfecționare",
    secondTitle:
      "Level Up ~ perfecționează-ți tehnica și lucrează mai rapid, mai precis! ~",
    price: "500 - 2.000 lei ~ 1 - 5 zile",
    price2: "2.650 lei cu acreditare",
    img: cursDePerfectionareImg,
    elements: [
      {
        id: 1,
        title: "Cui se adresează acest curs?",
        details: [
          "Curs de 5 zile – TU alegi la ce participi! 1 zi sau toate 5",
          "Acest curs este destinat celor care au deja cunoștințe de bază, dar vor să-și îmbunătățească tehnica și să-și crească nivelul profesional.",
          "Împreună vom elimina greșelile comune, vom rafina detaliile și vom descoperi noi soluții pentru unghii impecabile.",
          "Acest curs este mai mult decât o investiție în tehnică - este o investiție în reputația și succesul tău profesional.",
          "Perfecționează-te și câștigă încrederea clientelor tale cu fiecare lucrare.",
        ],
      },
      {
        id: 2,
        title: "Beneficii",
        details: [
          "Sprijin continuu: după curs vei avea acces permanent la susținerea mea, astfel încât să nu fii niciodată singură în evoluția ta profesională.",
          "Materiale incluse: nu trebuie să aduci nimic - asigur eu toate produsele necesare pe durata cursului.",
          "Diploma de participare (acreditată la cerere dacă urmezi tot parcursul de 5 zile): la final, vei primi o diplomă care atestă perfecționarea ta.",
          "Goodie Bag cu produse cadou și reduceri la produse.",
        ],
      },
      {
        id: 3,
        title: "Ce vei învăța?",
        details: [
          "Reducerea timpului de lucru prin tehnici eficiente.",
          "Perfecționarea formelor.",
          "Folosirea șablonului fără frică.",
          "Utilizarea și aplicarea corectă a tipsurilor reutilizabile fără refulari și cu pilire minimă.",
          "Pilire rapidă și precisă.",
          "Soluții pentru probleme frecvente.",
        ],
      },
      {
        id: 4,
        title: "Structura pe zile",
        days: [
          {
            id: 1,
            title: "Ziua 1",
            lista: [
              "Manichiura rusească și protecția pe unghia naturală.",
              "Corecția minimă și întărirea vârfului liber.",
            ],
          },
          {
            id: 2,
            title: "Ziua 2",
            lista: [
              "Pătrat natural și arcuit: construcția/întreținerea și pilirea formei corecte.",
            ],
          },
          {
            id: 3,
            title: "Ziua 3",
            lista: [
              "Oval slim: construcția/întreținerea și pilirea corectă a formei.",
            ],
          },
          {
            id: 4,
            title: "Ziua 4",
            lista: [
              "Migdala – construcția/întreținerea și pilirea corectă a formei.",
            ],
          },
          {
            id: 5,
            title: "Ziua 5",
            lista: ["Totul despre întreținere."],
          },
        ],
      },
    ],
  },
];

export default coursesData;
