import styled from "@emotion/styled";
import SearchIcon from "../assets/SearchIcon";
import { InputComponent } from "./Input";

type TInput = {
  placeholder?: string;
  onClickHandler?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles?: any;
};

const InputWrapper = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 16px;
`;

export const InputWithSearch = (props: TInput) => {
  const { placeholder, onClickHandler, customStyles } = props;
  return (
    <InputWrapper>
      <ImageWrapper>
        <SearchIcon />
      </ImageWrapper>
      <InputComponent
        placeholder={placeholder}
        onClickHandler={onClickHandler}
        customStyles={customStyles}
      />
    </InputWrapper>
  );
};
