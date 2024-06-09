import { libraries } from "@/utils/constants";
import Card from "../../../components/Card";
import { getSystemPreferences } from "../../../utils/actions";
import { Premium as Type } from "@/utils/interfaces";

const Premium = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const { monthly, yearly }: Type = libraries[language].main.premium;

  return (
    <section className="premium">
      <Card
        active={false}
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
