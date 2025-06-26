import styled from "@emotion/styled";
import PlusIcon from "../assets/PlusIcon";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { CardComponent } from "../components/Card";
import {
  mapStatusToTask,
  retrieveItemFromLocalStorage,
  storeItemToLocalStorage,
} from "../utils";
import { Accordion } from "../components/Accordion";
import { statusMap } from "../constants";
import Modal from "../components/Modal";
import { ButtonComponent } from "../components/Button";
import type { TaskList, Tasks } from "../types";

const DashboardWrapper = styled.main``;
const Header = styled.header`
  width: 100%;
  height: 60px;
  font-weight: 600;
  background-color: #034ea2;
  color: #ffffff;
  display: flex;
  align-items: center;
`;

const AddButton = styled.div`
  position: fixed;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #034ea2;
  bottom: 2rem;
  right: 2rem;
  cursor: pointer;
`;

export const Dashboard = () => {
  const [tasks, setTasksList] = useState<Tasks>();
  const [openModal, setOpenModal] = useState<boolean>();
  const [taskId, setTaskId] = useState<string>();
  const [status, setStatus] = useState<string>();
  const navigate = useNavigate();

  const handleEditClick = (taskId: string) => {
    navigate(`/${taskId}`);
  };

  const handleDeleteClick = (taskId: string, status: string) => {
    setTaskId(taskId);
    setStatus(status);
    setOpenModal(true);
  };

  const handleDeleteConfirmClick = () => {
    const obj:Tasks = { ...tasks };
    const list: TaskList[] = obj.mapList?.get(status);
    const filteredItems = list.filter((item) => item.taskId !== taskId);
    obj.mapList?.set(status, filteredItems);

    const filteredList: TaskList[] = [];
    obj.keys?.map((statusKeys) => {
      const itemsOfStatus = obj.mapList?.get(statusKeys);
      itemsOfStatus.forEach((item: TaskList) => {
        filteredList.push(item);
      });
    });
    storeItemToLocalStorage("tasks", filteredList);
    setTasksList({...obj});
    setOpenModal(false);
    setTaskId("");
    setStatus("");
  };

  useEffect(() => {
    const taskList = retrieveItemFromLocalStorage("tasks");
    if (taskList) {
      const filteredList = mapStatusToTask(taskList);
      setTasksList(filteredList);
    }
  }, []);
  return (
    <DashboardWrapper>
      <Header>
        <p style={{ paddingLeft: "1rem" }}>TO-DO APP</p>
      </Header>
      <AddButton onClick={() => navigate("/add")}>
        <PlusIcon
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </AddButton>
      {tasks &&
        tasks.keys.map((status) => {
          const cards = tasks.mapList.get(status);
          return (
            <Accordion label={`${statusMap[status]}(${cards.length})`} key={status}>
              {cards.map((task: TaskList) => {
                return (
                  <CardComponent
                    time={task.time}
                    taskId={task.taskId}
                    description={task.description}
                    status={task.status}
                    title={task.title}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    key={task.taskId}
                  />
                );
              })}
            </Accordion>
          );
        })}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ marginTop: "1rem" }}>
            {" "}
            Are you sure you want to delete the task with id {taskId} ?
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ButtonComponent
              label={"Cancel"}
              type={"primary"}
              onClickHandler={() => setOpenModal(false)}
            />
            <ButtonComponent
              label={"Confirm"}
              onClickHandler={handleDeleteConfirmClick}
            />
          </div>
        </div>
      </Modal>
    </DashboardWrapper>
  );
};
