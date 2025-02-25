"use client";
import { Users, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlaceBetModal } from "./place-bet-modal";
import { useRouter } from "next/navigation";

export const polls = [
  {
    id: "1",
    question: "Which repo gets more stars: Next.js vs SvelteKit?",
    daysLeft: 2,
    totalDays: 7,
    totalStaked: 12.5,
    participants: 48,
    answers: [
      "Next.js will have more stars",
      "SvelteKit will have more stars",
      "Next.js will have more stars",
      "SvelteKit will have more stars",
    ],
  },
  {
    id: "2",
    question: "Will Rust reach 100k GitHub stars first, or Go?",
    daysLeft: 5,
    totalDays: 14,
    totalStaked: 8.2,
    participants: 32,
    answers: [
      "Rust will reach 100k first",
      "Go will reach 100k first",
      "Rust will reach 100k first",
      "Go will reach 100k first",
    ],
  },
  {
    id: "3",
    question: "Higher Discord growth: Solana or Arbitrum?",
    daysLeft: 3,
    totalDays: 10,
    totalStaked: 15.8,
    participants: 64,
    answers: [
      "Solana will grow more",
      "Arbitrum will grow more",
      "Solana will grow more",
      "Arbitrum will grow more",
    ],
  },
];

export interface Poll {
  id: string;
  question: string;
  daysLeft: number;
  totalDays: number;
  totalStaked: number;
  participants: number;
  answers?: string[];
}

const PollCard = ({ poll }: { poll: Poll }) => {
  const router = useRouter();
  const progress = ((poll.totalDays - poll.daysLeft) / poll.totalDays) * 100;

  return (
    <Card
      className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => router.push(`/poll/bet-poll/${poll.id}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader>
        <CardTitle className="line-clamp-2 text-xl">{poll.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{poll.daysLeft} days left</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <div className="space-y-0.5">
              <p className="text-sm text-muted-foreground">Total Staked</p>
              <p className="font-medium">{poll.totalStaked} ETH</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div className="space-y-0.5">
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="font-medium">{poll.participants}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-5">
        <PlaceBetModal poll={poll} />
      </CardFooter>
    </Card>
  );
};

export default function PollList() {
  const totalStaked = polls.reduce((acc, poll) => acc + poll.totalStaked, 0);
  const totalParticipants = polls.reduce(
    (acc, poll) => acc + poll.participants,
    0
  );

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Active Predictions
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Place your bets on the future
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:ml-auto">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-4 w-4" />
                  Total Staked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalStaked} ETH</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-4 w-4" />
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalParticipants}</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </div>
    </div>
  );
}
