import styled from "@emotion/styled";
import { useState, type ReactNode } from "react";
import ArrowUpIcon from "../assets/ArrowUp";

const AccordionWrapper = styled.article`
  margin: 1rem 0;
`;
const AccordionTabWrapper = styled.div`
  position: relative;
`;
const AccordionTab = styled.div`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #f3f6f9;
  background-color: #f3f6f9;
  padding: 8px 16px;
  text-align: left;
  cursor: pointer;
`;

export const Accordion = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const [rotateIcon, setRotateIcon] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const handleAccordionTabClick = () => {
    setRotateIcon((prev) => !prev);
    setShowContent((prev) => !prev);
  };
  return (
    <AccordionWrapper>
      <AccordionTabWrapper onClick={handleAccordionTabClick}>
        {" "}
        <AccordionTab>{label}</AccordionTab>
        <ArrowUpIcon
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className={rotateIcon ? "rotateDown" : "rotateUp"}
        />
      </AccordionTabWrapper>
      {showContent && children}
    </AccordionWrapper>
  );
};
