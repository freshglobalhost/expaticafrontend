import { NAMES, CITIES } from "./live-activity-data";

const ACTIONS = [
  { type: "deposit" as const, verb: "deposited" },
  { type: "withdraw" as const, verb: "withdrew" },
  { type: "loan" as const, verb: "received a loan of" },
  { type: "invest" as const, verb: "invested" },
  { type: "transfer" as const, verb: "transferred" },
];

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(type: string): number {
  const ranges: Record<string, [number, number]> = {
    deposit: [5_000, 250_000],
    withdraw: [3_000, 180_000],
    loan: [10_000, 500_000],
    invest: [5_000, 200_000],
    transfer: [1_000, 100_000],
  };
  const [min, max] = ranges[type] ?? [1_000, 50_000];
  const raw = min + Math.random() * (max - min);
  return Math.round(raw / 1_000) * 1_000;
}

function randomTimeAgo(): string {
  const minutes = Math.floor(Math.random() * 8) + 1;
  return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
}

export interface ActivityNotification {
  id: string;
  name: string;
  city: string;
  action: string;
  amount: number;
  timeAgo: string;
}

export function generateActivity(): ActivityNotification {
  const action = randomFrom(ACTIONS);
  const name = randomFrom(NAMES);
  const city = randomFrom(CITIES);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    city,
    action: action.verb,
    amount: randomAmount(action.type),
    timeAgo: randomTimeAgo(),
  };
}

export function getHumanInterval(): number {
  return 4000 + Math.random() * 6000;
}
