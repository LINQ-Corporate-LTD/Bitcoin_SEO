// src/components/ValidateSlugRoute.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Error404 from "./Error404";

/**
 * Generic slug validator for any route.
 * @param {function} validate - function(slug) → returns true if valid
 * @param {ReactNode} children - page to render if valid
 */
function ValidateSlugRoute({ validate, children }) {
  const { slug } = useParams();

  // If validation fails → show 404
  if (!validate(slug)) {
    return <Error404 />;
  }

  // Otherwise, render the page normally
  return children;
}

export default ValidateSlugRoute;