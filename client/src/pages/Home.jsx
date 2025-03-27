import CourseSession from "../assets/components/Home/CourseSession/CourseSession";
import HeroContainer from "../assets/components/Home/HeroContainer/HeroContainer";
import RecognitionsContainer from "../assets/components/Home/RecognitionsContainer/RecognitionsContainer";
import WhereWeAre from "../assets/components/Home/WhereWeAre/WhereWeAre";

const Home = () => {
  return (
    <>
      <header>
        <HeroContainer />
      </header>
      <section>
        <RecognitionsContainer />
        <CourseSession />
        <WhereWeAre />
      </section>
    </>
  );
};
export default Home;
