const TopTitle = ({
  first = "Despre Mine",
  second = "Gabriela Antoche",
  secondHidden = false,
  third = "",
  thirdHidden = true,
}) => {
  return (
    <div className="title">
      <h1>{first}</h1>
      {secondHidden ? "" : <h2>{second}</h2>}
      {thirdHidden ? "" : <h2>{third}</h2>}
    </div>
  );
};
export default TopTitle;
