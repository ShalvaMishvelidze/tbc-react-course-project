const Card = ({ active, duration, price, benefits }) => {
  return (
    <div className={`card ${active && "active"}`}>
      <h3 className="card-duration">{duration}</h3>
      <h1 className="card-price">{price}</h1>
      {benefits.map(({ name, available }) => {
        return (
          <p key={name} className={`card-benefit ${available && "active"}`}>
            {name}
          </p>
        );
      })}
    </div>
  );
};

export default Card;
