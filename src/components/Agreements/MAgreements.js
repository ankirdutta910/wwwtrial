import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot, deleteDoc, doc } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function MAgreements() {
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("MembersAgreement").orderBy("date", "desc"),
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

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete?")) {
  //     try {
  //       setOpen(false);
  //       await deleteDoc(doc(db, "MembersAgreement", id));
  //       setPhotos(photos.filter((photo) => photo.id !== id));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
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
            MEMBER'S AGREEMENTS
          </h2>
        </div>
        <br></br>
        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th>#</th>

              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
              <th style={{ textAlign: "left" }}>Contact</th>
              <th style={{ textAlign: "left" }}>Whatsapp</th>
              <th style={{ textAlign: "left" }}>Alternate no.</th>
              <th style={{ textAlign: "left" }}>Department_I</th>
              <th style={{ textAlign: "left" }}>Department_II</th>
              <th style={{ textAlign: "center" }}>Workplace</th>
              <th style={{ textAlign: "center" }}>Agreement</th>
              <th style={{ textAlign: "center" }}>Date</th>
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

                  <td
                    style={{
                      textAlign: "left",
                      minWidth: "20vh",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </td>

                  <td style={{ textAlign: "left" }}>{item.email}</td>
                  <td style={{ textAlign: "left" }}>{item.phone}</td>
                  <td style={{ textAlign: "left" }}>{item.whatsapp}</td>

                  <td style={{ textAlign: "left" }}>{item.altno}</td>
                  <td style={{ textAlign: "left" }}>{item.department}</td>
                  <td style={{ textAlign: "left" }}>{item.department2}</td>
                  <td style={{ textAlign: "left" }}>{item.college}</td>

                  <td style={{ textAlign: "center" }}>{item.agree}</td>
                  <td style={{ textAlign: "center", minWidth: "10vh" }}>
                    {item.date}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: `${item.color}`,
                    }}
                  >
                    {item.status}
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
                      onClick={() => navigate(`/edit_m_Agreements/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>

                    {/* <Button
                      color="red"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button> */}
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

export default MAgreements;
