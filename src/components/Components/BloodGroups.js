import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import BarGraph from "./BarGraph";

function BloodGroups({ collectionName, fieldName }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countData, setCountData] = useState({});

  useEffect(() => {
    const membersRef = db.collection("members").orderBy("blood");
    const otherCollectionRef = db.collection("Coordinators").orderBy("blood");

    Promise.all([membersRef.get(), otherCollectionRef.get()])
      .then((snapshots) => {
        const retrievedData = [];
        const count = {};

        snapshots.forEach((snapshot) => {
          snapshot.forEach((doc) => {
            const docData = doc.data();
            retrievedData.push(docData);
            const fieldValue = docData["blood"] || docData["blood"];
            if (count[fieldValue]) {
              count[fieldValue]++;
            } else {
              count[fieldValue] = 1;
            }
          });
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

  if (isLoading) {
    return <div class="ui active centered inline loader"></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-fluid">
      {/* <div className="row">
        {Object.keys(countData).map((key) => (
          <div className="col-lg-3 my-2" key={key}>
            <div
              className="card"
              style={{
                backgroundColor: "#def3ff",
                borderRadius: "12px",
                border: "none",
              }}
            >
              <div
                className="content"
                style={{ padding: "35px 20px 35px 20px", minHeight: "10vh" }}
              >
                <div className="header">
                  <b
                    style={{
                      float: "left",
                      color: "#000",
                      fontSize: "13px",
                    }}
                  >
                    {key}
                  </b>
                </div>

                <div
                  className="description"
                  style={{
                    float: "right",
                    fontSize: "45px",
                    fontWeight: "bolder",
                    color: "orange",
                  }}
                >
                  {countData[key]}
                </div>
                <br />
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <BarGraph countData={countData} />
    </div>
  );
}

export default BloodGroups;
