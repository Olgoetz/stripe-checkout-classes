import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkHasProperties(obj: any, properties: string[]) {
  let missingProperties: string[] = [];
  properties.forEach((property) => {
    if (!obj.hasOwnProperty(property)) {
      missingProperties.push(property);
    }
  });
  return missingProperties;
}

export function isDateOlder(dateString: string, timeString: string) {
  // Split the date string into an array [day, month, year]
  const dateArray = dateString.split(".");
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1;
  let year = parseInt(dateArray[2]);
  const startTime = timeString.slice(0, 5).replace(/\s/g, "");

  if (year < 2000) {
    year = year + 2000;
  }

  // Create a Date object with the given date and time
  const startDate = new Date(
    year,
    month,
    day,
    parseInt(startTime.slice(0, 2)),
    parseInt(startTime.slice(3, 5))
  );

  const today = new Date();

  // Compare the two dates
  if (startDate < today) {
    return false;
  } else {
    return true;
  }
}
