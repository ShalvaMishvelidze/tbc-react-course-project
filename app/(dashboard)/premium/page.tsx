import { libraries } from "@/utils/constants";
import { getSystemPreferences } from "../../../utils/actions";
import { Premium as Type } from "@/utils/interfaces";
import LoadingSpinner from "@/components/LoadingSpinner";

const Premium = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const { monthly, yearly }: Type = libraries[language].main.premium;

  if (!monthly || !yearly) {
    return <LoadingSpinner />;
  }

  return (
    <section className="premium">
      <h1>{monthly.title}:</h1>
      <div className="card">
        <div className="card__side card__side--front">
          <div className="card__picture card__picture--2">&nbsp;</div>
          <h4 className="card__heading">
            <span className="card__heading-span card__heading-span--2">
              {monthly.heading}
            </span>
          </h4>
          <div className="card__details">
            <ul>
              {monthly.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card__side card__side--back card__side--back-2">
          <div className="card__cta">
            <div className="card__price-box">
              <p className="card__price-only">{monthly.only}</p>
              <p className="card__price-value">$29.99</p>
            </div>
            <a
              href="https://buy.stripe.com/test_cN28z60LR3lpfsY4gh"
              className="btn btn--white"
            >
              {monthly.book}
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card__side card__side--front">
          <div className="card__picture card__picture--3">&nbsp;</div>
          <h4 className="card__heading">
            <span className="card__heading-span card__heading-span--3">
              {yearly.heading}
            </span>
          </h4>
          <div className="card__details">
            <ul>
              {yearly.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card__side card__side--back card__side--back-3">
          <div className="card__cta">
            <div className="card__price-box">
              <p className="card__price-only">{yearly.only}</p>
              <p className="card__price-value">$299.99</p>
            </div>
            <a
              href="https://buy.stripe.com/test_dR62aIeCH8FJ4OkfZ0"
              className="btn btn--white"
            >
              {yearly.book}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium;
