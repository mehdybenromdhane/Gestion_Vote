/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  CardImg,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import { timers } from "jquery";

const Maps = () => {
  var [sujet, setSujet] = useState([]);
  const [oui, setOui] = useState(0);
  const [non, setNon] = useState(0);
  const [score, setScore] = useState(0);

  const [total, setTotal] = useState(0);
  const [disableOui, setDisableOui] = useState();
  const [disableNon, setDisableNon] = useState();

  var str = window.location.pathname;
  let id = str.slice(12);
  console.log(id);

  useEffect(() => {
    axios.get("http://localhost:5000/sujet/getSujet/" + id).then((response) => {
      setSujet(response.data);
    });
    axios.get("http://localhost:5000/sujet/getOui/" + id).then((response) => {
      setScore(response.data);
    });

    axios.get("http://localhost:5000/sujet/getTotal/" + id).then((response) => {
      setTotal(response.data);
    });
  }, []);
  function incrementVoteCount(id) {
    setTimeout(() => {
      if (sujet._id === id) {
        sujet.oui = sujet.oui + 1;
      }
      axios.put("http://localhost:5000/sujet/oui/" + id, sujet);
      setSujet(sujet);
      setOui(oui + 1);
      console.log("ouiii", oui);
      console.log(sujet.oui);
    }, 5000);
    setDisableOui(true);
    setDisableNon(false);
  }

  function desincrementVoteCount(id) {
    setTimeout(() => {
      if (sujet._id === id) {
        sujet.non = sujet.non + 1;
      }

      setSujet(sujet);
      setNon(non + 1);

      console.log(sujet.non);
      axios.put("http://localhost:5000/sujet/non/" + id, sujet);
    }, 5000);

    setDisableOui(false);
    setDisableNon(true);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col ">
            <Card className="shadow border-0">
              <Card style={{ width: "18rem" }}>
                <CardImg
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  top
                />
                <CardBody>
                  <CardTitle>{sujet.titre}</CardTitle>
                  <CardText>{sujet.description}</CardText>
                  <CardText>{sujet.vote}</CardText>
                  <CardText>Pour:{sujet.oui}</CardText>
                  <CardText>Contre:{sujet.non}</CardText>
                  Votes <CardText>{(score / total) * 100} %</CardText>
                  <Button
                    disabled={disableOui}
                    color="primary"
                    onClick={() => incrementVoteCount(sujet._id)}
                  >
                    Oui{" "}
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => desincrementVoteCount(sujet._id)}
                    disabled={disableNon}
                  >
                    Non{" "}
                  </Button>
                </CardBody>
              </Card>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
