interface modelsProps {
  id: string;
  name: string;
  category: string;
  description: string;
  examplePolls: string[];
  orbHue?: number;
  imgUrl?: string;
}

export const models: modelsProps[] = [
  {
    id: "sport",
    name: "Sports",
    category: "sport",
    description:
      "Make predictions about sports events, team performance, player statistics, and tournament outcomes. This model analyzes historical match data, player statistics, team rankings, and current form to help users create informed predictions.",
    examplePolls: [
      "Who will win the NBA Finals?",
      "Will Team X score more than 3 goals in their next match?",
      "Which player will be the top scorer this season?",
      "Will there be more than 2.5 goals in the upcoming match?",
    ],
    orbHue: 40,
    imgUrl: "/images/agent-sport.jpg",
  },
  {
    id: "crypto",
    name: "Crypto",
    category: "crypto",
    description:
      "Create predictions about cryptocurrency price movements, market trends, and adoption metrics. This model incorporates market sentiment analysis, trading volumes, historical price data, and broader market indicators.",
    examplePolls: [
      "Will Bitcoin exceed $X by end of month?",
      "Which cryptocurrency will have the highest percentage gain this week?",
      "Will there be a new all-time high for ETH this quarter?",
      "Which DeFi protocol will have the highest TVL?",
    ],
    orbHue: 210,
    imgUrl: "/images/agent-crypto.jpg",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    category: "entertainment",
    description:
      "Predict outcomes in entertainment industry events, including award shows, box office performance, streaming rankings, and content popularity. This model analyzes social media trends, critic reviews, and historical entertainment data.",
    examplePolls: [
      "Which movie will win Best Picture at the Oscars?",
      "Will this upcoming movie gross over $X million in its opening weekend?",
      "Which song will top the Billboard Hot 100 next week?",
      "Will this TV show get renewed for another season?",
    ],
    orbHue: 270,
    imgUrl: "/images/agent-entertainment.jpg",
  },
  {
    id: "politics",
    name: "Politics",
    category: "politics",
    description:
      "Create predictions about election outcomes, policy changes, and political events. This model analyzes polling data, historical voting patterns, demographic information, and current political trends while maintaining neutrality.",
    examplePolls: [
      "What will be the voter turnout percentage in the upcoming election?",
      "Will Bill X pass in the legislature?",
      "What will be the approval rating in the next poll?",
      "Which candidate will win in District Y?",
    ],
    orbHue: 330,
    imgUrl: "/images/agent-politics.jpg",
  },
];

export type CategoryColors = {
  [key: string]: string;
};
export const categoryColors: CategoryColors = {
  sports: "from-green-600 to-green-800",
  crypto: "from-blue-600 to-blue-800",
  entertainment: "from-purple-600 to-purple-800",
  politics: "from-red-600 to-red-800",
};

export function getModelById(id: string): modelsProps | undefined {
  return models.find((model) => model.id === id);
}
