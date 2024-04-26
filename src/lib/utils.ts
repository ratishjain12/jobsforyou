import { type ClassValue, clsx } from "clsx";
import { formatDistance, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): String {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);
}

export function formatDate(date: Date): String {
  return formatDistance(subDays(date, 3), date, {
    addSuffix: true,
  });
}
