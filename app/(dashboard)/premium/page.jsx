import Card from "../../../components/Card";
import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";

const Premium = async () => {
  const { language } = await getSystemPreferences();
  const { monthly, yearly } = await libraries[language].main.premium;
  return (
    <section className="premium">
      <Card
        duration={monthly.heading}
        price={4.99}
        benefits={monthly.benefits}
      />
      <Card
        active
        duration={yearly.heading}
        price={69.99}
        benefits={yearly.benefits}
      />
    </section>
  );
};

export default Premium;
