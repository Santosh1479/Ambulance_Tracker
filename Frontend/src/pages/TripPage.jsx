import { useParams } from "react-router-dom";

const TripPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Trip Page</h2>
      <p>Trip ID: {id}</p>
      {/* Add your custom logic/work here */}
    </div>
  );
};

export default TripPage;