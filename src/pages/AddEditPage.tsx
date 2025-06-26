import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router";
import GoBackIcon from "../assets/GoBackIcon";
import { InputComponent } from "../components/Input";
import { TextAreaComponent } from "../components/TextArea";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../components/Button";
import {
  retrieveItemFromLocalStorage,
  storeItemToLocalStorage,
} from "../utils";
import { v4 as uuidv4 } from "uuid";
import { SelectComponent } from "../components/Select";
import { optionsList } from "../data";
import { TaskFlow } from "../enums";
import type { TaskList } from "../types";

const AddEditWrapper = styled.main``;

const Header = styled.header`
  width: 100%;
  height: 60px;
  font-weight: 600;
  background-color: #034ea2;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BodyWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddEditPage = () => {
  const [title, setTitle] = useState<string>();
  const [details, setDetails] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };
  const handleCancelButtonClick = () => {
    navigate(-1);
  };
  const handleSelect = (status: string) => {
    setSelectedStatus(status);
  };
  const handleAddUpdateButtonClick = () => {
    if (id === TaskFlow.ADD) {
      const taskDetails = {
        taskId: uuidv4(),
        title,
        description: details,
        time: Date.now(),
        status: "pending",
      };
      const taskList = retrieveItemFromLocalStorage("tasks");
      if (!taskList) {
        storeItemToLocalStorage("tasks", [taskDetails]);
      } else {
        taskList.push(taskDetails);
        storeItemToLocalStorage("tasks", taskList);
      }
    } else {
      const taskList = retrieveItemFromLocalStorage("tasks");
      const filteredList = taskList.filter((task: TaskList) => {
        return task.taskId !== id;
      });
      filteredList.push({
        taskId: id,
        title,
        description: details,
        status: selectedStatus || status,
        time: Date.now(),
      });
      storeItemToLocalStorage("tasks", filteredList);
    }
    setTitle("");
    setDetails("");
    navigate(-1);
  };
  useEffect(() => {
    if (id !== TaskFlow.ADD) {
      const taskList = retrieveItemFromLocalStorage("tasks");
      const details = taskList.filter((task: TaskList) => {
        return task.taskId === id;
      });

      setTitle(details[0].title);
      setDetails(details[0].description);
      setStatus(details[0].status);
    }
  }, []);
  return (
    <AddEditWrapper>
      <Header>
        <p style={{ paddingLeft: "1rem", cursor: "pointer" }}>
          <GoBackIcon onClick={() => navigate(-1)} />
        </p>
        <p>{id === TaskFlow.ADD ? "Add Task" : "Edit Task"}</p>
      </Header>
      <BodyWrapper>
        <InputComponent
          placeholder={"Enter the title"}
          onChangeHandler={handleInputChange}
          defaultValue={title}
          customStyles={{ height: "30px" }}
        />
        <TextAreaComponent
          placeholder={"Enter the details"}
          onChangeHandler={handleTextAreaChange}
          defaultValue={details}
          customStyles={{ height: "70px" }}
        />
        {id !== TaskFlow.ADD && status && (
          <SelectComponent
            optionsList={optionsList}
            defaultSelected={status}
            onClickHandle={handleSelect}
          />
        )}
        <ActionWrapper>
          <ButtonComponent
            label={"Cancel"}
            customStyles={{ padding: "1rem 2rem" }}
            onClickHandler={handleCancelButtonClick}
          />
          <ButtonComponent
            label={id === TaskFlow.ADD ? "ADD" : "Update"}
            type={"primary"}
            customStyles={{ padding: "1rem 2rem" }}
            onClickHandler={handleAddUpdateButtonClick}
          />
        </ActionWrapper>
      </BodyWrapper>
    </AddEditWrapper>
  );
};
