import React from 'react';
import hero from "../images/hero.png";

function App() {
  return (
    <div>
      <div className="hero" style={{ width: '100%', height: '80vh', backgroundColor: '#F7ECE7' }}>
        <div className="container col-xxl-9 px-4" style={{ marginLeft: '15%' }}>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div className="col-10 col-sm-8 col-lg-6">
                <img
                  src={hero}
                  className="d-block mx-lg-auto img-fluid"
                  alt="Hero Image"
                  width="700"
                  height="500"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-6">
                <h4 style={{ letterSpacing: '2%', fontSize: '16px', fontWeight: 600 }}>
                  FEATURED - FALL DEAL 2023
                </h4>
                <h1 className="display-3 fw-bold text-body-emphasis lh-1 mb-3">
                  <strong>-30% Discount</strong>
                </h1>
                <p className="lead">
                  Fall has arrived, and it's time to get cozy with our cashmere and wool blend bestseller beanies.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <button
                    style={{
                      border: '1px solid #181412',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#181412',
                    }}
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-3" id="featured-3">
        <div
          style={{
            backgroundColor: 'white',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '10px',
            boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
            position: 'relative',
            top: '-40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="row g-4 py-3 row-cols-1 row-cols-lg-2">
            <div className="feature col text-center" style={{ padding: '20px', borderRight: '1px solid #ccc' }}>
              <img src="/img/best.png" alt="Quality Products" />
              <h3 className="fs-4 text-body-emphasis" style={{ fontSize: '24px', padding: '10px' }}>
                <b>Buy Quality Products</b>
              </h3>
              <p style={{ color: '#737373' }}>We ensure our vendors commit to delivering top products</p>
            </div>
            <div className="feature col text-center" style={{ padding: '20px' }}>
              <img src="/img/HANDS.png" alt="Sell Your Products" />
              <h3 className="fs-4 text-body-emphasis" style={{ fontSize: '24px', padding: '10px' }}>
                <b>Sell Your Products</b>
              </h3>
              <p style={{ color: '#737373' }}>Go through our vetting process and submit your products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
