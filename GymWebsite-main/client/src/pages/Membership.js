import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getMemberships } from "../services/api";

function Membership() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getMemberships();
        setPlans(data);
      } catch (_error) {
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <p className="container status">Loading plans...</p>;

  return (
    <CardGrid
      title="Membership Plans"
      items={plans}
      renderItem={(item) => (
        <>
          <h4>{item.name}</h4>
          <p className="price">${item.price}/month</p>
          <ul>
            {item.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </>
      )}
    />
  );
}

export default Membership;
