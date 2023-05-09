import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function Events() {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("OfflineEvents").orderBy("regno"),
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
            OFFLINE EVENTS
          </h2>
        </div>
        <br></br>
        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th>#</th>
              <th style={{ textAlign: "center" }}>Action</th>

              <th style={{ textAlign: "left" }}>Reg no.</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Department</th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>Event10</th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>Event9</th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                MH Workshop
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                Book Drive
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                NE_Convene'23
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                Children's Day
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                Cleanliness Drive-II
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                Cleanliness Drive-I
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                {" "}
                Prabhati{" "}
              </th>
              <th style={{ textAlign: "center", minWidth: "13vh" }}>
                Wellness Drive: Food Drive
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {photos &&
              photos.map((item, index) => (
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "5vh",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    {index + 1}
                  </td>

                  <td
                    style={{
                      backgroundColor: `${item.bg}`,
                      textAlign: "center",
                      width: "10vh",
                    }}
                  >
                    <Button
                      style={{
                        marginTop: "2px",
                      }}
                      size="small"
                      onClick={() => navigate(`/editevent/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
                  </td>

                  <td
                    style={{
                      textAlign: "left",
                      textTransform: "uppercase",
                      width: "13vh",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    {item.regno}
                  </td>

                  <td
                    style={{
                      textAlign: "left",
                      minWidth: "25vh",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    {item.name}
                  </td>

                  <td
                    style={{
                      textAlign: "left",
                      minWidth: "20vh",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    {item.department}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color10}` }}>
                      {item.event10}{" "}
                      <a
                        style={{
                          display: `${item.s10}`,
                          color: `${item.color10}`,
                        }}
                        href={item.e10}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color9}` }}>
                      {item.event9}{" "}
                      <a
                        style={{
                          display: `${item.s9}`,
                          color: `${item.color9}`,
                        }}
                        href={item.e9}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color8}` }}>
                      {item.event8}{" "}
                      <a
                        style={{
                          display: `${item.s8}`,
                          color: `${item.color8}`,
                        }}
                        href={item.e8}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color7}` }}>
                      {item.event7}{" "}
                      <a
                        style={{
                          display: `${item.s7}`,
                          color: `${item.color7}`,
                        }}
                        href={item.e7}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color6}` }}>
                      {item.event6}{" "}
                      <a
                        style={{
                          display: `${item.s6}`,
                          color: `${item.color6}`,
                        }}
                        href={item.e6}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color5}` }}>
                      {item.event5}{" "}
                      <a
                        style={{
                          display: `${item.s5}`,
                          color: `${item.color5}`,
                        }}
                        href={item.e5}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>{" "}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color4}` }}>
                      {item.event4}{" "}
                      <a
                        style={{
                          display: `${item.s4}`,
                          color: `${item.color4}`,
                        }}
                        href={item.e4}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>{" "}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color3}` }}>
                      {item.event3}{" "}
                      <a
                        style={{
                          display: `${item.s3}`,
                          color: `${item.color3}`,
                        }}
                        href={item.e3}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color2}` }}>
                      {item.event2}{" "}
                      <a
                        style={{
                          display: `${item.s2}`,
                          color: `${item.color2}`,
                        }}
                        href={item.e2}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      backgroundColor: `${item.bg}`,
                    }}
                  >
                    <p style={{ color: `${item.color1}` }}>
                      {item.event1}{" "}
                      <a
                        style={{
                          display: `${item.s1}`,
                          color: `${item.color1}`,
                        }}
                        href={item.e1}
                        target="_blank"
                      >
                        [ <i class="fa fa-download" aria-hidden="true"></i> ]
                      </a>
                    </p>
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

export default Events;
