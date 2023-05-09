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
  college: "",
  department: "",
  status: "",
};

const EditRecruit = () => {
  const [data, setData] = useState(initialState);
  const { name, email, phone, whatsapp, college, department, status } = data;
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "Recruitment", id);
    const snapshot = await getDoc(docRef, "Recruitment");
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
        await addDoc(collection(db, "Recruitment"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "Recruitment", id), {
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
        style={{ marginTop: "12vh", maxWidth: "150vh" }}
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
                          readOnly={true}
                          label="Name"
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          readOnly={true}
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
                          readOnly={true}
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
                          readOnly={true}
                          placeholder="Whatsapp no."
                          onChange={handleChange}
                          value={whatsapp}
                        />
                      </div>

                      <div className="col-lg-6 my-2">
                        <Form.Input
                          label="College"
                          name="college"
                          readOnly={true}
                          placeholder="College"
                          onChange={handleChange}
                          value={college}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 my-2">
                        <Form.Field
                          label="Department"
                          style={{ height: "4.8vh" }}
                          name="department"
                          control="select"
                          value={department}
                          onChange={handleChange}
                        >
                          <option value="None">--Select--</option>
                          <option value="Editorial Department">
                            Editorial Department
                          </option>
                          <option value="Curation Department">
                            Curation Department
                          </option>
                          <option value="PR Department">PR Department</option>
                          <option value="Events Department">
                            Events Department
                          </option>
                          <option value="Marketing Department">
                            Marketing Department
                          </option>
                          <option value="Design & Media Department">
                            Design & Media Department
                          </option>
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
                          <option value="Pending">Pending</option>

                          <option value="Test Conducted">Test Conducted</option>
                          <option value="Rejected">Reject</option>
                          <option value="Approved">Approve</option>
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

export default EditRecruit;
