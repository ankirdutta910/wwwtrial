import React, { useState, useEffect } from "react";
import { Loader, Icon, Button, Form } from "semantic-ui-react";
import { db } from "../../firebase-config";
import { useParams, useNavigate } from "react-router-dom";
import GoToTop from "../../GoToTop";
import { addDoc, updateDoc, doc, collection, getDoc } from "firebase/firestore";

const initialState = {
  name: "",
  regno: "",
  status: "",
  AAper: "",
  disabled: "",
  Jan23b: "",
  Feb23a: "",
  Feb23b: "",
  Mar23a: "",
  Mar23b: "",
  Apr23a: "",
  Apr23b: "",
  May23a: "",
  May23b: "",
  Jun23a: "",
  Jun23b: "",
  Jul23a: "",
  Jul23b: "",
  Aug23a: "",
  Aug23b: "",
};

const EditAtten = () => {
  const [data, setData] = useState(initialState);
  const {
    name,
    regno,
    status,
    AAper,
    disabled,
    Jan23a,
    Jan23b,
    Feb23a,
    Feb23b,
    Mar23a,
    Mar23b,
    Apr23a,
    Apr23b,
    May23a,
    May23b,
    Jun23a,
    Jun23b,
    Jul23a,
    Jul23b,
    Aug23a,
    Aug23b,
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
    const docRef = doc(db, "attendance", id);
    const snapshot = await getDoc(docRef, "attendance");
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

    if (!status) {
      errors.status = "Status. is required";
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
        await addDoc(collection(db, "attendance"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "attendance", id), {
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
        style={{ marginTop: "15vh", maxWidth: "150vh" }}
      >
        <div
          className="card"
          style={{ backgroundColor: "white", padding: "15px" }}
        >
          <h2 style={{ color: "#212A3E" }}>
            {id ? "UPDATE" : "ADD"} ATTENDANCE
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
                      <div className="col-lg-4 my-2">
                        <Form.Input
                          error={errors.ename ? { content: errors.name } : null}
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

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="Status"
                          style={{ height: "4.8vh" }}
                          name="status"
                          control="select"
                          value={status}
                          onChange={handleChange}
                        >
                          <option>Select Status</option>
                          <option style={{ color: "#198754" }} value="#198754">
                            Active
                          </option>
                          <option style={{ color: "orange" }} value="orange">
                            Debarred
                          </option>
                          <option style={{ color: "red" }} value="red">
                            Blocked
                          </option>
                          <option style={{ color: "#198754" }} value="#198754">
                            Promoted
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="Blocked"
                          style={{ height: "4.8vh" }}
                          name="disabled"
                          control="select"
                          value={disabled}
                          onChange={handleChange}
                        >
                          <option>Select Status</option>
                          <option value="false">Unblock</option>
                          <option value="true">Blocked</option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          error={
                            errors.regno ? { content: errors.regno } : null
                          }
                          label="Percentage"
                          name="AAper"
                          placeholder="Percentage"
                          onChange={handleChange}
                          value={AAper}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="January 1"
                          style={{ height: "4.8vh" }}
                          name="Jan23a"
                          control="select"
                          value={Jan23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="January 2"
                          style={{ height: "4.8vh" }}
                          name="Jan23b"
                          control="select"
                          value={Jan23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="February 1"
                          style={{ height: "4.8vh" }}
                          name="Feb23a"
                          control="select"
                          value={Feb23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="February 2"
                          style={{ height: "4.8vh" }}
                          name="Feb23b"
                          control="select"
                          value={Feb23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="March 1"
                          style={{ height: "4.8vh" }}
                          name="Mar23a"
                          control="select"
                          value={Mar23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="March 2"
                          style={{ height: "4.8vh" }}
                          name="Mar23b"
                          control="select"
                          value={Mar23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="April 1"
                          style={{ height: "4.8vh" }}
                          name="Apr23a"
                          control="select"
                          value={Apr23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="April 2"
                          style={{ height: "4.8vh" }}
                          name="Apr23b"
                          control="select"
                          value={Apr23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="May 1"
                          style={{ height: "4.8vh" }}
                          name="May23a"
                          control="select"
                          value={May23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="May 2"
                          style={{ height: "4.8vh" }}
                          name="May23b"
                          control="select"
                          value={May23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="June 1"
                          style={{ height: "4.8vh" }}
                          name="Jun23a"
                          control="select"
                          value={Jun23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="June 2"
                          style={{ height: "4.8vh" }}
                          name="Jun23b"
                          control="select"
                          value={Jun23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="July 1"
                          style={{ height: "4.8vh" }}
                          name="Jul23a"
                          control="select"
                          value={Jul23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="July 2"
                          style={{ height: "4.8vh" }}
                          name="Jul23b"
                          control="select"
                          value={Jul23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="August 1"
                          style={{ height: "4.8vh" }}
                          name="Aug23a"
                          control="select"
                          value={Aug23a}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Field
                          label="August 2"
                          style={{ height: "4.8vh" }}
                          name="Aug23b"
                          control="select"
                          value={Aug23b}
                          onChange={handleChange}
                        >
                          <option value=" "></option>
                          <option style={{ color: "green" }} value="Present">
                            Present
                          </option>
                          <option style={{ color: "red" }} value="Absent">
                            Absent
                          </option>
                        </Form.Field>
                      </div>
                    </div>

                    <br></br>

                    <Button
                      style={{ float: "right" }}
                      color="green"
                      type="submit"
                      icon
                      labelPosition="left"
                      size="small"
                    >
                      <Icon name="check" /> Save
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

export default EditAtten;
