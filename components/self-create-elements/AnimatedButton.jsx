import React from "react";
import "./AnimatedButton.css"; // Make sure to create and import this CSS file

const AnimatedButton = ({ children = "Button" }) => {
  return (
    <button className="animated-button">
      <p>{children}</p>
    </button>
  );
};

export default AnimatedButton;
