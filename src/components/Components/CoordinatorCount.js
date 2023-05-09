import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

function CoordinatorCount({ collectionName }) {
  const [docCount, setDocCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = db.collection("Coordinators");

    collectionRef
      .get()
      .then((querySnapshot) => {
        setDocCount(querySnapshot.size);
      })
      .catch((error) => {
        setError("Error retrieving data: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [collectionName]);

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
        }}
      >
        <div class="content">
          <div
            class="description"
            style={{
              margin: "4vh 0 2vh 0",
              fontSize: "100px",
              fontWeight: "bolder",
              textAlign: "center",
              color: "#a3dbff",
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
export default CoordinatorCount;
