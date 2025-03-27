import { HiOutlineStar } from "react-icons/hi";

const RecognitionElement = ({ title, description, icon }) => {
  return (
    <article className="recognition-element">
      {icon}
      <h1>{title}</h1>
      <p>{description}</p>
    </article>
  );
};
export default RecognitionElement;
