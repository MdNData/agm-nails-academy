import LeftHero from "./LeftHero/LeftHero";
import RightHero from "./RightHero/RightHero";
import MobileHero from "./MobileHero/MobileHero";
import useDetectScreenSize from "../../../hooks/useDetectScreenSize";

const HeroContainer = () => {
  const { width, height } = useDetectScreenSize();
  return (
    <section className="hero-container">
      {width < 800 ? (
        <MobileHero width={width} />
      ) : (
        <>
          <MobileHero width={width} />
          <RightHero />
        </>
      )}
    </section>
  );
};
export default HeroContainer;
