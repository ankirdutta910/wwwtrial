import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { Doughnut } from "react-chartjs-2";

function StateCounts({ collectionName, fieldName }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countData, setCountData] = useState({});

  useEffect(() => {
    const collectionRef = db.collection("members").orderBy("state"); // Replace collectionName with the name of your Firestore collection
    collectionRef
      .get()
      .then((querySnapshot) => {
        const retrievedData = [];
        const count = {};
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          retrievedData.push(docData);
          const fieldValue = docData["state"]; // Replace fieldName with the name of the field you want to count
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

  const chartData = {
    labels: Object.keys(countData),
    datasets: [
      {
        data: Object.values(countData),
        backgroundColor: [
          "#ff75a8",
          "#adadad",
          "#0f9400",
          "#1E90FF",
          "#8FBC8F",
          "#FFA07A",
          "#C71585",
          "#7B68EE",
          "#48D1CC",
          "#DDA0DD",
        ],
        hoverBackgroundColor: [
          "#ff75a8",
          "#adadad",
          "#0f9400",
          "#1E90FF",
          "#8FBC8F",
          "#FFA07A",
          "#C71585",
          "#7B68EE",
          "#48D1CC",
          "#DDA0DD",
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
}

export default StateCounts;
