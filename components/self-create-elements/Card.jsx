"use client";
import React, { useState } from "react";
import styled from "styled-components";

const inputTypes = [
  "text",
  "password",
  "email",
  "search",
  "tel",
  "url",
  "number",
  "range",
  "date",
  "datetime-local",
  "month",
  "week",
  "time",
  "checkbox",
  "radio",
  "file",
  "image",
  "color",
  "button",
  "submit",
  "reset",
  "hidden",
];

const inputObject = (placeholder, type) => ({ placeholder, type });

const Card = () => {
  const [inputFields, setInputFields] = useState([]);
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__content">
          <h1 className="text-white font-bold text-4xl">
            HTML + JS Input Form Generator
          </h1>

          <div></div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 1rem;
  .card {
    width: 100%;
    max-width: 120rem;
    height: 40rem;
    border-radius: 20px;
    padding: 5px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  }

  .card__content {
    background: rgb(5, 6, 45);
    border-radius: 17px;
    width: 100%;
    height: 100%;
    font-family: "Google Sans Code", monospace;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .card {
      padding: 1rem;
    }

    .card__content {
      padding: 1rem;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
`;

export default Card;
