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
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import { Link } from "react-router-dom";

const Tables = () => {
  const [sujet, setSujet] = useState([]);
  const [vote, setVote] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/sujet/getall").then((response) => {
      setSujet(response.data);
    });
  }, []);
  console.log("sujet", sujet);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          {sujet.map((su) => {
            return (
              <>
                <div className="col">
                  <Card style={{ width: "18rem" }}>
                    <CardImg
                      alt="..."
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                      top
                    />
                    <CardBody>
                      <CardTitle>{su.titre}</CardTitle>
                      <CardText>{su.description}</CardText>
                      <Link
                        to={`/admin/maps/${su._id}`}
                        className="font-bold text-blueGray-700 mt-8"
                      >
                        <Button color="primary">Vote </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </div>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Tables;
