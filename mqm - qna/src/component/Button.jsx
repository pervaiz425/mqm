import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, variant = "primary", ...rest }) => {
  let bgColor = "#02AB7D";
  if (variant === "secondary") {
    bgColor = "#0E1B6B";
  }
  const buttonStyle = {
    backgroundColor: bgColor,
  };

  return (
    <button
      style={buttonStyle}
      className="text-white  py-2 px-4 rounded-lg"
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
