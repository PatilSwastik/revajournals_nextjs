import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateTransactionId() {
  // Generate random bytes and convert to hex string
  const randomPart = crypto.randomBytes(8).toString("hex");

  // Use the current timestamp to ensure uniqueness
  const timestamp = Date.now().toString(); // Get the current timestamp in milliseconds

  // Combine both to form a unique ID
  return `TXN-${timestamp}-${randomPart}`.slice(0, 38);
}
