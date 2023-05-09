import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot, deleteDoc, doc } from "firebase/firestore";

import { Table } from "react-bootstrap";
import GoToTop from "../../GoToTop";

function BoardRecruit() {
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("BoardRecruitTest").orderBy("date"),
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
  //       await deleteDoc(doc(db, "BoardRecruitTest", id));
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
            RECRUITMENT
          </h2>
        </div>
        <br></br>
        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th style={{ textAlign: "center" }}>#</th>

              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
              <th style={{ textAlign: "left" }}>Current Location</th>
              <th style={{ textAlign: "left" }}>Relocating</th>

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
                  <td style={{ textAlign: "left" }}>{item.location}</td>
                  <td style={{ textAlign: "left" }}>{item.location2}</td>

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
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() =>
                        navigate(`/edit_board_recruitment/${item.id}`)
                      }
                    >
                      <i class="fa fa-eye" aria-hidden="true"></i>
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

export default BoardRecruit;
