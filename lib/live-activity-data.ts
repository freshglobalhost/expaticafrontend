/** 100 international first names for live activity feed */
export const NAMES = [
  "Michael", "Sarah", "James", "Emily", "David", "Jessica", "Robert", "Amanda",
  "Christopher", "Lisa", "Daniel", "Jennifer", "Matthew", "Ashley", "Andrew", "Nicole",
  "Ryan", "Stephanie", "Kevin", "Rachel", "Brian", "Lauren", "Jason", "Megan",
  "Justin", "Hannah", "Brandon", "Samantha", "Tyler", "Olivia", "Eric", "Sophia",
  "Jacob", "Emma", "Nathan", "Isabella", "Aaron", "Chloe", "Adam", "Grace",
  "Peter", "Victoria", "Mark", "Natalie", "Paul", "Brooke", "Steven", "Lily",
  "Kenneth", "Zoe", "Joshua", "Audrey", "Timothy", "Claire", "Benjamin", "Ella",
  "Samuel", "Ava", "Patrick", "Scarlett", "Alexander", "Madison", "Jack", "Layla",
  "Henry", "Nora", "Oliver", "Hazel", "William", "Violet", "Thomas", "Stella",
  "Charles", "Lucy", "George", "Alice", "Edward", "Ruby", "Joseph", "Eleanor",
  "Richard", "Mia", "Anthony", "Leah", "Donald", "Anna", "Ronald", "Eva",
  "Carlos", "Maria", "Marco", "Sofia",
  "Thabo", "Nomsa", "Sipho", "Zanele", "Lerato", "Johan", "Anele", "Kamogelo",
  "Thandiwe", "Pieter", "Blessing", "Darren", "Keisha", "Marcus", "Keshaun",
  "Candice", "Kieron", "Anya", "Ravi",
] as const;

/** 100 global cities for live activity feed */
export const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego",
  "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Columbus", "Seattle", "Denver",
  "Boston", "Nashville", "Portland", "Las Vegas", "Miami", "Atlanta", "Toronto", "Vancouver",
  "Montreal", "Calgary", "Ottawa", "London", "Manchester", "Birmingham", "Edinburgh", "Dublin",
  "Paris", "Lyon", "Marseille", "Berlin", "Munich", "Hamburg", "Frankfurt", "Amsterdam",
  "Rotterdam", "Brussels", "Zurich", "Geneva", "Vienna", "Madrid", "Barcelona", "Rome",
  "Milan", "Lisbon", "Stockholm", "Oslo", "Copenhagen", "Helsinki", "Warsaw", "Prague",
  "Budapest", "Athens", "Dubai", "Abu Dhabi", "Riyadh", "Tel Aviv", "Istanbul", "Moscow",
  "Singapore", "Hong Kong", "Tokyo", "Osaka", "Seoul", "Beijing", "Shanghai", "Shenzhen",
  "Mumbai", "Delhi", "Bangalore", "Sydney", "Melbourne", "Brisbane", "Auckland", "Wellington",
  "São Paulo", "Rio de Janeiro", "Buenos Aires", "Santiago", "Mexico City", "Bogotá", "Lima", "Johannesburg",
  "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Port of Spain", "San Fernando", "Chaguanas", "Arima",
  "Nairobi", "Cairo", "Manila", "Bangkok", "Kuala Lumpur", "Jakarta", "Taipei",
  "Ho Chi Minh City", "Hanoi", "Doha", "Kuwait City",
] as const;

/** Fixed seed items — same on server and client to avoid hydration mismatch */
export const INITIAL_LIVE_ACTIVITIES = [
  {
    id: "live-seed-1",
    name: "Sarah",
    city: "Cape Town",
    action: "deposited",
    amount: 12500,
    timeAgo: "2 minutes ago",
  },
  {
    id: "live-seed-2",
    name: "Thabo",
    city: "Johannesburg",
    action: "invested",
    amount: 48000,
    timeAgo: "4 minutes ago",
  },
] as const;
