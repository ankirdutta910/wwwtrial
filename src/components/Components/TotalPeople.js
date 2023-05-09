import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

function TotalPeople() {
  const [docCount, setDocCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collection1Ref = db.collection("members");
    const collection2Ref = db.collection("Coordinators");

    const query1 = collection1Ref.get();
    const query2 = collection2Ref.get();

    Promise.all([query1, query2])
      .then((querySnapshots) => {
        const count = querySnapshots.reduce((total, querySnapshot) => {
          return total + querySnapshot.size;
        }, 0);
        setDocCount(count);
      })
      .catch((error) => {
        setError("Error retrieving data: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div class="ui active centered inline loader"></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-fluid my-3">
      <div
        class="card"
        style={{
          border: "none",
          height: "20vh",
        }}
      >
        <div class="content">
          <div
            class="description"
            style={{
              margin: "7vh 0 5vh 0",
              fontSize: "150px",
              fontWeight: "bolder",
              textAlign: "center",
              color: "orange",
            }}
          >
            {docCount}
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}
export default TotalPeople;
