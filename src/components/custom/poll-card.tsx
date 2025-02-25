"use client";

import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, Share } from "lucide-react";

interface Poll {
  id: number;
  question: string;
  options: string[];
}

const samplePolls: Poll[] = [
  {
    id: 1,
    question: "Should pineapple be on pizza?",
    options: ["Definitely Yes", "Maybe Yes", "Maybe No", "Definitely No"],
  },
  {
    id: 2,
    question: "Is a hotdog a sandwich?",
    options: ["Absolutely", "Kind of", "Not really", "No way"],
  },
  {
    id: 3,
    question: "Tabs or spaces?",
    options: ["Tabs", "Spaces", "Both", "Neither"],
  },
  {
    id: 4,
    question: "Do you like coding?",
    options: ["Yes", "No", "Sometimes", "I don't know"],
  },
  {
    id: 5,
    question: "Is JavaScript the best programming language?",
    options: ["Yes", "No", "Maybe", "I don't care"],
  },
  {
    id: 6,
    question: "Do you prefer dark mode?",
    options: ["Yes", "No", "Sometimes", "I don't care"],
  },
];

export function PollCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // Handle vote
      console.log("Voted on poll:", samplePolls[currentIndex]);
    }
    setDirection(direction === "left" ? -1 : 1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % samplePolls.length);
      setDirection(0);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[80vh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{
            x: direction === -1 ? 300 : direction === 1 ? -300 : 0,
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === -1 ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute w-full"
          {...handlers}
        >
          <Card className="w-full bg-gray-900 rounded-3xl overflow-hidden border-0 p-4">
            <CardContent className="p-2">
              <div className="space-y-6">
                {/* Impressions Section */}
                <div className="bg-gray-800 rounded-2xl p-3">
                  <h3 className="text-gray-400 text-lg mb-3">Impressions</h3>

                  <div className="space-y-3">
                    {/* First two options shown here */}
                    <div className="flex items-center">
                      <div className="bg-green-400 text-black font-bold rounded-full py-2 px-6 flex-grow text-center">
                        {samplePolls[currentIndex].options[0]}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white font-bold rounded-full py-2 px-4 w-24 text-center">
                        {samplePolls[currentIndex].options[1]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="flex justify-center gap-6">
                  {/* Views Stat */}
                  <div className="bg-blue-600 rounded-full p-3 w-24 h-24 flex flex-col items-center justify-center">
                    <span className="text-white text-sm">Views</span>
                    <span className="text-green-400 text-3xl font-bold">
                      241
                    </span>
                  </div>

                  {/* Share Stat */}
                  <div className="bg-blue-600 rounded-full p-3 w-24 h-24 flex flex-col items-center justify-center">
                    <span className="text-white text-sm">Share</span>
                    <span className="text-green-400 text-3xl font-bold">
                      12
                    </span>
                  </div>
                </div>

                {/* Swipe Instructions */}
                <div className="flex justify-center items-center gap-4 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    Swipe left to skip
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    Swipe right to vote
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
