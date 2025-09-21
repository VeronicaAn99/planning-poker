import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const randomUserNames = [
	"Alice",
	"Bob",
	"Charlie",
	"Diana",
	"Eve",
	"Frank",
	"Grace",
	"Henry",
	"Ivy",
	"Jack",
	"Kate",
	"Liam",
	"Maya",
	"Noah",
	"Olivia",
	"Paul",
	"Quinn",
	"Ruby",
	"Sam",
	"Tina",
	"Uma",
	"Victor",
	"Wendy",
	"Xavier",
	"Yara",
	"Zoe",
];

export const cardValues = [
	"0",
	"1",
	"2",
	"3",
	"5",
	"8",
	"13",
	"20",
	"40",
	"100",
];
