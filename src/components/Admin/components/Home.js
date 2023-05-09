import React, { Fragment } from "react";
import "./Style.css";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

import GoToTop from "../../../GoToTop";
import { useUserAuth } from "../context/UserAuthContext";
import DeptCount from "../../Components/DeptCounts";
import DeptCount2 from "../../Components/Dept2Count";
import MemberSearch from "../../Components/MemberSearch";

import CoordinatorCount from "../../Components/CoordinatorCount";
import Members_Gender from "../../Components/Members_Gender";
import Coordinators_Gender from "../../Components/Coordinators_Gender";
import StateCounts from "../../Components/StateCounts";
import BoardMem from "../../Components/BoardMem";
import BloodGroups from "../../Components/BloodGroups";

import TotalPeople from "../../Components/TotalPeople";
import MembersCount from "../../Components/MembersCount";

const Home = () => {
  //For visibility of the page
  const { user } = useUserAuth();

  return (
    <Fragment>
      <>
        <GoToTop />
        <div style={{ backgroundColor: "#f2f2f2" }}>
          <div className="container-fluid my-5" style={{ maxWidth: "200vh" }}>
            {/* Welcome box */}
            <div className="content">
              <div className="row">
                <div className="col-sm-12" style={{ marginTop: "6vh" }}>
                  <h3
                    style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                    className="page-title"
                  >
                    Welcome,{" "}
                    <span style={{ color: "#26acff" }}>
                      {user && user.email}
                    </span>
                  </h3>
                  <p
                    style={{
                      color: "grey",
                      marginTop: "-10px",
                      fontSize: "12px",
                    }}
                  >
                    All systems are running smoothly!
                  </p>
                </div>
              </div>
            </div>
            {/* Welcome box */}
            <div className="content my-3">
              <div className="row">
                <div className="content">
                  <DeptCount />

                  <br></br>
                </div>
                <div className="col-lg-9">
                  <div className="container-fluid">
                    <div className="row">
                      <div
                        className="col-lg-8 my-2"
                        style={{
                          backgroundColor: "white",
                          padding: "17px 10px 0px 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>Second Preference:</b>
                        <DeptCount2 />
                      </div>
                      <div
                        className="col-lg my-2"
                        style={{
                          marginLeft: "8px",
                          backgroundColor: "white",
                          padding: "17px 10px 0px 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>
                          Get Member Details:
                        </b>
                        <MemberSearch />
                        <br></br>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      <div
                        className="col-lg-8 my-2"
                        style={{
                          backgroundColor: "white",
                          padding: "17px 10px 10px 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>Blood Groups</b>
                        <BloodGroups />
                      </div>

                      <div className="col-lg my-2">
                        <div className="row">
                          <div
                            className="col-lg"
                            style={{
                              backgroundColor: "white",
                              padding: "17px 10px 10px 10px",
                              borderRadius: "8px",

                              marginLeft: "8px",
                            }}
                          >
                            <b
                              style={{
                                marginLeft: "10px",
                                textAlign: "center",
                              }}
                            >
                              Members
                            </b>
                            <MembersCount />
                          </div>

                          <div
                            className="col-lg"
                            style={{
                              backgroundColor: "white",
                              padding: "17px 10px 10px 10px",
                              borderRadius: "8px",

                              marginLeft: "8px",
                            }}
                          >
                            <b
                              style={{
                                marginLeft: "10px",
                                textAlign: "center",
                              }}
                            >
                              Coordinators
                            </b>
                            <CoordinatorCount />
                          </div>
                        </div>

                        <div className="row my-3">
                          <div
                            className="col-lg"
                            style={{
                              backgroundColor: "white",
                              padding: "17px 10px 10px 10px",
                              borderRadius: "8px",

                              marginLeft: "8px",
                            }}
                          >
                            <b
                              style={{
                                marginLeft: "10px",
                                textAlign: "center",
                              }}
                            >
                              Total
                            </b>
                            <TotalPeople />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      <div
                        className="col-lg-5 my-2"
                        style={{
                          backgroundColor: "white",
                          padding: "17px 10px 10px 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>Members</b>
                        <Members_Gender />
                      </div>

                      <div
                        className="col-lg-5 my-2"
                        style={{
                          backgroundColor: "white",
                          padding: "17px 10px 10px 10px",
                          borderRadius: "8px",
                          marginLeft: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>Coordinators</b>
                        <Coordinators_Gender />
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      <div
                        className="col-lg-5 my-2"
                        style={{
                          backgroundColor: "white",
                          padding: "17px 10px 10px 10px",
                          borderRadius: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>Members in India</b>
                        <br></br> <br></br>
                        <StateCounts />
                      </div>

                      <div
                        className="col-lg my-2"
                        style={{
                          backgroundColor: "white",
                          padding: "17px 10px 10px 10px",
                          borderRadius: "8px",
                          marginLeft: "8px",
                        }}
                      >
                        <b style={{ marginLeft: "10px" }}>Board Members</b>
                        <div style={{ overflowY: "scroll", height: "65vh" }}>
                          <BoardMem />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 my-2">
                  <div
                    className="content"
                    style={{
                      backgroundColor: "white",
                      padding: "17px 10px 10px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="column">
                      <div className="col-lg">
                        <div className="container-fluid">
                          <div className="column">
                            <div className="col-lg my-2">
                              <Link to="/www_members_attendance_">
                                <Card
                                  image=""
                                  header="Attendance"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_members_details_">
                                <Card
                                  image=""
                                  header="Members"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_coordinators_details_">
                                <Card
                                  image=""
                                  header="Coordinators"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/monthly_records">
                                <Card
                                  image=""
                                  header="Monthly Records"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_members_agreements_">
                                <Card
                                  image=""
                                  header="Member's Agreements"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_coordinators_agreements_">
                                <Card
                                  image=""
                                  header="Coordinator's Agreements"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_recruitment_">
                                <Card
                                  image=""
                                  header="Recruitments"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_volunteership_">
                                <Card
                                  image=""
                                  header="Volunteership Program"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_members_attendance_details_">
                                <Card
                                  image=""
                                  header="Attendance Details"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_members_atten_percentage_">
                                <Card
                                  image=""
                                  header="Attendance Percentage"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/www_events_">
                                <Card
                                  image=""
                                  header="Event Registrations"
                                  description="Details >>"
                                />
                              </Link>
                            </div>

                            <div className="col-lg my-2">
                              <Link to="/events_feedbacks">
                                <Card
                                  image=""
                                  header="Events Feedbacks"
                                  description="Details >>"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </>
    </Fragment>
  );
};

export default Home;
