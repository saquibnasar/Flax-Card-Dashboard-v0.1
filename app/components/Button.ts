"use client";

import { styled } from "styled-components";

// colors: {
//     // t -> text, s -> surface, i -> inverted, a -> accent, d -> divider
//     primary: "#121212",
//     white: "#FFFFFF",
//     black: "#111111",
//     tSecondary: "#8A8A8D",
//     sSecondary: "#F7F7F7",
//     blue: "#4353FF",
//     lightblue: "#505FFF",
//     sPrimary: "#FFFFFF",
//     iPrimary: "#121212",
//     iSecondary: "#404040",
//     aPurple: "#708DF7",
//     aRed: "#FF4D4F",
//     aGreen: "#25BD3E",
//     dPrimary: "#C6C6C8",
//     dSecondary: "#E9E9E9",
//   }

interface ButtonProps {
  primary?: boolean;
  accent?: boolean;
  width?: string;
  color?: string;
}

const Button = styled.button<ButtonProps>`
  background: ${(props) =>
    props.primary ? "#4353ff" : props.accent ? "" : "#111111"};
  border-radius: 12px;
  width: ${(props) => props.width || "100%"};
  color: ${(props) => (props.accent ? "#111111" : "#ffffff")};
  padding: 10px 8px;
  transition: all;
  transition-duration: 150ms;
  &:hover {
    scale: 0.98;
  }
  &:active {
    scale: 0.96;
  }
`;

export default Button;
