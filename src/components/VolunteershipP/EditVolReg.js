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

  exp: "",
  work: "",
  state: "",
  home: "",
  status: "",
};

const EditVolReg = () => {
  const [data, setData] = useState(initialState);
  const {
    name,

    email,
    phone,
    whatsapp,

    exp,
    work,
    state,
    home,
    status,
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
    const docRef = doc(db, "VolunteerShip", id);
    const snapshot = await getDoc(docRef, "VolunteerShip");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "VolunteerShip"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "VolunteerShip", id), {
          ...data,
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
          <h2 style={{ color: "#212A3E" }}>{id ? "UPDATE" : "ADD"} DETAILS</h2>
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
                          label="Experience"
                          name="exp"
                          placeholder="Experience"
                          onChange={handleChange}
                          value={exp}
                        />
                      </div>

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          label="Workplace"
                          name="work"
                          placeholder="Work"
                          onChange={handleChange}
                          value={work}
                        />
                      </div>
                      <div className="col-lg-3 my-2">
                        <Form.Input
                          label="Homeplace"
                          name="home"
                          placeholder="Hometown"
                          onChange={handleChange}
                          value={home}
                        />
                      </div>
                      <div className="col-lg-3 my-2">
                        <Form.Input
                          label="State"
                          name="state"
                          placeholder="State"
                          onChange={handleChange}
                          value={state}
                        />
                      </div>
                    </div>

                    <div className="row">
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
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approve</option>
                          <option value="Rejected">Reject</option>
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

export default EditVolReg;
