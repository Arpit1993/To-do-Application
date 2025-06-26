import type { TaskList } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storeItemToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieveItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const returnFormattedDate = (milliseconds: number) => {
  const dateObject = new Date(milliseconds);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const dayOfMonth = dateObject.getDate();
  const dayOfWeekIndex = dateObject.getDay();
  const dayName = days[dayOfWeekIndex];

  return `${dayName} ${dayOfMonth}, ${monthNames[month]} ${year}`;
};

export const mapStatusToTask = (list: TaskList[]) => {
  const mapList = new Map();
  list.forEach((item) => {
    if (mapList.has(item.status)) {
      const existingValues = mapList.get(item.status);
      existingValues.push(item);
      mapList.set(item.status, existingValues);
    } else {
      mapList.set(item.status, [item]);
    }
  });

  return {
    keys: Array.from(mapList.keys()),
    mapList,
  };
};
