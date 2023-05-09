import React, { useState, useEffect } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { db } from "../../firebase-config";

import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../../GoToTop";
import { addDoc, updateDoc, doc, collection, getDoc } from "firebase/firestore";
import SuccessModal from "../SuccessModal";

const initialState = {
  name: "",
};

const MonthlyRecordEdit = () => {
  const [data, setData] = useState(initialState);
  const {
    name,
    designation,
    may23,
    jun23,
    jul23,
    aug23,
    sept23,
    oct23,
    nov23,
    dec23,
    jan24,
    feb24,
    mar24,
    apr24,

    status,
  } = data;

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSinglePhoto();
  }, [id]);

  const getSinglePhoto = async () => {
    const docRef = doc(db, "MonthlyRecords", id);
    const snapshot = await getDoc(docRef, "MonthlyRecords");
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

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      navigate(-1);
    }, 2000);

    if (!id) {
      try {
        await addDoc(collection(db, "MonthlyRecords"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "MonthlyRecords", id), {
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

  // Disabled after 5th of every month
  const today = new Date();
  const May = today.getMonth() === 5 && today.getDate() > 5;
  const June = today.getMonth() === 6 && today.getDate() > 5;
  const July = today.getMonth() === 7 && today.getDate() > 5;
  const August = today.getMonth() === 8 && today.getDate() > 5;

  // Enable after 1st of every month
  const mayFirst = new Date(today.getFullYear(), 4, 2);
  const MAY = today >= mayFirst;

  const junFirst = new Date(today.getFullYear(), 5, 2);
  const JUNE = today >= junFirst;

  const julFirst = new Date(today.getFullYear(), 6, 2);
  const JULY = today >= julFirst;

  const augFirst = new Date(today.getFullYear(), 7, 2);
  const AUG = today >= augFirst;
  return (
    <>
      <GoToTop />
      <div
        class="container"
        className="container-fluid"
        style={{ marginTop: "12vh" }}
      >
        {" "}
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
                            textTransform: "uppercase",
                          }}
                        >
                          {name}
                        </h3>

                        <p style={{ fontSize: "10px", marginTop: "-14px" }}>
                          <b>ID:</b> {id}
                        </p>

                        <h3
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                          }}
                        >
                          {designation}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card my-2">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <h3
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        Instructions
                      </h3>

                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "-2px",
                          textAlign: "left",
                        }}
                      >
                        <ol>
                          <li>
                            You can add a month's record after the 2nd of the
                            month.
                          </li>
                          <li>
                            The month's record will be disabled after the 5th of
                            the next month.
                          </li>

                          <li>
                            Your record can only be added or updated. Other
                            records are not permitted to be added or updated.
                          </li>
                        </ol>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-9">
                <div class="card mb-3">
                  <div class="card-body">
                    {/* May 2023 start */}

                    <div className="row">
                      <div className="col-lg-2">
                        <h4
                          style={{
                            backgroundColor: "#212A3E",
                            color: "white",
                            maxWidth: "18vh",
                            padding: "7px",
                          }}
                        >
                          May 2023:
                        </h4>
                      </div>
                      <div className="col-lg-10">
                        <Form.TextArea
                          disabled={May}
                          name="may23"
                          readOnly={!MAY}
                          rows="8"
                          minLength="5"
                          placeholder="Report of the month May 2023"
                          onChange={handleChange}
                          value={may23}
                        />
                      </div>
                    </div>

                    {/* May 2023 end */}
                    {/* June 2023 start */}

                    <div className="row my-3">
                      <div className="col-lg-2">
                        <h4
                          style={{
                            backgroundColor: "#212A3E",
                            color: "white",
                            maxWidth: "18vh",
                            padding: "7px",
                          }}
                        >
                          June 2023:
                        </h4>
                      </div>
                      <div className="col-lg-10">
                        <Form.TextArea
                          disabled={June}
                          readOnly={!JUNE}
                          name="jun23"
                          rows="8"
                          placeholder="Report of the month June 2023"
                          onChange={handleChange}
                          value={jun23}
                        />
                      </div>
                    </div>

                    {/* June 2023 end */}

                    {/* July 2023 start */}

                    <div className="row my-3">
                      <div className="col-lg-2">
                        <h4
                          style={{
                            backgroundColor: "#212A3E",
                            color: "white",
                            maxWidth: "18vh",
                            padding: "7px",
                          }}
                        >
                          July 2023:
                        </h4>
                      </div>
                      <div className="col-lg-10">
                        <Form.TextArea
                          disabled={July}
                          readOnly={!JULY}
                          name="jul23"
                          rows="8"
                          placeholder="Report of the month July 2023"
                          onChange={handleChange}
                          value={jul23}
                        />
                      </div>
                    </div>

                    {/* July 2023 end */}

                    {/* August 2023 start */}

                    <div className="row my-3">
                      <div className="col-lg-2">
                        <h4
                          style={{
                            backgroundColor: "#212A3E",
                            color: "white",
                            maxWidth: "18vh",
                            padding: "7px",
                          }}
                        >
                          August 2023:
                        </h4>
                      </div>
                      <div className="col-lg-10">
                        <Form.TextArea
                          disabled={August}
                          readOnly={!AUG}
                          name="aug23"
                          rows="8"
                          placeholder="Report of the month August 2023"
                          onChange={handleChange}
                          value={aug23}
                        />
                      </div>
                    </div>

                    {/* August 2023 end */}
                    <br></br>
                    <br></br>
                    <div className="text-right my-3">
                      <Button
                        color="green"
                        type="submit"
                        size="small"
                        icon
                        style={{ float: "right" }}
                        labelPosition="left"
                      >
                        <Icon name="check" /> Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <br></br> <br></br> <br></br>
        <SuccessModal isOpen={isSubmitted} />
      </div>
    </>
  );
};

export default MonthlyRecordEdit;
