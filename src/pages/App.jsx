import React from 'react';

function importAll(r) {
    return r.keys().map(r);
  }
  
 
  const images = [
  './pages/images/adidas.avif',
  './pages/images/dyson.png',
  
];

function App() {
  return (
    <div>
      
 
      <div className="hero" style={{ width: '100%', height: '80vh', backgroundColor: '#F7ECE7' }}>
        <div className="container col-xxl-9 px-4 " style={{marginLeft: '15%'}}>
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="images/hero.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h4 style={{ letterSpacing: '2%', fontSize: '16px', fontWeight: 600 }}>
                FEATURED - FALL DEAL 2023
              </h4>
              <h1 className="display-3 fw-bold text-body-emphasis lh-1 mb-3"><strong>-30% Discount</strong></h1>
              <p className="lead">
                Fall has arrived and it's time to get cozy with our cashmere and wool blend bestseller
                beanies.
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

      <div
        className="container px-4 py-3"
        id="featured-3"
        style={{
            zIndex: 1,
            backgroundColor: 'white',
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            position: 'relative',
            top: '-40px',
        }}
      >
        <div className="row g-4 py-3 row-cols-1 row-cols-lg-2">
          <div
            className="feature col text-center"
            style={{ padding: '20px', borderRight: '1px solid #ccc' }}
          >
            <img src="/img/best.png" alt="" />
            <h3 className="fs-4 text-body-emphasis" style={{ fontSize: '24px', padding: '10px' }}>
              <b>Buy Quality Products</b>
            </h3>
            <p style={{ color: '#737373' }}>We ensure our vendors commit to delivering top products</p>
          </div>
          <div className="feature col text-center" style={{ padding: '20px' }}>
            <img src="/img/HANDS.png" alt="" />
            <h3 className="fs-4 text-body-emphasis" style={{ fontSize: '24px', padding: '10px' }}>
              <b>Sell Your Products</b>
            </h3>
            <p style={{ color: '#737373' }}>Go through our vetting process and submit your products</p>
          </div>
        </div>
      </div>

      <div className="container px-4" style={{ paddingTop: '5%' }} id="custom-cards">
        <h4>ALL PRODUCTS</h4>
        <p style={{ color: '#737373', fontSize: '14px' }}>Showing 104358 products</p>
        <div className=" row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <ProductCard
            imageUrl="img/dyson.png"
            title="Dyson Hair Wrap"
            category="Electronics"
            price="€120"
          />
          <ProductCard
            imageUrl="img/dyson.png"
            title="Dyson Hair Wrap"
            category="Electronics"
            price="€120"
          />
          <ProductCard
            imageUrl="img/dyson.png"
            title="Dyson Hair Wrap"
            category="Electronics"
            price="€120"
          />
          <ProductCard
            imageUrl="img/dyson.png"
            title="Dyson Hair Wrap"
            category="Electronics"
            price="€120"
          />
          <ProductCard
            imageUrl="img/dyson.png"
            title="Dyson Hair Wrap"
            category="Electronics"
            price="€120"
          />
          <ProductCard
            imageUrl="img/dyson.png"
            title="Dyson Hair Wrap"
            category="Electronics"
            price="€120"
          />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ imageUrl, title, category, price }) {
    return (
      <div className="col" style={{ margin: '20px 20px' }}>
        <div className="card card-cover h-100 overflow-hidden text-white rounded-4 shadow-lg" style={{ backgroundColor: '#181412' }}>
          <img src={imageUrl} className="card-img-top" alt={title} />
          <div className="card-body p-4">
            <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 700 }}>
              {title}
            </h5>
            <p style={{ fontSize: '16px', color: '#737373' }}>{category}</p>
            <p className="card-text" style={{ fontSize: '24px', fontWeight: 700 }}>
              {price}
            </p>
          </div>
          <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn-outline-light"
              style={{
                border: '1px solid #F7ECE7',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              ADD TO CART
            </button>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#737373',
              }}
            >
              <i className="fas fa-laptop me-2"></i>
              {category}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  function AppHome() {
    const products = [
        {
          imageUrl: images[0],
          title: 'Product 1',
          category: 'Category 1',
          price: '$100',
        },
        {
          imageUrl: images[1],
          title: 'Product 2',
          category: 'Category 2',
          price: '$150',
        },
      {
        imageUrl: images[1],
        title: 'Product 3',
        category: 'Category 3',
        price: '$80',
      },
      {
        imageUrl:images[1],
        title: 'Product 4',
        category: 'Category 4',
        price: '$120',
      },
      {
        imageUrl: images[1],
        title: 'Product 5',
        category: 'Category 5',
        price: '$200',
      },
      {
        imageUrl: images[1],
        title: 'Product 6',
        category: 'Category 6',
        price: '$90',
      },
    ];
  
    return (
      <div className="container py-4">
      <h4>ALL PRODUCTS</h4>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product, index) => (
          <div key={index} className="col">
            <ProductCard
              imageUrl={product.imageUrl}
              title={product.title}
              category={product.category}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
    

      
    );
  
}

export default App;
