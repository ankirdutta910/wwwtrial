import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

function DeptCounts({ collectionName, fieldName }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countData, setCountData] = useState({});

  useEffect(() => {
    const collectionRef = db.collection("members").orderBy("department"); // Replace collectionName with the name of your Firestore collection
    collectionRef
      .get()
      .then((querySnapshot) => {
        const retrievedData = [];
        const count = {};
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          retrievedData.push(docData);
          const fieldValue = docData["department"]; // Replace fieldName with the name of the field you want to count
          if (count[fieldValue]) {
            count[fieldValue]++;
          } else {
            count[fieldValue] = 1;
          }
        });
        setData(retrievedData);
        setCountData(count);
      })
      .catch((error) => {
        setError("Error retrieving data: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [collectionName, fieldName]);

  // if (isLoading) {
  //   return (
  //     <div class="ui active inverted dimmer">
  //       <div class="ui text loader">Loading</div>
  //     </div>
  //   );
  // }
  if (isLoading) {
    return <div class="ui active centered inline loader"></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {Object.keys(countData).map((key) => (
          <div
            className="col-md text-center"
            style={{
              backgroundColor: "#d1edff",
              margin: "4px",
              padding: "12px 3px 8px 3px",
              borderRadius: "8px",
            }}
          >
            <p>{key}</p>
            <p
              style={{
                marginTop: "-12px",
                fontWeight: "700",
                fontSize: "27px",
              }}
            >
              {countData[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DeptCounts;
