import React from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";

interface Button1Props {
  children: React.ReactNode;
}

const Button2: React.FC<Button1Props> = ({ children }) => {
  return (
    <StyledWrapper>
      <button onClick={() => signIn()}> {children}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    padding: 1.3em 3em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    white-space: nowrap; /* Fix for text wrapping */
  }

  button:hover {
    background-color: #a8f68f;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  button:active {
    transform: translateY(-1px);
  }
`;

export default Button2;
