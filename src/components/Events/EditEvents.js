import React, { useState, useEffect } from "react";
import { Loader, Icon, Button, Form } from "semantic-ui-react";
import { db } from "../../firebase-config";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../../GoToTop";
import { addDoc, updateDoc, doc, collection, getDoc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import SuccessModal from "../SuccessModal";

const initialState = {
  name: "",
  regno: "",
  department: "",
  e1: "",
  e2: "",
  e3: "",
  e4: "",
  e5: "",
  e6: "",
  e7: "",
  e8: "",
  e9: "",
  e10: "",
  e11: "",
  e12: "",

  color1: "",
  color2: "",
  color3: "",
  color4: "",
  color5: "",
  color6: "",
  color7: "",
  color8: "",
  color9: "",
  color10: "",
  color11: "",
  color12: "",

  event1: "",
  event2: "",
  event3: "",
  event4: "",
  event5: "",
  event6: "",
  event7: "",
  event8: "",
  event9: "",
  event10: "",
  event11: "",
  event12: "",

  a1: "",
  a2: "",
  a3: "",
  a4: "",
  a5: "",
  a6: "",
  a7: "",
};

const EditEvents = () => {
  const [data, setData] = useState(initialState);
  const {
    name,
    regno,
    department,
    e1,
    e2,
    e3,
    e4,
    e5,
    e6,
    e7,
    e8,
    e9,
    e10,
    e11,
    e12,
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s10,

    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
    color9,
    color10,
    color11,
    color12,

    event1,
    event2,
    event3,
    event4,
    event5,
    event6,
    event7,
    event8,
    event9,
    event10,
    event11,
    event12,
  } = data;
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "OfflineEvents", id);
    const snapshot = await getDoc(docRef, "OfflineEvents");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }

    if (!regno) {
      errors.regno = "Regno. is required";
    }

    if (!department) {
      errors.department = "Department is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      navigate(-1);
    }, 2000);

    if (!id) {
      try {
        await addDoc(collection(db, "OfflineEvents"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "OfflineEvents", id), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {" "}
      <GoToTop />
      <div className="container-fluid" style={{ marginTop: "12vh" }}>
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center my-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png "
                      alt="Admin"
                      style={{
                        width: "120px",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />

                    <div>
                      <h3
                        style={{
                          marginTop: "38px",
                          textTransform: "uppercase",
                        }}
                      >
                        {name}
                      </h3>
                      <p style={{ fontSize: "10px", marginTop: "-14px" }}>
                        <b>ID:</b> {id}
                      </p>
                      <h6>
                        ( <span style={{ color: "red" }}>{regno}</span> )
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-9">
              {" "}
              <Form onSubmit={handleSubmit}>
                <div class="card mb-3">
                  <div class="card-body">
                    <h4
                      style={{
                        backgroundColor: "#212A3E",
                        color: "white",
                        maxWidth: "25vh",
                        padding: "7px",
                      }}
                    >
                      Member Details:
                    </h4>

                    <div className="row">
                      <div className="col-lg-5 my-2">
                        <Form.Input
                          error={errors.name ? { content: errors.name } : null}
                          label="Name"
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>
                      <div className="col-lg-4 my-2">
                        <Form.Input
                          error={
                            errors.regno ? { content: errors.regno } : null
                          }
                          label="Reg no."
                          name="regno"
                          placeholder="Registration number"
                          onChange={handleChange}
                          value={regno}
                        />
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Field
                          error={
                            errors.department
                              ? { content: errors.department }
                              : null
                          }
                          label="Department"
                          style={{ height: "4.8vh" }}
                          name="department"
                          control="select"
                          value={department}
                          onChange={handleChange}
                        >
                          <option value="None">--Select--</option>
                          <option value="Member">Member</option>
                          <option value="Coordinator">Coordinator</option>
                          <option value="Board Member">Board Member</option>
                        </Form.Field>
                      </div>
                    </div>

                    <Form.Input
                      name="id"
                      hidden
                      readOnly="true"
                      placeholder="ID"
                      onChange={handleChange}
                      value={id}
                    />
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-body">
                    <h4
                      style={{
                        backgroundColor: "#212A3E",
                        color: "white",
                        maxWidth: "25vh",
                        padding: "7px",
                      }}
                    >
                      Event Details:
                    </h4>

                    <div className="row">
                      <Table responsive striped bordered hover size="sm">
                        <thead>
                          <tr
                            style={{
                              fontSize: "12px",
                              fontWeight: "normal",
                            }}
                          >
                            <th>#</th>
                            <th style={{ textAlign: "center" }}>
                              <i class="fa fa-eye-slash" aria-hidden="true"></i>
                            </th>
                            <th style={{ textAlign: "left" }}>Event Name</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            <th style={{ textAlign: "center" }}>
                              Confirm Status
                            </th>
                            <th style={{ textAlign: "left" }}>Certificate</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "12px" }}>
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>1</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s1"
                                  value={s1}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                Wellness Drive : Food Distribution
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event1"
                                  control="select"
                                  value={event1}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color1"
                                  control="select"
                                  value={color1}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e1"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e1}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 2nd Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>2</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s2"
                                  value={s2}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                Prabhati - A Dawn of a Vital Outlook
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event2"
                                  control="select"
                                  value={event2}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color2"
                                  control="select"
                                  value={color2}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e2"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e2}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 3rd Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>3</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s3"
                                  value={s3}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                Swachh Prayaakh : A Cleanliness Drive
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event3"
                                  control="select"
                                  value={event3}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color3"
                                  control="select"
                                  value={color3}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e3"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e3}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 4th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>4</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s4"
                                  value={s4}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                Swachh Prayaakh : A Cleanliness Drive 2.0
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event4"
                                  control="select"
                                  value={event4}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color4"
                                  control="select"
                                  value={color4}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e4"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e4}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 5th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>5</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s5"
                                  value={s5}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                Hepah : From Welfare to Well-being
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event5"
                                  control="select"
                                  value={event5}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color5"
                                  control="select"
                                  value={color5}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e5"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e5}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 6th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>6</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s6"
                                  value={s6}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                NE Convene'23
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event6"
                                  control="select"
                                  value={event6}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color6"
                                  control="select"
                                  value={color6}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e6"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e6}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 7th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>7</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s7"
                                  value={s7}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                Donation Drive: Project Jivanam
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event7"
                                  control="select"
                                  value={event7}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color7"
                                  control="select"
                                  value={color7}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e7"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e7}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 8th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>8</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s8"
                                  value={s8}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>MH Workshop</th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event8"
                                  control="select"
                                  value={event8}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color8"
                                  control="select"
                                  value={color8}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e8"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e8}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 9th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>9</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s9"
                                  value={s9}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>Event9</th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event9"
                                  control="select"
                                  value={event9}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color9"
                                  control="select"
                                  value={color9}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e9"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e9}
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 10th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>10</th>
                            </td>
                            <td style={{ textAlign: "center", width: "5vh" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.4vh", width: "80px" }}
                                  name="s10"
                                  value={s10}
                                  control="select"
                                  onChange={handleChange}
                                >
                                  <option value="none ">--</option>
                                  <option value="none">Hide</option>
                                  <option value="Show">Show</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>Event10</th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="event10"
                                  control="select"
                                  value={event10}
                                  onChange={handleChange}
                                >
                                  <option value="--">--Select--</option>

                                  <option value="Not Registered">
                                    Not Registered
                                  </option>
                                  <option value="Registered">Registered</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Field
                                  style={{ height: "4.8vh" }}
                                  name="color10"
                                  control="select"
                                  value={color10}
                                  onChange={handleChange}
                                >
                                  <option value=" ">--Select--</option>

                                  <option value="">Not Registered</option>
                                  <option value="green">Registered</option>
                                  <option value="green ">Present</option>
                                  <option value="red">Absent</option>
                                </Form.Field>
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="e10"
                                  placeholder="Certicifate"
                                  onChange={handleChange}
                                  value={e10}
                                />
                              </th>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div className="row"></div>
                    <Form.Input
                      name="id"
                      hidden
                      readOnly="true"
                      placeholder="ID"
                      onChange={handleChange}
                      value={id}
                    />
                    <br></br>

                    <Button
                      style={{ float: "right" }}
                      color="green"
                      type="submit"
                      size="small"
                      icon
                      labelPosition="left"
                    >
                      <Icon name="check" /> Update
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <SuccessModal isOpen={isSubmitted} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default EditEvents;
