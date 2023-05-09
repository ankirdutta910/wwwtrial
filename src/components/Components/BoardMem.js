import React, { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

function BoardMem() {
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("admins").orderBy("no"),
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

  // if (isLoading) {
  //   return <div class="ui active centered inline loader"></div>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div className="container-fluid my-2">
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {photos &&
            photos.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    style={{ width: "9vh", height: "10vh", objectFit: "cover" }}
                    src={item.photo}
                  />
                </td>
                <td>
                  <h4>{item.name}</h4>
                  <p>{item.dept}</p>
                </td>
                <td>
                  <Button
                    style={{ marginTop: "2px" }}
                    size="small"
                    onClick={() => navigate(`/edit_board/${item.id}`)}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BoardMem;
