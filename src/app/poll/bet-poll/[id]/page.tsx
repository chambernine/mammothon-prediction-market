import { notFound } from "next/navigation";
import { Wallet, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlaceBetModal } from "@/components/custom/place-bet-modal";

interface PollDetailPageProps {
  params: {
    id: string;
  };
}

export default function PollDetailPage({ params }: PollDetailPageProps) {
  //   const poll = polls.find((p) => p.id === params.id);

  const poll = {
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
  };

  if (!poll) {
    notFound();
  }

  const progress = ((poll.totalDays - poll.daysLeft) / poll.totalDays) * 100;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">{poll.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{poll.daysLeft} days left</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-sm text-muted-foreground">Total Staked</p>
                  <p className="text-xl font-medium">{poll.totalStaked} ETH</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-xl font-medium">{poll.participants}</p>
                </div>
              </div>
            </div>

            {poll.answers && poll.answers.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Available Options</h3>
                <div className="grid gap-2">
                  {poll.answers.map((answer, index) => (
                    <div key={index} className="rounded-md border p-3">
                      {answer}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <PlaceBetModal poll={poll} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
