import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

function Members_Gender({ collectionName, fieldName }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countData, setCountData] = useState({});

  useEffect(() => {
    const collectionRef = db.collection("members"); // Replace collectionName with the name of your Firestore collection
    collectionRef
      .get()
      .then((querySnapshot) => {
        const retrievedData = [];
        const count = {};
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          retrievedData.push(docData);
          const fieldValue = docData["gender"]; // Replace fieldName with the name of the field you want to count
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

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-fluid  my-2">
      <div className="row">
        {Object.keys(countData).map((key) => (
          <div className="col-lg">
            <div
              class="card"
              style={{
                boder: "4px solid #def3ff",
                borderRadius: "12px",
              }}
              key={key}
            >
              <div
                class="content"
                style={{
                  padding: "22px 20px 15px 20px",

                  textAlign: "center",
                }}
              >
                <div class="header">
                  <b
                    style={{
                      color: "#000",
                      fontSize: "15px",
                    }}
                  >
                    {key}
                  </b>
                </div>

                <div
                  class="description"
                  style={{
                    marginTop: "9px",

                    fontSize: "45px",
                    fontWeight: "bolder",

                    color: "#242424",
                  }}
                >
                  {countData[key]}
                </div>
                <br></br>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Members_Gender;
