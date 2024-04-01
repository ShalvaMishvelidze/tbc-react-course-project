import Card from "../../components/Card";

const Premium = () => {
  return (
    <section className="premium">
      <Card
        duration={"monthly"}
        price={4.99}
        benefits={[
          { name: "first benefit", available: true },
          { name: "second benefit", available: true },
          { name: "third benefit", available: true },
          { name: "forth benefit", available: true },
          { name: "fifth benefit", available: false },
          { name: "sixth benefit", available: false },
        ]}
      />
      <Card
        active
        duration={"yearly"}
        price={69.99}
        benefits={[
          { name: "first benefit", available: true },
          { name: "second benefit", available: true },
          { name: "third benefit", available: true },
          { name: "forth benefit", available: true },
          { name: "fifth benefit", available: true },
          { name: "sixth benefit", available: true },
        ]}
      />
    </section>
  );
};

export default Premium;
