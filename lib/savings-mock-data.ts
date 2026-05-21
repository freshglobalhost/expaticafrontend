export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  icon: string;
  color: string;
}

export const SAVINGS_GOALS: SavingsGoal[] = [
  { id: "g1", name: "Emergency Fund", target: 10000, saved: 7200, deadline: "Dec 2026", icon: "🛡️", color: "from-brand-500 to-brand-600" },
  { id: "g2", name: "Vacation", target: 5000, saved: 2100, deadline: "Aug 2026", icon: "✈️", color: "from-cyan-500 to-blue-600" },
  { id: "g3", name: "New Car", target: 25000, saved: 8500, deadline: "Jun 2027", icon: "🚗", color: "from-purple-500 to-indigo-600" },
];

export const LOCKED_SAVINGS = [
  { id: "l1", name: "12-Month Fixed", amount: 15000, rate: "5.2% APY", unlockDate: "Nov 14, 2026", locked: true },
  { id: "l2", name: "6-Month Boost", amount: 5000, rate: "4.8% APY", unlockDate: "Aug 2, 2026", locked: true },
];

export const AUTO_SAVE_RULES = [
  { id: "a1", name: "Round-ups", description: "Round up card purchases to nearest $1", enabled: true, amount: 124 },
  { id: "a2", name: "Payday save", description: "10% of incoming deposits", enabled: true, amount: 850 },
  { id: "a3", name: "Weekly transfer", description: "$50 every Monday", enabled: false, amount: 0 },
];

export const SAVINGS_ANALYTICS = {
  totalSaved: 28500,
  monthlyGrowth: 8.4,
  interestEarned: 342,
  chart: [
    { month: "Jan", amount: 18200 },
    { month: "Feb", amount: 19800 },
    { month: "Mar", amount: 21500 },
    { month: "Apr", amount: 24200 },
    { month: "May", amount: 26800 },
    { month: "Jun", amount: 28500 },
  ],
};

export const SAVINGS_HISTORY = [
  { id: "SAV-101", date: "2026-05-20", type: "Deposit", amount: 500, goal: "Emergency Fund" },
  { id: "SAV-100", date: "2026-05-18", type: "Auto-save", amount: 47, goal: "Round-ups" },
  { id: "SAV-99", date: "2026-05-15", type: "Interest", amount: 28.5, goal: "12-Month Fixed" },
  { id: "SAV-98", date: "2026-05-10", type: "Deposit", amount: 200, goal: "Vacation" },
  { id: "SAV-97", date: "2026-05-01", type: "Auto-save", amount: 850, goal: "Payday save" },
];
