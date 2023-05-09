import React, { useState, useEffect } from "react";
import { Loader, Icon, Button, Form } from "semantic-ui-react";
import { db } from "../../firebase-config";
import { Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../../GoToTop";
import { addDoc, updateDoc, doc, collection, getDoc } from "firebase/firestore";
import SuccessModal from "../SuccessModal";

const initialState = {
  name: "",
  regno: "",
  email: "",
  phone: "",
  whatsapp: "",
  department: "",
  department2: "",
  college: "",
  exp: "",
  blood: "",
  gender: "",
  address: "",
  pincode: "",
  state: "",
  role: "",
  color: "",
  status: "",
  ccolor: "",
  i1: "",
  i2: "",
  i3: "",
  i4: "",
  i5: "",
  i6: "",
  i7: "",
  p1: "",
  p2: "",
  p3: "",
  p4: "",
  p5: "",
  p6: "",
  p7: "",
  a1: "",
  a2: "",
  a3: "",
  a4: "",
  a5: "",
  a6: "",
  a7: "",
};

const EditCoordinator = () => {
  const [data, setData] = useState(initialState);
  const {
    name,
    link,
    regno,
    email,
    phone,
    whatsapp,

    college,
    exp,
    blood,
    gender,
    address,
    pincode,
    state,
    role,

    ccolor,
    status,
    certificate,
    agreement,
    idcard,
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
    i1,
    i2,
    i3,
    i4,
    i5,
    i6,
    i7,
    i8,
    i9,
    i10,
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d9,
    d10,
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
    const docRef = doc(db, "Coordinators", id);
    const snapshot = await getDoc(docRef, "Coordinators");
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

    if (!email) {
      errors.email = "Email is required";
    }

    if (!status) {
      errors.status = "Status is required";
    }

    if (!gender) {
      errors.gender = "Gender is required";
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
        await addDoc(collection(db, "Coordinators"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "Coordinators", id), {
          ...data,
          id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleClose = () => {
  //   setIsSubmitted(false);
  // };

  return (
    <>
      <GoToTop />
      <div
        class="container"
        className="container-fluid"
        style={{ marginTop: "12vh" }}
      >
        <Form onSubmit={handleSubmit}>
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img
                        src={link}
                        alt="Admin"
                        style={{
                          width: "120px",
                          height: "130px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />

                      <div class="mt-3">
                        <div style={{ marginTop: "-28px" }}>
                          <span
                            class="ui red center label"
                            style={{
                              visibility: `${status}`,
                              position: "absolute",
                              marginLeft: "-33px",
                            }}
                          >
                            Inactive
                          </span>
                          <span
                            class="ui green center label"
                            style={{
                              display: `${status}`,
                              position: "absolute",
                              marginLeft: "-28px",
                            }}
                          >
                            Active
                          </span>
                        </div>
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
                        <p
                          style={{
                            color: "#000000",
                            fontWeight: "bold",
                            marginTop: "15px",
                            padding: "5px 1px 5px 1px",
                            borderRadius: "5px",
                            backgroundColor: "#e3e3e3",
                          }}
                        >
                          {role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card my-3">
                  <Table responsive striped bordered hover size="sm">
                    <thead>
                      <tr
                        style={{
                          fontSize: "12px",
                          fontWeight: "normal",
                        }}
                      >
                        <th style={{ textAlign: "left" }}>Document</th>
                        <th style={{ textAlign: "left" }}>Update</th>

                        <th style={{ textAlign: "center" }}></th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                      <tr>
                        <td>Agreement</td>
                        <td>
                          <Form.Input
                            name="agreement"
                            value={agreement}
                            placeholder="Paste link here"
                          />
                        </td>
                        <td style={{ textAlign: "center", width: "50px" }}>
                          <a href={agreement} target="_blank">
                            <i class="fa fa-download"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>ID Card</td>
                        <td>
                          {" "}
                          <Form.Input
                            name="idcard"
                            value={idcard}
                            placeholder="Paste link here"
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <a href={idcard} target="_blank">
                            <i class="fa fa-download"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Certificate</td>
                        <td>
                          {" "}
                          <Form.Input
                            name="certificate"
                            value={certificate}
                            placeholder="Paste link here"
                          />
                        </td>
                        <td style={{ textAlign: "center", width: "30px" }}>
                          <a href={certificate} target="_blank">
                            <i class="fa fa-download"></i>
                          </a>
                        </td>
                      </tr>
                      <td></td>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div class="col-md-9">
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
                      Personal Details:
                    </h4>

                    <div className="row">
                      <div className="col-lg-4 my-2">
                        <Form.Input
                          error={errors.name ? { content: errors.name } : null}
                          label="Name"
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
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

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          error={
                            errors.email ? { content: errors.email } : null
                          }
                          label="Email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          value={email}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="Contact"
                          name="phone"
                          placeholder="Contact no."
                          onChange={handleChange}
                          value={phone}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="Whatsapp"
                          name="whatsapp"
                          placeholder="Whatsapp no."
                          onChange={handleChange}
                          value={whatsapp}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="Blood group"
                          style={{ height: "4.8vh" }}
                          name="blood"
                          control="select"
                          value={blood}
                          onChange={handleChange}
                        >
                          <option value="-">--</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>

                          <option value="B+">B+</option>
                          <option value="B-">B-</option>

                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>

                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          label="College"
                          name="college"
                          placeholder="College"
                          onChange={handleChange}
                          value={college}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          error={
                            errors.gender ? { content: errors.gender } : null
                          }
                          label="Gender"
                          style={{ height: "4.8vh" }}
                          name="gender"
                          control="select"
                          value={gender}
                          onChange={handleChange}
                        >
                          <option>Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>

                          <option value="Trans">Trans</option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="Pincode"
                          name="pincode"
                          placeholder="Pincode"
                          onChange={handleChange}
                          value={pincode}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="State"
                          style={{ height: "4.8vh" }}
                          name="state"
                          control="select"
                          value={state}
                          onChange={handleChange}
                        >
                          <option value=" ">--Select--</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>

                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </Form.Field>
                      </div>

                      <div className="col-lg my-2">
                        <Form.TextArea
                          label="Address"
                          name="address"
                          placeholder="Address"
                          onChange={handleChange}
                          value={address}
                        />
                      </div>
                    </div>

                    <h4
                      style={{
                        backgroundColor: "#212A3E",
                        color: "white",
                        maxWidth: "25vh",
                        padding: "7px",
                        marginTop: "3vh",
                      }}
                    >
                      Professional Details:
                    </h4>

                    <div className="row">
                      <div className="col-lg-6 my-2">
                        <Form.TextArea
                          label="Experience"
                          name="exp"
                          placeholder="Experience"
                          onChange={handleChange}
                          value={exp}
                        />
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Field
                          label="Role"
                          style={{ height: "4.8vh" }}
                          name="role"
                          control="select"
                          value={role}
                          onChange={handleChange}
                        >
                          <option value="Coordinator">Coordinator</option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Field
                          label="Status"
                          style={{ height: "4.8vh" }}
                          name="status"
                          control="select"
                          value={status}
                          onChange={handleChange}
                        >
                          <option>Select status</option>
                          <option value="hidden">Active</option>
                          <option value="none">Inactive</option>
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
                      Payment Details:
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

                            <th style={{ textAlign: "left" }}>
                              Receipt Number
                            </th>
                            <th style={{ textAlign: "left" }}>Purpose</th>
                            <th style={{ textAlign: "left" }}>
                              Transaction Date
                            </th>
                            <th style={{ textAlign: "left" }}>Amount</th>
                            <th style={{ textAlign: "left" }}>Refund Date</th>
                            <th style={{ textAlign: "left" }}>Refund Amount</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "12px" }}>
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>1</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i1"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i1}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p1"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p1}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d1"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d1}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a1"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a1}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 2nd Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>2</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i2"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i2}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p2"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p2}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d2"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d2}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a2"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a2}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 3rd Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>3</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i3"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i3}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p3"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p3}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d3"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d3}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a3"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a3}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 4th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>4</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i4"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i4}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p4"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p4}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d4"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d4}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a4"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a4}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 5th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>5</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i5"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i5}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p5"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p5}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d5"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d5}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a5"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a5}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 6th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>6</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i6"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i6}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p6"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p6}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d6"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d6}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a6"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a6}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 7th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>7</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i7"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i7}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p7"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p7}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d7"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d7}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a7"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a7}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 8th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>8</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i8"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i8}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p8"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p8}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d8"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d8}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a8"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a8}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 9th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>9</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i9"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i9}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p9"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p9}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d9"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d9}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a9"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a9}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>

                          {/* 10th Line */}
                          <tr>
                            <td style={{ textAlign: "center", width: "3vh" }}>
                              <th style={{ textAlign: "left" }}>10</th>
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="i10"
                                  placeholder="Invoice"
                                  onChange={handleChange}
                                  value={i10}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "left" }}>
                                <Form.Input
                                  name="p10"
                                  placeholder="Purpose"
                                  onChange={handleChange}
                                  value={p10}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="d10"
                                  placeholder="Date"
                                  onChange={handleChange}
                                  value={d10}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  name="a10"
                                  type="number"
                                  placeholder="Amount"
                                  onChange={handleChange}
                                  value={a10}
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="date"
                                  placeholder="Refund Date"
                                />
                              </th>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <th style={{ textAlign: "center" }}>
                                <Form.Input
                                  type="number"
                                  placeholder="Refund Amount"
                                />
                              </th>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div className="row"></div>

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
              </div>
            </div>
          </div>
          <br></br> <br></br> <br></br>
        </Form>

        <SuccessModal isOpen={isSubmitted} />
      </div>
    </>
  );
};

export default EditCoordinator;
