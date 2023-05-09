import React, { useState, useEffect } from "react";
import { Icon, Button, Form } from "semantic-ui-react";
import { db } from "../../firebase-config";

import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../../GoToTop";
import { addDoc, updateDoc, doc, collection, getDoc } from "firebase/firestore";
import SuccessModal from "../SuccessModal";

const initialState = {
  no: "",
  name: "",
  dept: "",
  photo: "",
  insta: "",
  fb: "",
  status: "",
};

const BoardEdit = () => {
  const [data, setData] = useState(initialState);
  const { name, dept, insta, photo, fb, no, status } = data;

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "admins", id);
    const snapshot = await getDoc(docRef, "admins");
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
    if (!no) {
      errors.no = "Number is required";
    }

    if (!dept) {
      errors.dept = "Position is required";
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
        await addDoc(collection(db, "admins"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "admins", id), {
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
                      <div class="mt-3">
                        <h3
                          style={{
                            marginTop: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          {name}
                        </h3>
                        <p
                          style={{
                            marginTop: "-5px",
                            textTransform: "uppercase",
                          }}
                        >
                          {dept}
                        </p>
                        <p style={{ fontSize: "10px", marginTop: "-2px" }}>
                          <b>ID:</b> {id}
                        </p>

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
                          {status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="card mb-3">
                  <div class="card-body">
                    <h4
                      style={{
                        backgroundColor: "#212A3E",
                        color: "white",
                        maxWidth: "15vh",
                        padding: "7px",
                      }}
                    >
                      Details:
                    </h4>
                    <br></br>
                    <div className="row">
                      <div className="col-lg-2">
                        <Form.Input
                          error={errors.no ? { content: errors.no } : null}
                          label="No."
                          name="no"
                          placeholder="No."
                          onChange={handleChange}
                          value={no}
                        />
                      </div>
                      <div className="col-lg-5">
                        <Form.Input
                          error={errors.name ? { content: errors.name } : null}
                          label="Name"
                          name="name"
                          placeholder="Enter Board member name"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>

                      <div className="col-lg-5">
                        <Form.Input
                          error={errors.dept ? { content: errors.dept } : null}
                          label="Board Position"
                          name="dept"
                          placeholder="Enter Board position"
                          onChange={handleChange}
                          value={dept}
                        />
                      </div>
                    </div>
                    <br></br>

                    <Form.Input
                      label="Board Photo"
                      name="photo"
                      placeholder="Enter link"
                      onChange={handleChange}
                      value={photo}
                    />

                    <Form.Input
                      label="Instagram"
                      name="insta"
                      placeholder="Instagram link"
                      onChange={handleChange}
                      value={insta}
                    />

                    <Form.Input
                      label="Facebook"
                      name="fb"
                      placeholder="Facebook link"
                      onChange={handleChange}
                      value={fb}
                    />

                    <div className="content"></div>

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
                    <div className="row">
                      <div className="col-lg-7"></div>

                      <div className="col-lg-2">
                        <Button
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
                {/* </>
                )} */}
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

export default BoardEdit;
