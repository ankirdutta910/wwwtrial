import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { Table, Button, Form } from "semantic-ui-react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    minHeight: "57vh",

    marginRight: "-50%",
    padding: "10px 0 10px 0",
    transform: "translate(-50%, -50%)",
  },
};

function MemberSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);

    // Query Firestore for documents that match the search query
    db.collection("members")
      .where("name", ">=", newQuery)
      .where("name", "<=", newQuery + "\uf8ff") // \uf8ff is the last possible character in Unicode
      .get()
      .then((querySnapshot) => {
        const suggestions = [];
        querySnapshot.forEach((doc) => {
          suggestions.push(doc.data());
        });
        setSuggestionList(suggestions);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestionList([]);
  };

  const handleSearchSubmit = async () => {
    // Query Firestore for documents that exactly match the search query
    const querySnapshot = await db
      .collection("members")
      .where("name", "==", searchQuery)
      .get();
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });
    setSearchResults(results);
    setModalIsOpen(true);
  };

  // Clear the suggestion list when the search query changes
  useEffect(() => {
    setSuggestionList([]);
  }, [searchQuery]);

  return (
    <div className="container my-2" style={{ maxHeight: "60vh" }}>
      <div className="row">
        <div className="col-sm-10">
          <Form.Input
            type="text"
            placeholder="Search Member Name..."
            style={{ width: "90%", height: "auto" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-sm-2">
          <Button
            style={{ marginTop: "2px", marginLeft: "-5vh" }}
            size="small"
            color="#808080"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </div>
      </div>

      <div
        style={{
          overflowY: "scroll",
          marginTop: "5px",
          border: "1px solid #ededed",
          borderRadius: "5px",
          backgroundColor: "white",
        }}
      >
        <p
          style={{
            height: "15vh",
            textTransform: "uppercase",
            padding: "8px",
            fontSize: "12px",
          }}
        >
          {suggestionList.map((suggestion) => (
            <p
              style={{ cursor: "pointer" }}
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </p>
          ))}
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {searchResults.map((result) => (
          <div key={result.id}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3">
                  <img
                    src={result.link}
                    style={{
                      maxHeight: "50vh",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-lg-9 my-2">
                  <div className="my-3">
                    <Table
                      responsive
                      striped
                      bordered
                      hover
                      size="sm"
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      <tbody style={{ fontSize: "12px" }}>
                        <tr>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Name:</i>{" "}
                              {result.name}
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Registration no:</i>{" "}
                              {result.regno}
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Preference-I:</i>{" "}
                              {result.department}
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Preference-II:</i>{" "}
                              {result.department2}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Contact:</i>{" "}
                              {result.phone}
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Whatsapp:</i>{" "}
                              {result.whatsapp}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Email:</i>{" "}
                              {result.email}
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Role:</i>{" "}
                              {result.role}
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Blood:</i>{" "}
                              {result.blood}
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>College:</i>{" "}
                              {result.college}
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>State:</i>{" "}
                              {result.state}
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <i style={{ color: "grey" }}>Exp:</i> {result.exp}
                            </h6>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <Button
                    style={{ float: "right" }}
                    size="small"
                    onClick={() => setModalIsOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default MemberSearch;
