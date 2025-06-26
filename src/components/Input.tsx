import styled from "@emotion/styled";

type TInput = {
  placeholder?: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles?: any;
  defaultValue?: string;
};

const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding: 1rem;
`;

export const InputComponent = (props: TInput) => {
  const { placeholder, onChangeHandler, customStyles, defaultValue } = props;
  return (
    <Input
      placeholder={placeholder}
      onChange={onChangeHandler}
      style={customStyles}
      defaultValue={defaultValue}
    />
  );
};
