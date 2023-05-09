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
  Jan23af: "",
  Jan23bf: "",
  Feb23af: "",
  Feb23bf: "",
  Mar23af: "",
  Mar23bf: "",
  Apr23af: "",
  Apr23bf: "",
  May23af: "",
  May23bf: "",
  Jun23af: "",
  Jun23bf: "",
  Jul23af: "",
  Jul23bf: "",
  Aug23af: "",
  Aug23bf: "",
};

const EditAttendetail = () => {
  const [data, setData] = useState(initialState);
  const {
    name,
    regno,
    status,
    AAper,
    Jan23af,
    Jan23bf,
    Feb23af,
    Feb23bf,
    Mar23af,
    Mar23bf,
    Apr23af,
    Apr23bf,
    May23af,
    May23bf,
    Jun23af,
    Jun23bf,
    Jul23af,
    Jul23bf,
    Aug23af,
    Aug23bf,
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
                      <div className="col-lg-6 my-2">
                        <Form.Input
                          error={errors.ename ? { content: errors.name } : null}
                          label="Name"
                          name="name"
                          readOnly
                          placeholder="Name"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>
                      <div className="col-lg-4 my-2">
                        <Form.Input
                          label="Reg no."
                          name="regno"
                          readOnly={true}
                          placeholder="Registration number"
                          onChange={handleChange}
                          value={regno}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          error={
                            errors.regno ? { content: errors.regno } : null
                          }
                          label="Percentage"
                          name="AAper"
                          readOnly
                          placeholder="Percentage"
                          onChange={handleChange}
                          value={AAper}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="January 1"
                          name="Jan23af"
                          onChange={handleChange}
                          value={Jan23af}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="January 2"
                          name="Jan23bf"
                          value={Jan23bf}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="February 1"
                          name="Feb23af"
                          value={Feb23af}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="February 2"
                          name="Feb23bf"
                          value={Feb23bf}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="March 1"
                          name="Mar23af"
                          value={Mar23af}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="March 2"
                          name="Mar23bf"
                          value={Mar23bf}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="April 1"
                          name="Apr23af"
                          value={Apr23af}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="April 2"
                          name="Apr23bf"
                          value={Apr23bf}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="May 1"
                          name="May23af"
                          value={May23af}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="May 2"
                          name="May23bf"
                          value={May23bf}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="June 1"
                          name="Jun23af"
                          value={Jun23af}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="June 2"
                          name="Jun23bf"
                          value={Jun23bf}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="July 1"
                          name="Jul23af"
                          value={Jul23af}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="July 2"
                          name="Jul23bf"
                          value={Jul23bf}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="August 1"
                          name="Aug23af"
                          value={Aug23af}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-lg-2 my-2">
                        <Form.Input
                          label="August 2"
                          name="Aug23bf"
                          value={Aug23bf}
                          onChange={handleChange}
                        />
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

export default EditAttendetail;
