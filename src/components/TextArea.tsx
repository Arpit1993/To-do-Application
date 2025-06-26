import styled from "@emotion/styled";

type TTextArea = {
  placeholder?: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles?: any;
  defaultValue?: string;
};

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dddddd;
  resize: none;
  padding: 1rem;
`;

export const TextAreaComponent = (props: TTextArea) => {
  const { placeholder, onChangeHandler, customStyles, defaultValue } = props;
  return (
    <TextArea
      placeholder={placeholder}
      onChange={onChangeHandler}
      style={customStyles}
      defaultValue={defaultValue}
    />
  );
};
