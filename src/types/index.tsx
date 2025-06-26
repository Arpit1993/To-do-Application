import type { Status } from "../enums";

export type TaskList = {
  taskId: string;
  title: string;
  description: string;
  time: number;
  status: string;
};

type MapList = {
  [Status.PENDING]: string[];
  [Status.IN_PROGRESS]: string[];
  [Status.COMPLETED]: string[];
};

export type Tasks = {
  keys: string[];
  mapList: MapList;
};
