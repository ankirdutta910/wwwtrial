import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
// import logo from "../../logo.png";
import Members from "./components/Members/Members";
import EditMember from "./components/Members/EditMember";

import Coordinators from "./components/Coordinators/Coordinators";
import EditCoordinator from "./components/Coordinators/EditCoordinator";

import Events from "./components/Events/Events";
import EditEvent from "./components/Events/EditEvents";

import Attendance from "./components/Attendance/Atten";
import EditAttendance from "./components/Attendance/EditAtten";

import AttendanceDetails from "./components/AttendanceDetails/AttenDetail";
import EditAttendanceDetail from "./components/AttendanceDetails/EditAttendetail";

import AttendancePercentage from "./components/Attendance";

import "./App.css";
import Admin from "./components/Admin/components/Home";
import Login from "./components/Admin/components/Login";
import Signup from "./components/Admin/components/Signup";
import FPassword from "./components/Admin/components/FPassword";
import ProtectedRoute from "./components/Admin/components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/Admin/context/UserAuthContext";
import Header from "./components/Admin/Header";
import Header2 from "./components/Admin/Header2";

// import Home from "./Login";
import "./App.css";
import Recruitment from "./components/Recruitment/Recruitment";
import EditRecruit from "./components/Recruitment/EditRecruit";
import EditVolReg from "./components/VolunteershipP/EditVolReg";
import VolunReg from "./components/VolunteershipP/VolunReg";

import EditMAgreement from "./components/Agreements/EditMAgreement";
import MAgreements from "./components/Agreements/MAgreements";
import EditCAgreement from "./components/Agreements/EditCAgreement";
import CAgreements from "./components/Agreements/CAgreements";
import AccessDenied from "./components/Components/AccessDenied";
import EditRecruitBoard from "./components/ExtraForms/EditRecruitBoadr";
import BoardRecruit from "./components/ExtraForms/BoardRecruit";
import BoardEdit from "./components/Components/BoardEdit";
import EventFeedbacks from "./components/Components/EventFeedbacks";
import MonthlyRecords from "./components/Records/MonthlyRecords";
import MonthlyRecordEdit from "./components/Records/MonthlyRecordEdit";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(firestore, "members", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();

        // Check if user has the "admin" role
        if (userData && userData.rooler === "Admin") {
          setIsAdmin(true);
          setIsMember(false);
        } else {
          setIsAdmin(false);
          setIsMember(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="admin">
        <UserAuthContextProvider>
          <Routes>
            <Route
              path="/password_reset"
              element={
                <>
                  <Header2 />
                  <FPassword />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header2 />
                  <Login />
                </>
              }
            />

            {isMember && (
              <>
                <Route path="/" element={<AccessDenied />} />
                <Route
                  path="/www_members_attendance_"
                  element={<AccessDenied />}
                />
                <Route
                  path="/www_members_attendance_details_"
                  element={<AccessDenied />}
                />
                <Route
                  path="/www_members_details_"
                  element={<AccessDenied />}
                />
                <Route
                  path="/www_coordinators_details_"
                  element={<AccessDenied />}
                />
                <Route path="/www_events_" element={<AccessDenied />} />
                <Route path="/www_recruitment_" element={<AccessDenied />} />
                <Route path="/www_volunteership_" element={<AccessDenied />} />
                <Route
                  path="/www_members_atten_percentage_"
                  element={<AccessDenied />}
                />
                <Route
                  path="/www_members_agreements_"
                  element={<AccessDenied />}
                />
                <Route
                  path="/www_coordinators_agreements_"
                  element={<AccessDenied />}
                />

                <Route path="/board_recruitment" element={<AccessDenied />} />

                <Route path="/events_feedbacks" element={<EventFeedbacks />} />
                <Route path="/monthly_records" element={<MonthlyRecords />} />
              </>
            )}

            {isAdmin && (
              <>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Header />
                      <Admin />
                    </ProtectedRoute>
                  }
                />

                <Route path="/signup" element={<Signup />} />

                <Route
                  path="/www_members_attendance_"
                  element={
                    <ProtectedRoute>
                      <Header /> <Attendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editatten/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditAttendance />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_members_attendance_details_"
                  element={
                    <ProtectedRoute>
                      <Header /> <AttendanceDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editatten_detail/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditAttendanceDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_members_details_"
                  element={
                    <ProtectedRoute>
                      <Header /> <Members />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/editmember/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditMember />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_coordinators_details_"
                  element={
                    <ProtectedRoute>
                      <Header /> <Coordinators />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editcoordinator/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditCoordinator />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_events_"
                  element={
                    <ProtectedRoute>
                      <Header /> <Events />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editevent/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditEvent />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_recruitment_"
                  element={
                    <ProtectedRoute>
                      <Header /> <Recruitment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editRecruit/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditRecruit />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_volunteership_"
                  element={
                    <ProtectedRoute>
                      <Header /> <VolunReg />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/editVolunteer/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditVolReg />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_members_atten_percentage_"
                  element={
                    <ProtectedRoute>
                      <Header /> <AttendancePercentage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_members_agreements_"
                  element={
                    <ProtectedRoute>
                      <Header /> <MAgreements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit_m_Agreements/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditMAgreement />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/www_coordinators_agreements_"
                  element={
                    <ProtectedRoute>
                      <Header /> <CAgreements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit_c_Agreements/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditCAgreement />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/board_recruitment"
                  element={
                    <ProtectedRoute>
                      <Header /> <BoardRecruit />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/edit_board_recruitment/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <EditRecruitBoard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/edit_board/:id"
                  element={
                    <ProtectedRoute>
                      <Header /> <BoardEdit />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/events_feedbacks"
                  element={
                    <ProtectedRoute>
                      <Header />
                      <EventFeedbacks />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/monthly_records"
                  element={
                    <ProtectedRoute>
                      <Header />
                      <MonthlyRecords />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/editmonthlyrecord/:id"
                  element={
                    <ProtectedRoute>
                      <Header />
                      <MonthlyRecordEdit />
                    </ProtectedRoute>
                  }
                />
              </>
            )}
          </Routes>
        </UserAuthContextProvider>
      </div>
    </>
  );
}

export default App;
