import styled from "@emotion/styled";

type TButton = {
  label: string;
  onClickHandler?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles?: any;
  type?: string;
};

const Button = styled.button`
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.buttonType ? "#034EA2" : "#ffffff")};
  color: ${(props) => (props.buttonType ? "#ffffff" : "#034EA2")};
  border: 1px solid #034ea2;
  &:hover {
    background-color: ${(props) => (props.buttonType ? "#1070db" : "#ffffff")};
    color: ${(props) => (props.buttonType ? "#ffffff" : "#034EA2")};
  }
`;

export const ButtonComponent = (props: TButton) => {
  const { type, label, onClickHandler, customStyles } = props;
  return (
    <Button onClick={onClickHandler} style={customStyles} buttonType={type}>
      {label}
    </Button>
  );
};
