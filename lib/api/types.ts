export type ApiUser = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  initials: string;
  display_name: string;
  account_reference: string;
  phone: string;
  country: string;
  currency_code: string;
  address: string | null;
  gender: string | null;
  gender_label: string | null;
  profile_picture: string | null;
  profile_picture_url: string | null;
  kyc_status: string;
  has_transaction_pin: boolean;
  is_kyc_verified: boolean;
  is_profile_complete: boolean;
  enable_transfer: boolean;
  assigned_bank_account: ApiAssignedBankAccount | null;
  date_joined: string;
};

export type ApiAssignedBankAccount = {
  account_holder: string;
  bank_name: string;
  account_number: string;
  routing_or_swift: string;
  country: string;
  currency: string;
  instructions: string;
};

export type ApiWallet = {
  id: number;
  currency_code: string;
  balance: string;
  btc_balance: string;
  eth_balance: string;
  usdt_balance: string;
  sol_balance: string;
  bnb_balance: string;
  ltc_balance: string;
  created_at: string;
  updated_at: string;
};

export type ApiTransaction = {
  id: number;
  direction: "credit" | "debit";
  category: string;
  amount: string;
  currency_code: string;
  status: string;
  reference_code: string;
  description: string;
  counterparty_name: string;
  crypto_symbol: string | null;
  crypto_amount: string | null;
  transaction_hash: string;
  proof_image: string | null;
  proof_image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiLoanRepayment = {
  id: number;
  amount: string;
  due_on: string;
  paid_on: string | null;
  created_at: string;
};

export type ApiLoanProduct = {
  id: number;
  slug: string;
  name: string;
  description: string;
  minimum_amount: string;
  maximum_amount: string;
  minimum_interest_rate: string;
  available_terms_months: number[];
  is_active: boolean;
};

export type ApiLoanApplication = {
  id: number;
  product: number;
  product_name: string;
  product_slug: string;
  reference_code: string;
  requested_amount: string;
  term_months: number;
  purpose: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ApiTransferMethod = {
  id: number;
  slug: string;
  name: string;
  category: string;
  display_order: number;
  is_active: boolean;
};

export type ApiTransfer = {
  id: number;
  method: number;
  method_name: string;
  method_slug: string;
  amount: string;
  fee_amount: string;
  status: string;
  reference_code: string;
  recipient_details: Record<string, string>;
  note: string;
  created_at: string;
  updated_at: string;
};

export type CryptoAsset = {
  symbol: string;
  name: string;
  network_name: string;
  deposit_wallet_address: string;
  minimum_deposit_amount: string;
  required_confirmations: number;
};

export type ApiLoan = {
  id: number;
  product: number;
  product_name: string;
  reference_code: string;
  principal_amount: string;
  interest_rate: string;
  term_months: number;
  status: string;
  applied_on: string;
  disbursed_on: string | null;
  outstanding_balance: string;
  repayments?: ApiLoanRepayment[];
  created_at: string;
  updated_at: string;
};

export type ApiVirtualCard = {
  id: number;
  card_name: string;
  cardholder_name: string;
  network: string;
  theme: string;
  masked_card_number: string;
  last_four_digits: string;
  expiry_date: string;
  is_frozen: boolean;
  spending_limit: string;
  monthly_spent_amount: string;
  balance: string;
  created_at: string;
  updated_at: string;
};

export type CardSensitiveDetails = {
  card_number: string;
  card_number_raw: string;
  cvv: string;
  cardholder_name: string;
};

export type ApiNotification = {
  id: string;
  title: string;
  message: string;
  created_at: string;
  unread: boolean;
  type: "warning" | "success" | "info";
};

export type DashboardSummary = {
  user: ApiUser;
  primary_wallet: ApiWallet | null;
  primary_wallet_balance: string;
  total_balance: string;
  deposit_balance: string;
  loan_balance: string;
  currency_code: string;
  btc_balance: string;
  eth_balance: string;
  usdt_balance: string;
  sol_balance: string;
  bnb_balance: string;
  ltc_balance: string;
  recent_transactions: ApiTransaction[];
  recent_transactions_count: number;
  active_loans: ApiLoan[];
  virtual_cards: ApiVirtualCard[];
  notifications: ApiNotification[];
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiSavingsGoal = {
  id: number;
  goal_name: string;
  target_amount: string;
  saved_amount: string;
  target_date_label: string;
  created_at: string;
  updated_at: string;
};

export type ApiLockedSavings = {
  id: number;
  account_name: string;
  locked_amount: string;
  interest_rate_label: string;
  unlocks_on: string;
  created_at: string;
  updated_at: string;
};

export type ApiAutoSaveRule = {
  id: number;
  rule_name: string;
  description: string;
  is_enabled: boolean;
  total_saved_amount: string;
  rule_settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type ApiSavingsTransaction = {
  id: number;
  reference_code: string;
  transaction_type: string;
  amount: string;
  goal: number | null;
  goal_name: string | null;
  created_at: string;
};

export type ApiInvestmentPlan = {
  id: number;
  slug: string;
  name: string;
  minimum_amount: string;
  maximum_amount: string;
  return_type: "percent" | "fixed";
  return_value: string;
  duration_label: string;
  returns_capital: boolean;
  is_active: boolean;
  display_order: number;
};

export type ApiUserInvestment = {
  id: number;
  plan: number;
  plan_name: string;
  plan_slug: string;
  reference_code: string;
  invested_amount: string;
  expected_return_amount: string;
  status: string;
  matures_at: string;
  created_at: string;
  updated_at: string;
};

export type ApiHelpCategory = {
  id: number;
  slug: string;
  name: string;
  display_order: number;
};

export type ApiHelpArticle = {
  id: number;
  category: number;
  category_name: string;
  slug: string;
  title: string;
  body: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ApiFaq = {
  id: number;
  question: string;
  answer: string;
  category: number | null;
  category_name: string | null;
  display_order: number;
  is_published: boolean;
};
