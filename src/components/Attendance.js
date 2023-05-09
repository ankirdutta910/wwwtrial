import React, { useState } from "react";
import { Button, Icon, Form } from "semantic-ui-react";

import GoToTop from "../GoToTop";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase-config";
import { Table } from "react-bootstrap";

function Attendance() {
  const [students, loading, error] = useCollectionData(
    db.collection("attendance").orderBy("regno")
  );

  const [updatedStudents, setUpdatedStudents] = useState([]);

  const handleChange = (event, student) => {
    const { value } = event.target;

    setUpdatedStudents((prevStudents) => [
      ...prevStudents.filter((s) => s.id !== student.id),
      { ...student, AAper: value },
    ]);
  };

  const handleSave = () => {
    updatedStudents.forEach((student) => {
      db.collection("attendance").doc(student.id).update({
        AAper: student.AAper,
      });
    });
    alert("Attendance posted successfully");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {" "}
      <GoToTop />
      <div className="container-fluid" style={{ marginTop: "12vh" }}>
        <h2
          style={{
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
            color: "#212A3E",
          }}
        >
          ATTENDANCE %
        </h2>

        {/* Table */}

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "12px", fontWeight: "normal" }}>
              <th>#</th>
              <th style={{ textAlign: "left" }}>Reg no.</th>
              <th style={{ textAlign: "left" }}>Name</th>

              <th style={{ textAlign: "center" }}>Percentage</th>
              <th style={{ textAlign: "center" }}>Updated_Percentage</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {students.map((student, index) => (
              <tr key={student.id} style={{ display: `${student.status}` }}>
                <td style={{ textAlign: "center", width: "8vh" }}>
                  {index + 1}
                </td>
                <td style={{ width: "20vh", textAlign: "left" }}>
                  {student.regno}
                </td>
                <td style={{ textAlign: "left" }}>{student.name}</td>

                <td style={{ width: "19vh", minWidth: "15vh" }}>
                  <Form.Input
                    style={{
                      maxWidth: "12vh",
                    }}
                    disabled={student.disabled}
                    value={
                      updatedStudents.find((s) => s.id === student.id)?.AAper ??
                      student.AAper
                    }
                    onChange={(event) => handleChange(event, student)}
                  />
                </td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "800",
                    color: `${student.status}`,
                  }}
                >
                  {student.AAper}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br></br>
        <br></br>
        <div className="text-center">
          <Button
            icon
            labelPosition="left"
            size="small"
            color="orange"
            onClick={handleSave}
          >
            {" "}
            <Icon name="check" /> Post Attendance
          </Button>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}
export default Attendance;
