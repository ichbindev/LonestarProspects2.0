import React from "react";
// import React, { Component } from "react";
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Progress,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js"
import DemoFooter from "../../components/Footers/DemoFooter";
import API from "../../utils/API.js";

const hisSkills = [
  {
    "name": "Size",
    "points": 9
  },
  {
    "name": "Speed",
    "points": 7
  },
  {
    "name": "Accuracy",
    "points": 2
  },
]
let playerID
let thisPlayer = []

const getURL = () => {
  const thisURL = window.location.href
  playerID = thisURL.split("/").splice(4)[0]
  // console.log(playerID)
  return playerID
}

const getPlayerProfile = (id) => {
  console.log(id)
  // const lookUp = (id.match.params.id)
  const lookUp = (id)

  API.getPlayer(lookUp)
    .then(res => {
      let result = res.data
      thisPlayer.push(
        {
          firstName: result.firstName,
          lastName: result.lastName,
          position: {
            name: result.position.name,
            skills: result.position.skills
          },
          height: result.height,
          weight: result.weight,
          highschool: result.highschool,
          class: result.class,
          film: result.film
        }
      )
      console.log("Look here: " + thisPlayer[0]);
    }
    )
    .catch(err => console.log(err));;

}
getURL()

getPlayerProfile(playerID)

console.log(thisPlayer);
console.log(thisPlayer.length);
// console.log(thisPlayer[1])
// class ProfilePage extends React.Component {}

function ProfilePage(thisPlayer) {



  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  // class ProfilePage extends Component {



  // render() {

  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("../../assets/img/DalvinCook.png")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                {/* {thisPlayer[0].firstName} <br /> */}
                {/* Dalvin Cook <br /> */}
              </h4>
              <h6 className="description">Running Back</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                Dalvin is one baaaaaaaaaaaaaaaaaaad man. He proved he is in the conversation for best RB in the league when
                he made Zeke look like a chubbier and slower version of himself.
              </p>
              <br />
              <Button className="btn-round" color="default" outline>
                <i className="fa fa-cog" /> Add to Prospect List
              </Button>
            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Offers
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Film
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">
                    <li>
                      <Row>
                        <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("../../assets/img/OSU.jpg")}
                          />
                        </Col>
                        <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                          <h6>
                            Ohio State <br />
                            <small>11/14/2019</small>
                          </h6>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </li>
                    <hr />
                    <li>
                      <Row>
                        <Col className="mx-auto" lg="2" md="4" xs="4">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("../../assets/img/TCU.png")}
                          />
                        </Col>
                        <Col lg="7" md="4" xs="4">
                          <h6>
                            TCU <br />
                            <small>11/10/2019</small>
                          </h6>
                        </Col>
                        <Col lg="3" md="4" xs="4">
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <h3 className="text-muted">Junior Season Highlights</h3>
              <Button className="btn-round" color="warning">
                Watch Now
              </Button>
            </TabPane>
          </TabContent>
        </Container>
        <Container>
          <Row>
            <Col md="6">
              <div className="title">
                <h3>Player Evaluation Scores</h3>
                <br />
              </div>
              {
                hisSkills.map(skill => (
                  <div>
                    <h6>{skill.name}</h6>
                    <Progress
                      max="10"
                      value={skill.points}
                      barClassName="progress-bar-success"
                    />
                    <br />
                  </div>
                ))
              }
            </Col>
            <Col md="6">
              <div className="title">
                <h3>Player Stats</h3>
              </div>
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav id="tabs" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        2017
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        2018
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        2019
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab} className="text-center">
                <TabPane tabId="1">
                  <h3>
                    74 Attempts - 354 Yards - 2 Touchdowns (Torn ACL)
                  </h3>
                </TabPane>
                <TabPane tabId="2">
                  <h3>133 Attempts - 615	Yards - 2 Touchdowns</h3>
                </TabPane>
                <TabPane tabId="3">
                  <h3>203 Attempts - 991 Yards - 10 Touchdowns</h3>
                </TabPane>
              </TabContent>
            </Col>
            <Col md="6">
              <div className="title">
                <h3>Play Style</h3>
              </div>
              <label className="label label-default mr-1">Power Runner</label>
              <label className="label label-primary mr-1">Recieving Back</label>
              <label className="label label-info mr-1">Balanced Runner</label>
              <label className="label label-success mr-1">Special Teams</label>
              <label className="label label-warning mr-1">Zone Runner</label>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}
// }

export default ProfilePage;
