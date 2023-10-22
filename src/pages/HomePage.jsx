import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from 'styled-components';
import ProductsList from "../pages/ProductsList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

function HomePage() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <Container>
      <Header>
        <h1>Welcome to My Website</h1>
        {isLoggedIn && (
          <nav>
            {(user.userPermission === "supplier" || user.userPermission === "admin") && (
              <>
                <Link to="/addproducts">
                  <button>Add Products</button>
                </Link>
                <Link to="/products">
                  <button>Product List</button>
                </Link>
              </>
            )}
          </nav>
        )}
        
      </Header>
      <ProductsList>
      <Content>
        
      </Content>
      </ProductsList>
      <Footer>
        &copy; {new Date().getFullYear()} My Website
      </Footer>
    </Container>
  );
}

export default HomePage;
