import React, { ReactElement } from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";

interface Button1Props {
  children: React.ReactNode;
}

const Button1: React.FC<Button1Props> = ({ children }) => {
  return (
    <StyledWrapper>
      <button onClick={() => signIn()} className="button">
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10px 24px;
    font-size: 18px;
    // color: #a8f68f; /* Green text */
    // border: 2px solid #a8f68f; /* Green border */
    color: whitesmoke;
    border: 2px solid whitesmoke;
    border-radius: 34px;
    background-color: transparent;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    // background-color: rgb(50, 205, 50); /* Lighter green */
    background-color: #a8f68f;
    // background-color: rgb(193, 163, 98);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .button:hover::before {
    scale: 3;
  }

  .button:hover {
    color: #212121;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
    border-color: #a8f68f;
  }

  .button:active {
    scale: 1;
  }
`;

export default Button1;
