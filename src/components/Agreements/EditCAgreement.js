import React, { useState, useEffect } from "react";
import { Loader, Icon, Button, Form } from "semantic-ui-react";
import { db } from "../../firebase-config";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../../GoToTop";
import { addDoc, updateDoc, doc, collection, getDoc } from "firebase/firestore";

const initialState = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  altno: "",
  college: "",
  blood: "",
  date: "",
  status: "",
  color: "",
};

const EditCAgreement = () => {
  const [data, setData] = useState(initialState);
  const {
    name,
    email,
    phone,
    whatsapp,
    altno,
    college,
    blood,
    date,
    status,
    color,
  } = data;
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "CoordinatorsAgreement", id);
    const snapshot = await getDoc(docRef, "CoordinatorsAgreement");
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

    if (!status) {
      errors.status = "Status is required";
    }

    if (!color) {
      errors.color = "Confirm Status is required";
    }

    if (!date) {
      errors.date = "Date is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "CoordinatorsAgreement"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "CoordinatorsAgreement", id), {
          ...data,
          id,
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate(-1);
  };

  return (
    <>
      {" "}
      <GoToTop />
      <div
        className="container-fluid"
        style={{ marginTop: "10vh", maxWidth: "150vh" }}
      >
        <div
          className="card"
          style={{ backgroundColor: "white", padding: "15px" }}
        >
          <h2 style={{ color: "#212A3E" }}>
            {id ? "UPDATE" : "ADD"} AGREEMENT DETAILS
          </h2>
          <hr></hr>
          <div className="row">
            <div className="col-lg">
              {isSubmit ? (
                <Loader active inline="centered" size="huge" />
              ) : (
                <>
                  <Form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 my-2">
                        <Form.Input
                          error={errors.ename ? { content: errors.name } : null}
                          label="Name"
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          label="Email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          value={email}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 my-2">
                        <Form.Input
                          label="Contact"
                          name="phone"
                          placeholder="Contact no."
                          onChange={handleChange}
                          value={phone}
                        />
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Input
                          label="Whatsapp"
                          name="whatsapp"
                          placeholder="Whatsapp no."
                          onChange={handleChange}
                          value={whatsapp}
                        />
                      </div>

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          label="Alternate no."
                          name="altno"
                          placeholder="Alternate contact details"
                          onChange={handleChange}
                          value={altno}
                        />
                      </div>

                      <div className="col-lg-9 my-2">
                        <Form.Input
                          label="College"
                          name="college"
                          placeholder="College"
                          onChange={handleChange}
                          value={college}
                        />
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Input
                          label="Blood"
                          name="blood"
                          placeholder="Blood"
                          onChange={handleChange}
                          value={blood}
                        />
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Input
                          error={errors.date ? { content: errors.date } : null}
                          label="Joining Date"
                          name="date"
                          type="date"
                          placeholder="Joining Date"
                          onChange={handleChange}
                          value={date}
                        />
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Field
                          error={
                            errors.status ? { content: errors.status } : null
                          }
                          label="Status"
                          style={{ height: "5vh" }}
                          name="status"
                          control="select"
                          value={status}
                          onChange={handleChange}
                        >
                          <option>Select status</option>

                          <option value="Approved">Approve</option>
                          <option value="Rejected">Reject</option>
                          <option value="Resigned">Resigned</option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-3 my-2">
                        <Form.Field
                          error={
                            errors.color ? { content: errors.color } : null
                          }
                          label="Confirm Status"
                          style={{ height: "5vh" }}
                          name="color"
                          control="select"
                          value={color}
                          onChange={handleChange}
                        >
                          <option>Select status</option>

                          <option value="green">Approve</option>
                          <option value="orange">Reject</option>
                          <option value="red ">Resigned</option>
                        </Form.Field>
                      </div>
                    </div>

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
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default EditCAgreement;
