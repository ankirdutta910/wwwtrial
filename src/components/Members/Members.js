import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function Members() {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("members").orderBy("regno"),
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
            MEMBERS DETAILS
          </h2>
        </div>
        <br></br>
        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th>#</th>
              <th>Photo</th>
              <th style={{ textAlign: "left" }}>Reg no.</th>
              <th style={{ textAlign: "left" }}>Name</th>

              <th style={{ textAlign: "left" }}>Email</th>
              <th style={{ minWidth: "20vh", textAlign: "left" }}>
                Department
              </th>
              <th style={{ minWidth: "20vh", textAlign: "left" }}>
                Department-II
              </th>
              <th style={{ textAlign: "center" }}>Blood</th>
              <th style={{ textAlign: "center" }}>State</th>
              <th style={{ textAlign: "center" }}>Role</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {photos &&
              photos.map((item, index) => (
                <tr>
                  <td style={{ textAlign: "center", width: "5vh" }}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={item.link}
                      alt=""
                      style={{
                        width: "10vh",
                        height: "10vh",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      width: "13vh",
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
                    }}
                  >
                    {item.name}
                  </td>

                  <td
                    style={{
                      textAlign: "left",
                    }}
                  >
                    {item.email}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.department}</td>
                  <td style={{ textAlign: "left" }}>{item.department2}</td>
                  <td style={{ textAlign: "center" }}>
                    <b>{item.blood}</b>
                  </td>
                  <td style={{ textAlign: "center" }}>{item.state}</td>
                  <td style={{ textAlign: "center" }}>
                    <p
                      style={{
                        color: "#000000",
                        fontWeight: "bold",
                        padding: "5px 8px 5px 8px",
                        borderRadius: "5px",
                        backgroundColor: "#cfcfcf",
                      }}
                    >
                      {item.role}
                    </p>
                  </td>
                  <td style={{ textAlign: "center", width: "30px" }}>
                    <div>
                      <span
                        class="ui green center label"
                        style={{
                          display: `${item.status}`,
                        }}
                      >
                        Active
                      </span>
                      <span
                        class="ui red center label"
                        style={{
                          visibility: `${item.status}`,
                        }}
                      >
                        Inactive
                      </span>
                    </div>
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
                      onClick={() => navigate(`/editmember/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
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

export default Members;
