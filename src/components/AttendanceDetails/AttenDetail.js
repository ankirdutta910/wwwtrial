import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function AttenDetail() {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("attendance").orderBy("regno"),
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
            MEMBERS ATTENDANCE
          </h2>
        </div>
        <br></br>
        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th style={{ textAlign: "center" }}>#</th>

              <th style={{ textAlign: "left" }}>Reg No.</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "center" }}>Action</th>
              <th style={{ textAlign: "center" }}>Percentage</th>
              <th style={{ textAlign: "center" }}>Jan1</th>
              <th style={{ textAlign: "center" }}>Jan2</th>

              <th style={{ textAlign: "center" }}>Feb1</th>
              <th style={{ textAlign: "center" }}>Feb2</th>
              <th style={{ textAlign: "center" }}>Mar1</th>
              <th style={{ textAlign: "center" }}>Mar2</th>
              <th style={{ textAlign: "center" }}>Apr1</th>
              <th style={{ textAlign: "center" }}>Apr2</th>
              <th style={{ textAlign: "center" }}>May1</th>
              <th style={{ textAlign: "center" }}>May2</th>
              <th style={{ textAlign: "center" }}>Jun1</th>
              <th style={{ textAlign: "center" }}>Jun2</th>
              <th style={{ textAlign: "center" }}>Jul1</th>
              <th style={{ textAlign: "center" }}>Jul2</th>
              <th style={{ textAlign: "center" }}>Aug1</th>
              <th style={{ textAlign: "center" }}>Aug2</th>
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
                      textAlign: "left",
                      textTransform: "uppercase",
                      width: "13vh",
                    }}
                  >
                    {item.regno}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      width: "32vh",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </td>

                  <td style={{ textAlign: "center", width: "10vh" }}>
                    <Button
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => navigate(`/editatten_detail/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      color: `${item.status}`,
                      fontWeight: "bold",
                      width: "15vh",
                    }}
                  >
                    {item.AAper}
                  </td>

                  <td style={{ textAlign: "left" }}>{item.Jan23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Jan23bf}</td>

                  <td style={{ textAlign: "left" }}>{item.Feb23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Feb23bf}</td>
                  <td style={{ textAlign: "left" }}>{item.Mar23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Mar23bf}</td>
                  <td style={{ textAlign: "left" }}>{item.Apr23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Apr23bf}</td>
                  <td style={{ textAlign: "left" }}>{item.May23af}</td>
                  <td style={{ textAlign: "left" }}>{item.May23bf}</td>
                  <td style={{ textAlign: "left" }}>{item.Jun23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Jun23bf}</td>
                  <td style={{ textAlign: "left" }}>{item.Jul23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Jul23bf}</td>
                  <td style={{ textAlign: "left" }}>{item.Aug23af}</td>
                  <td style={{ textAlign: "left" }}>{item.Aug23bf}</td>
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

export default AttenDetail;
