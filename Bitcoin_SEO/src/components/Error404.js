import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import "./../assets/css/Error404.css";

const Error404 = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <>
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <Navbar forceScrolled />
          <section className="NotFound_wrapper__kaIf6">
            <article className="NotFound_container__gxkP1">
              <h1 className="NotFound_heading1__5SPIO">Error 404</h1>
              <h2 className="NotFound_heading2__kSDqo">This page could not be found</h2>
              <p className="NotFound_para__nRriz">
                Sorry, the page you’re looking for wasn’t found. You may be able to find what you need
                <br />
                through&nbsp;the&nbsp;home&nbsp;page.
              </p>
              <a className="NotFound_button__5O4fA" href="/contact-us">Contact Us</a>
              <a className="NotFound_button__5O4fA NotFound_yellow__hkEXr" href="/">Go to home</a>
            </article>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Error404;
