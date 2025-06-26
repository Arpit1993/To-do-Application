import styled from "@emotion/styled";
import ClockIcon from "../assets/ClockIcon";
import { returnFormattedDate } from "../utils";
import PencilIcon from "../assets/PencilIcon";
import DeleteIcon from "../assets/DeleteIcon";
import { statusMap } from "../constants";

type TCard = {
  taskId: string;
  title: string;
  description: string;
  time: number;
  status: string;
  onEditClick?: (taskId: string) => void;
  onDeleteClick?: (taskId: string, status: string) => void;
};

const Card = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const TitleStatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Title = styled.p`
  font-weight: 600;
  color: #034ea2;
`;

const Status = styled.p`
  padding-left: 8px;
`;
const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DateContent = styled.p`
  color: #767676;
`;
const DateActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  &:hover{
    & > div{
      display: ${(props) =>
        props.currentStatus === "completed" ? "none" : "flex"}
  }
`;
const EditDeleteWrapper = styled.div`
  display: none;
  gap: 1rem;
`;
export const CardComponent = (props: TCard) => {
  const {
    taskId,
    title,
    time,
    status,
    description,
    onEditClick,
    onDeleteClick,
  } = props;

  return (
    <Card className={"card-content"}>
      <ClockIcon />
      <ContentWrapper>
        <TitleStatusWrapper>
          <Title>{title}</Title>
          <StatusWrapper>
            <p className={`${status.replace("_", "-")}`}></p>
            <Status>{statusMap[status]}</Status>
          </StatusWrapper>
        </TitleStatusWrapper>
        <p>{description}</p>
        <DateActionWrapper currentStatus={status}>
          <DateContent>{returnFormattedDate(time)}</DateContent>
          <EditDeleteWrapper>
            <PencilIcon onClick={() => onEditClick(taskId)} />
            <DeleteIcon onClick={() => onDeleteClick(taskId, status)} />
          </EditDeleteWrapper>
        </DateActionWrapper>
      </ContentWrapper>
    </Card>
  );
};
