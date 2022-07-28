import React from "react";
import "../css/HomeStyle.css";
import styled from "styled-components";
import Figure from "react-bootstrap/Figure";
// import Image from 'react-bootstrap/Image'
// import {Link} from 'react-router-dom'

const HomeTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
`;

const home = () => {
  return (
    <div className="container" id="home-search">
      <Figure.Image
        className="home-profile"
        width="50px"
        height="50px"
        alt="171x180"
        src="http://via.placeholder.com/100x100"
      />

      <HomeTitle>CODIARY</HomeTitle>

      <input className="search-bar" type="text" placeholder="SEARCH"></input>
    </div>
  );
};

export default home;
