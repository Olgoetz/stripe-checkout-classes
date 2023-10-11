import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { server } from "typescript";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDateOlder(dateString: string) {
  // Split the date string into an array [day, month, year]
  const dateArray = dateString.split(".");
  console.log(dateArray);

  // Month is zero-based in JavaScript Date object, so subtract 1
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1;
  let year = parseInt(dateArray[2]);

  if (year < 2000) {
    year = year + 2000;
  }

  console.log(day);
  console.log(month);
  console.log(year);
  // Create a Date object with the given date
  const inputDate = new Date(year, month, day);

  // Get today's date
  const today = new Date();

  // Compare the two dates
  return inputDate < today;
}
