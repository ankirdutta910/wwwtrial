import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot, deleteDoc, doc } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function Recruitment() {
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("Recruitment").orderBy("date", "desc"),
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(db, "Recruitment", id));
        setPhotos(photos.filter((photo) => photo.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };
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
            RECRUITMENT
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
              <th style={{ textAlign: "left" }}>Department</th>
              <th style={{ textAlign: "left" }}>College</th>
              <th style={{ textAlign: "center" }}>Agreement</th>
              <th style={{ textAlign: "center" }}>Posted on</th>
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
                      minWidth: "25vh",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </td>

                  <td style={{ textAlign: "left" }}>{item.email}</td>
                  <td style={{ textAlign: "left" }}>{item.phone}</td>
                  <td style={{ textAlign: "left" }}>{item.whatsapp}</td>

                  <td style={{ textAlign: "left" }}>{item.department}</td>
                  <td style={{ textAlign: "left" }}>{item.college}</td>

                  <td style={{ textAlign: "center" }}>{item.agree}</td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.date} {item.time}{" "}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.status}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "17vh",
                    }}
                  >
                    <Button
                      color="red"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                    <Button
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => navigate(`/editRecruit/${item.id}`)}
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

export default Recruitment;
