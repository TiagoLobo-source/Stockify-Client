import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
import ProductsList from "../pages/ProductsList";
import App from "../pages/App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #F7ECE7;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Content = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  background-color: #F7ECE7;
  color: black;
  padding: 10px;
  text-align: center;
`;

function HomePage() {
  

  return (
    <Container>
     
      <Content>
        <App></App>
      </Content>

      <Footer>&copy; {new Date().getFullYear()} Stockify</Footer>
    </Container>
  );
}

export default HomePage;
