import { useState } from "react";
import trainerImg from "../../../images/trainer.webp";
import nails3Img from "../../../images/nails3.webp";
import nails4Img from "../../../images/nails4.webp";
import { Link } from "react-router-dom";
import TopTitle from "./TopTitle/TopTitle";

const Introduction = () => {
  return (
    <section className="introduction">
      <TopTitle/>
      <div className="story">
        <p>
          În 2016, am pășit pentru prima dată într-un univers care avea să-mi
          schimbe viața – lumea unghiilor tehnice.
        </p>
        <p>
          La început, totul părea o aventură în care fiecare detaliu era o
          promisiune a ceva frumos.
        </p>
        <p>
          Rapid am descoperit că arta unghiilor este mult mai mult decât o
          simplă pasiune: este o fuziune subtilă între tehnică și expresivitate
          artistică, care îți permite să transmiți un strop din sufletul tău
          prin fiecare creație.
        </p>
        <img src={trainerImg} alt="Portret" />
        <p>
          Am ales să investesc în mine, urmând zeci de cursuri – atât online,
          cât și în ateliere practice – pentru că eu cred cu tărie că „ușa
          cunoașterii se deschide pentru cei curajoși să pășească prin ea”.
        </p>
        <p>
          Fiecare lecție, fiecare tehnică nouă și fiecare feedback din partea
          clientelor m-au învățat că perfecțiunea nu este un scop, ci o
          călătorie continuă.
        </p>
        <p>
          În această călătorie, am întâlnit oameni minunați ce m-au provocat să-mi depășesc limitele, transformând fiecare obstacol într-o oportunitate de creștere.
        </p>
        <p>
          În 2018, am deschis primul meu salon în Constanța, marcând începutul
          unei noi etape, iar de atunci am continuat să cresc și să evoluez
          alături de clientele mele.
        </p>
        <p>
          Fiecare unghie decorată pentru mine este o mică operă de artă, o
          expresie autentică a personalității fiecărei cliente.
        </p>

        <img src={nails4Img} alt="Unghii cu un cer albastru" />
        <p>
          Zâmbetul lor de satisfacție îmi reamintește de ce am ales acest drum,
          iar fiecare proiect finalizat aduce cu sine sentimentul că am
          contribuit la o transformare – nu doar estetică, ci și emoțională.
        </p>
        <p>
          Aceste experiențe m-au inspirat să fac următorul pas: să devin trainer
          și mentor, pentru a împărtăși tot ce am învățat și pentru a susține pe
          cei ce visează să transforme pasiunea într-o carieră de succes.
        </p>
        <p>
          În cadrul cursurilor mele, nu predau doar tehnici, ci transmit și
          valori fundamentale – perseverența, curiozitatea și dorința de a nu te
          opri niciodată din învățat.
        </p>
        <p>
          Vreau să ofer fiecărei cursante instrumentele necesare pentru a-și
          descoperi și cultiva propriul talent, astfel încât fiecare idee să se
          transforme într-o capodoperă personală.
        </p>
        <img src={nails3Img} alt="Unghii de craciun" />
        <p>
          Fiecare zi este o nouă oportunitate de a explora limitele
          creativității și de a descoperi secretele unei arte ce se reinventează
          constant.
        </p>
        <p>
          Te invit să te alături în această aventură magică, unde vom
          construi împreună o comunitate de oameni pasionați, dornici să se
          autodepășească și să strălucească prin arta unghiilor tehnice.
        </p>
        <p>
          Împreună, vom transforma fiecare provocare într-un pas spre
          perfecțiune, iar pasiunea ta va prinde contur sub îndrumarea unei
          experiențe care a început cu o simplă joacă și a evoluat într-o
          adevărată chemare.
        </p>
        <p>
          Hai să descoperim împreună magia din spatele fiecărui detaliu și să
          fim, zi de zi, arhitecții propriului succes!
        </p>
      </div>
      <button><Link to={"/cursuri"}>Înscrie-te la cursurile mele</Link></button>
    </section>
  );
};
export default Introduction;
