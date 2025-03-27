import RecognitionElement from "./RecognitionElement/RecognitionElement";
import iconsData from "./data";

const RecognitionsContainer = () => {
  return (
    <section className="recognitions-container">
      <div>
        {iconsData.map((element) => {
          return (
            <RecognitionElement
              key={element.id}
              title={element.title}
              description={element.description}
              icon={element.icon}
            />
          );
        })}
      </div>
    </section>
  );
};
export default RecognitionsContainer;
