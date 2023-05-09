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

  status: "",
};

const EditRecruitBoard = () => {
  const [data, setData] = useState(initialState);
  const { name, location, location2, q1, q2, q3, q4, q5, status } = data;
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "BoardRecruitTest", id);
    const snapshot = await getDoc(docRef, "BoardRecruitTest");
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
        await addDoc(collection(db, "BoardRecruitTest"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "BoardRecruitTest", id), {
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
                        <p style={{ fontSize: "10px", marginTop: "-14px" }}>
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
                      Answers:
                    </h4>
                    <br></br>
                    <div className="content">
                      <h5>
                        1. Perform a SWOT analysis for yourself. What are the
                        traits unique to you?
                      </h5>
                      <b>
                        <i>Answer:</i>
                      </b>{" "}
                      {q1} <br></br> <br></br>
                      <h5>
                        2. How was your Wake With Wellness journey so far? Talk
                        about your contributions to the same.
                      </h5>
                      <b>
                        <i>Answer:</i>
                      </b>{" "}
                      {q2}
                      <br></br> <br></br>
                      <h5>
                        3. According to you, what are the shortcomings of the
                        current board?
                      </h5>
                      <b>
                        <i>Answer:</i>
                      </b>{" "}
                      {q3} <br></br> <br></br>
                      <h5>
                        4. How would you plan on improving the working of the
                        department you wish to head?
                      </h5>
                      <b>
                        <i>Answer:</i>
                      </b>{" "}
                      {q4} <br></br> <br></br>
                      <h5>
                        5. How would you promote and navigate more offline
                        events and campaigns?
                      </h5>
                      <b>
                        <i>Answer:</i>
                      </b>{" "}
                      {q5}
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
                    <div className="row">
                      <div className="col-lg-7"></div>
                      <div className="col-lg-3">
                        <Form.Field
                          style={{ height: "4.3vh" }}
                          name="status"
                          control="select"
                          value={status}
                          onChange={handleChange}
                        >
                          <option value=" ">Status</option>
                          <option value="Approved">Approve</option>
                          <option value="Rejected">Reject</option>

                          <option value="Appointed">Appoint</option>
                        </Form.Field>
                      </div>
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

export default EditRecruitBoard;
