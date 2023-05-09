import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import { db } from "../../firebase-config";
import GoToTop from "../../GoToTop";
const EventFeedbacks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sections = [
        {
          name: "Mental Health Awareness Workshop",
          subcollection: "MVM_3",
          docId: "Mental_Health",
        },

        {
          name: "Hepah : From Welfare to Well-being",
          subcollection: "ChildrensDay",
          docId: "Hepah",
        },

        {
          name: "Swachh Prayaakh : A Cleanliness Drive 2.0",
          subcollection: "Drive2",
          docId: "Swachh Prayaakh",
        },
        // add more sections as needed
      ];
      const data = await Promise.all(
        sections.map(async (section) => {
          const snapshot = await db
            .collection("EventsFeedbacks")
            .doc(section.docId)
            .collection(section.subcollection)
            .get();
          return {
            name: section.name,
            items: snapshot.docs.map((doc) => doc.data()),
          };
        })
      );
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {" "}
      <GoToTop />
      <div className="container-fluid" style={{ marginTop: "12vh" }}>
        <div className="section-title">
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
              color: "#212A3E",
            }}
          >
            EVENT FEEDBACKS
          </h2>
        </div>
        {data.map((section) => (
          <div key={section.name}>
            <h2
              style={{
                backgroundColor: "orange",
                padding: "10px",
                color: "white",
                marginTop: "3vh",
              }}
            >
              {section.name}
            </h2>
            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
                  <th>#</th>

                  <th style={{ textAlign: "left" }}>Name</th>
                  <th style={{ textAlign: "left" }}>
                    Overall, how would the rate the Mental Health Awareness
                    Workshop*
                  </th>
                  <th style={{ textAlign: "left" }}>
                    After the event, how inspired did you feel?*
                  </th>
                  <th style={{ textAlign: "left" }}>
                    Are you willing to participate in our future drives?*
                  </th>
                  <th style={{ textAlign: "left" }}>
                    Overall rating for the management of the event*
                  </th>
                  <th style={{ textAlign: "left" }}>
                    Feedback regarding the overall experience about the drive
                    and management*
                  </th>
                  <th style={{ textAlign: "left" }}>
                    Feedback regarding the participated members in general
                  </th>
                  <th style={{ textAlign: "left" }}>
                    Feedback regarding the board members
                  </th>
                  <th style={{ textAlign: "left" }}>
                    Any suggestion how can we improve the future events*
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "12px" }}>
                {section.items.map((item, index) => (
                  <tr>
                    <td style={{ textAlign: "center", width: "5vh" }}>
                      {index + 1}
                    </td>

                    <td
                      style={{
                        textAlign: "left",
                        minWidth: "25vh",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </td>

                    <td style={{ textAlign: "center" }}>{item.q1}</td>
                    <td style={{ textAlign: "center" }}>{item.q2}</td>
                    <td style={{ textAlign: "center" }}>{item.q3}</td>

                    <td style={{ textAlign: "center" }}>{item.q4}</td>
                    <td style={{ textAlign: "left", minWidth: "30vh" }}>
                      {item.q5}
                    </td>

                    <td style={{ textAlign: "left", minWidth: "30vh" }}>
                      {item.q6}
                    </td>
                    <td style={{ textAlign: "left", minWidth: "30vh" }}>
                      {item.q7}
                    </td>
                    <td style={{ textAlign: "left", minWidth: "30vh" }}>
                      {item.q8}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
        <br></br> <br></br>
      </div>
    </>
  );
};

export default EventFeedbacks;
