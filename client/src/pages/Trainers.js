import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getTrainers } from "../services/api";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await getTrainers();
        setTrainers(data);
      } catch (_error) {
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) return <p className="container status">Loading trainers...</p>;

  return (
    <CardGrid
      title="Meet The Coaches"
      items={trainers}
      renderItem={(item) => (
        <>
          <h4>{item.name}</h4>
          <p>{item.specialization}</p>
          <p>{item.experience} years of coaching experience</p>
        </>
      )}
    />
  );
}

export default Trainers;
