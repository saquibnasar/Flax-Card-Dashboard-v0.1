import React from "react";

interface FontStylesProps {
  fontFamily: string;
}

const FontStyles: React.FC<FontStylesProps> = ({ fontFamily }) => (
  <style jsx global>{`
    body {
      font-family: ${fontFamily}, sans-serif;
    }
  `}</style>
);

export default FontStyles;
