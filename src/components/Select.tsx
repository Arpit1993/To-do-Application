import styled from "@emotion/styled";
import ArrowUpIcon from "../assets/ArrowUp";
import { useEffect, useState, type ReactNode } from "react";

type TOptionContent = {
  content: () => ReactNode;
  value: string;
};

type TSelect = {
  optionsList: TOptionContent[];
  onClickHandle?: (status: string) => void;
  defaultSelected?: string;
};

const Select = styled.div``;

const SelectWrapper = styled.div`
  border: 1px solid #dddddd;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  border: 1px solid #dddddd;
  margin-top: 16px;
  padding: 1rem;
  text-align: left;
`;

const DefaultTextWrapper = styled.p`
  padding: 0px 1rem;
`;

export const SelectComponent = (props: TSelect) => {
  const { optionsList, onClickHandle, defaultSelected } = props;
  const [rotateIcon, setRotateIcon] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultSelected ? defaultSelected : ""
  );
  let itemToDisplay = selectedOption
    ? optionsList.filter((option) => option.value === selectedOption)
    : [optionsList[0]];

  const handleSelectWrapperClick = () => {
    setRotateIcon((prev) => !prev);
    setShowContent((prev) => !prev);
  };

  const handleOptionsClick = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    setRotateIcon((prev) => !prev);
    setShowContent((prev) => !prev);
    onClickHandle(selectedOption);
  };

  useEffect(() => {
    itemToDisplay = optionsList.filter(
      (option) => option.value === selectedOption
    );
  }, [selectedOption]);

  useEffect(() => {
    return () => {
      setRotateIcon(false);
      setShowContent(false);
      setSelectedOption("");
    };
  }, []);

  return (
    <Select>
      <SelectWrapper onClick={handleSelectWrapperClick}>
        <DefaultTextWrapper>{itemToDisplay[0].content()}</DefaultTextWrapper>
        <ArrowUpIcon
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className={rotateIcon ? "rotateDown" : "rotateUp"}
        />
      </SelectWrapper>
      {showContent && (
        <ContentWrapper>
          {optionsList.map((options) => {
            return (
              <p onClick={() => handleOptionsClick(options.value)}>
                {options.content()}
              </p>
            );
          })}
        </ContentWrapper>
      )}
    </Select>
  );
};
