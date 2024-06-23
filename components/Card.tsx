interface Card {
  active: boolean;
  duration: string;
  price: number;
  benefits: { name: string; available: boolean }[];
}

const Card = ({ type: { heading, benefits, only, book, num }, user }: any) => {
  return (
    <div className="card">
      <div className="card__side card__side--front">
        <div className={`card__picture card__picture--${num}`}>&nbsp;</div>
        <h4 className="card__heading">
          <span className={`card__heading-span card__heading-span--${num}`}>
            {heading}
          </span>
        </h4>
        <div className="card__details">
          <ul>
            {benefits.map((benefit: string) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`card__side card__side--back card__side--back-${num}`}>
        <div className="card__cta">
          <div className="card__price-box">
            <p className="card__price-only">{only}</p>
            <p className="card__price-value">$29.99</p>
          </div>
          <button
            className="btn btn--white"
            onClick={async () => {
              await fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({
                  user_id: user.sub,
                  email: user.email,
                  price_id: "price_1PUuEyJX3gDSYFjov4ohNHnT",
                  subscription: "monthly",
                }),
              });
            }}
          >
            {book}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
