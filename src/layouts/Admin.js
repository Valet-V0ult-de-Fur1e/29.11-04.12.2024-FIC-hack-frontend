import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { UserAgent } from 'react-useragent';
import { UAParser } from 'ua-parser-js';
import routes from "navRoutes";
import axios from "axios";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  React.useEffect(() => {
    if (localStorage.getItem("jwt") !== "") {
      console.log({
        "token": localStorage.getItem("jwt"),
        "host_name": UAParser(UserAgent).browser.name + " " + UAParser(UserAgent).os.name
      })
      axios.post(
        "https://scribesbookapi-evhk1f08.b4a.run/users/profile",
        {
          "token": localStorage.getItem("jwt"),
          "host_name": UAParser(UserAgent).browser.name + " " + UAParser(UserAgent).os.name
        }
      ).then(
        res => {
          console.log(res.data)
          localStorage.setItem("userNamef", res.data.name_first)
          localStorage.setItem("userNamel", res.data.name_last)
        }
      )
    }

  })

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
