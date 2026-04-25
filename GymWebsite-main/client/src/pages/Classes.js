import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getClasses } from "../services/api";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (_error) {
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) return <p className="container status">Loading classes...</p>;

  return (
    <CardGrid
      title="Our Classes"
      items={classes}
      renderItem={(item) => (
        <>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>
            <strong>Duration:</strong> {item.duration}
          </p>
          <p>
            <strong>Level:</strong> {item.level}
          </p>
        </>
      )}
    />
  );
}

export default Classes;
