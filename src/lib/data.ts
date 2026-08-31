export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
];

export type LedgerEntry = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  status: "matched" | "flagged" | "pending";
};

export const ledgerEntries: LedgerEntry[] = [
  { id: "1", merchant: "Stripe Payout", category: "Revenue", amount: 18420.0, status: "matched" },
  { id: "2", merchant: "AWS", category: "Infrastructure", amount: -1284.32, status: "matched" },
  { id: "3", merchant: "Figma Inc", category: "Software", amount: -45.0, status: "matched" },
  { id: "4", merchant: "Unknown Wire", category: "Uncategorized", amount: -3200.0, status: "flagged" },
  { id: "5", merchant: "Payroll — July", category: "Payroll", amount: -42110.55, status: "matched" },
  { id: "6", merchant: "Delta Airlines", category: "Travel", amount: -612.4, status: "pending" },
  { id: "7", merchant: "Notion Labs", category: "Software", amount: -20.0, status: "matched" },
  { id: "8", merchant: "Client — Vantage Co", category: "Revenue", amount: 9800.0, status: "matched" },
];

export type BentoFeature = {
  id: string;
  title: string;
  description: string;
  size: "sm" | "lg";
};

export const bentoFeatures: BentoFeature[] = [
  {
    id: "smart-expenses",
    title: "Smart Expenses",
    description: "Every card swipe is categorized the moment it clears, not at month end.",
    size: "lg",
  },
  {
    id: "bank-sync",
    title: "Bank Sync",
    description: "Connects to 11,000+ institutions and stays in sync automatically.",
    size: "sm",
  },
  {
    id: "daily-insights",
    title: "Daily AI Insights",
    description: "A one-paragraph read on where money moved and why it matters.",
    size: "sm",
  },
  {
    id: "invoice-status",
    title: "Invoice Status",
    description: "See what's paid, what's late, and who to nudge — without opening a spreadsheet.",
    size: "sm",
  },
  {
    id: "upcoming-bills",
    title: "Upcoming Bills",
    description: "A rolling 30-day view of what's due, sorted by urgency.",
    size: "sm",
  },
  {
    id: "anomaly-detection",
    title: "Anomaly Detection",
    description: "Xit flags the transaction that doesn't look like the other 4,000.",
    size: "lg",
  },
];

export type FeatureTab = {
  id: string;
  label: string;
  heading: string;
  body: string;
  stat: { value: string; label: string };
};

export const featureTabs: FeatureTab[] = [
  {
    id: "visibility",
    label: "Visibility",
    heading: "See every account in one ledger",
    body: "Xit pulls balances, cards, and payment processors into a single running total, updated as transactions clear — not as they get imported.",
    stat: { value: "11,000+", label: "connected institutions" },
  },
  {
    id: "forecasting",
    label: "Forecasting",
    heading: "Know your runway before it's a question",
    body: "Recurring revenue and expenses are detected automatically, so your cash position 90 days out is a chart, not a guess.",
    stat: { value: "90 days", label: "forward visibility" },
  },
  {
    id: "automation",
    label: "Automation",
    heading: "Close the books without opening a spreadsheet",
    body: "Categorization, matching, and reconciliation happen continuously. Month-end becomes a five-minute review, not a five-day scramble.",
    stat: { value: "9.4 hrs", label: "saved per close, on average" },
  },
];

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For solo founders getting their books in order.",
    features: ["1 connected account", "Manual categorization", "Monthly summary"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    cadence: "per month",
    description: "For small teams who want the books to run themselves.",
    features: ["Unlimited accounts", "AI categorization", "Daily insights", "Invoice tracking"],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$79",
    cadence: "per month",
    description: "For growing companies with more to reconcile.",
    features: ["Everything in Pro", "Anomaly detection", "Forecasting", "Priority support"],
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "We closed our books in nine minutes last month. It used to take a week and a half of Slack threads.",
    name: "Dana Whitfield",
    role: "Finance Lead, Loop Studio",
  },
  {
    id: "2",
    quote:
      "Xit caught a duplicate vendor charge our old process would have missed for another quarter.",
    name: "Marcus Oyelaran",
    role: "COO, Fieldstone",
  },
  {
    id: "3",
    quote:
      "The daily insight is the only finance email I actually read all the way through.",
    name: "Priya Nataraj",
    role: "Founder, Harbor Goods",
  },
  {
    id: "4",
    quote: "Forecasting used to live in three different spreadsheets. Now it lives in one screen.",
    name: "Ellis Grant",
    role: "Operations Director, Kettlewell",
  },
];

export type FaqCategory = "General" | "Billing" | "Security";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "1",
    category: "General",
    question: "How long does setup take?",
    answer: "Most teams connect their first account and see categorized transactions within ten minutes.",
  },
  {
    id: "2",
    category: "General",
    question: "Does Xit replace my accountant?",
    answer: "No — Xit handles the day-to-day categorization and reconciliation so your accountant spends their time on strategy instead of data entry.",
  },
  {
    id: "3",
    category: "Billing",
    question: "Can I change plans later?",
    answer: "Yes, upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
  },
  {
    id: "4",
    category: "Billing",
    question: "Is there a contract?",
    answer: "No contracts on Pro or Premium. Cancel anytime and keep access through the end of the period you've paid for.",
  },
  {
    id: "5",
    category: "Security",
    question: "How is my bank data protected?",
    answer: "Bank connections use read-only, encrypted tokens. Xit never stores your banking credentials.",
  },
  {
    id: "6",
    category: "Security",
    question: "Is Xit SOC 2 compliant?",
    answer: "Yes, Xit maintains SOC 2 Type II certification, renewed annually.",
  },
];

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The five-minute month-end close, explained",
    excerpt: "What actually has to happen for books to close fast — and what's just habit.",
    date: "Jul 2, 2026",
    readTime: "6 min read",
  },
  {
    id: "2",
    title: "Why anomaly detection beats manual review",
    excerpt: "The math on why a human scanning 4,000 rows misses the one that matters.",
    date: "Jun 18, 2026",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "Runway math every founder should be able to do in their head",
    excerpt: "A simple mental model for cash position that doesn't require a spreadsheet.",
    date: "Jun 4, 2026",
    readTime: "5 min read",
  },
];
