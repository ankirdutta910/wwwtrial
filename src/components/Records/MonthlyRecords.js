import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function MonthlyRecords() {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("MonthlyRecords").orderBy("no"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPhotos(list);
        setLoading(false);
      },

      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
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
            MONTHLY RECORDS
          </h2>
        </div>
        <br></br>
        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th>#</th>
              <th style={{ textAlign: "center" }}>Action</th>
              <th style={{ textAlign: "left" }}>Name</th>

              <th style={{ minWidth: "20vh", textAlign: "left" }}>
                Designation
              </th>

              <th style={{ textAlign: "center" }}>May'23</th>
              <th style={{ textAlign: "center" }}>Jun'23</th>
              <th style={{ textAlign: "center" }}>Jul'23</th>
              <th style={{ textAlign: "center" }}>Aug'23</th>
              <th style={{ textAlign: "center" }}>Sept'23</th>
              <th style={{ textAlign: "center" }}>Oct'23</th>
              <th style={{ textAlign: "center" }}>Nov'23</th>
              <th style={{ textAlign: "center" }}>Dec'23</th>
              <th style={{ textAlign: "center" }}>Jan'24</th>
              <th style={{ textAlign: "center" }}>Feb'24</th>
              <th style={{ textAlign: "center" }}>Mar'24</th>
              <th style={{ textAlign: "center" }}>Apr'24</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {photos &&
              photos.map((item, index) => (
                <tr>
                  <td style={{ textAlign: "center", width: "5vh" }}>
                    {index + 1}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      width: "10vh",
                    }}
                  >
                    <Button
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => navigate(`/editmonthlyrecord/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
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

                  <td style={{ textAlign: "left", textTransform: "uppercase" }}>
                    {item.designation}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {item.may23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.jun23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.jul23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.aug23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.sept23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.oct23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.nov23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.dec23 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.jan24 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.feb24 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {item.mar24 ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Posted
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.apr24 ? (
                      <p style={{ color: "green" }}>Posted</p>
                    ) : (
                      <span style={{ color: "red" }}>Not Posted</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Table */}

        <br></br>
      </div>
    </>
  );
}

export default MonthlyRecords;
