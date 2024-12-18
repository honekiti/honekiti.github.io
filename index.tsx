import React from "react";
import "./styles.css";

const App = () => {
  return (
    <div id="page-top">
      <Navbar />
      <Header />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#page-top">portfolio</a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="masthead">
      <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase">Profile</h1>
          <h2 className="text-white-50 mx-auto mt-2 mb-5">Amon Kikuti(Koike)</h2>
        </div>
      </div>
    </header>
  );
};

// About Component
const About = () => {
  return (
    <section className="about-section text-center" id="about">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-white mb-4">Profile</h2>
            <p className="text-white mb-4">
              <strong style={{ size: "0cap" }}>菊地(小池)亜紋</strong><br />
              <strong style={{ size: "0cqw" }}>東京国際工科専門職大学/工科学部/情報工学科/AI戦略コース</strong><br />
              <strong style={{ size: "0cqmax" }}>
                長期インターンシップ：暗号資産積み立てアプリ。フロントエンドエンジニアを担当<br />
                長期インターンシップ：需要予測LLMアプリ。AI開発エンジニアを担当
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  return (
    <section className="contact-section bg-black" id="Contact">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5">
          <ContactCard
            icon="fas fa-map-marked-alt"
            title="Address"
            content="静岡県沼津市上香貫三園町1389 VillaScala304"
          />
          <ContactCard
            icon="fas fa-envelope"
            title="Email"
            content={<a href="mailto:amon20021121@gmail.com">amon20021121@gmail.com</a>}
          />
          <ContactCard
            icon="fas fa-mobile-alt"
            title="Phone"
            content="090-4110-0442"
          />
        </div>
        <div className="social d-flex justify-content-center">
          <a className="mx-2" href="https://github.com/honekiti/honekiti.github.io">
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Reusable ContactCard Component
const ContactCard = ({ icon, title, content }) => {
  return (
    <div className="col-md-4 mb-3 mb-md-0">
      <div className="card py-4 h-100">
        <div className="card-body text-center">
          <i className={`${icon} text-primary mb-2`} />
          <h4 className="text-uppercase m-0">{title}</h4>
          <hr className="my-4 mx-auto" />
          <div className="small text-black-50">{content}</div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer bg-black small text-center text-white-50">
      <div className="container px-4 px-lg-5">Copyright &copy; Your Website 2023</div>
    </footer>
  );
};

export default App;
