"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Share2, ArrowLeft, ArrowRight } from "lucide-react";
import Orb from "@/components/ui/orb";
import Image from "next/image";
import { models } from "@/data/models";
import { toast } from "sonner";
import usePollService from "@/service/poll";
import { EthUsageDrawer } from "@/components/custom/eth-usage-drawer";
import { useGetBalance } from "@/service/user-wallet";
import { usePrivy } from "@privy-io/react-auth";

interface EmotionStyle {
  id: string;
  emoji: string;
  name: string;
}

const emotionStyles: EmotionStyle[] = [
  { id: "funny", emoji: "😂", name: "Funny" },
  { id: "formal", emoji: "🧐", name: "Formal" },
  { id: "casual", emoji: "😊", name: "Casual" },
  { id: "excited", emoji: "🎉", name: "Excited" },
];

const steps = ["Select AI Model", "Create Poll"];

export default function CreatePoll() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmotionLoading, setIsEmotionLoading] = useState(false);
  const [id, setId] = useState("");

  const { createPoll, createPollWithEmotional } = usePollService();

  const { user } = usePrivy();

  const wallet = user?.smartWallet;
  const walletAddress = wallet?.address;

  const { balance } = useGetBalance(walletAddress);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedModel;
      case 1:
        return !!question && answers.every((a) => a.trim() !== "");
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      if (currentStep === 0) {
        await fetchPollQuestion();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setSelectedEmotion("");
      setCurrentStep(currentStep - 1);
    }
  };

  const fetchPollQuestion = async () => {
    try {
      setIsLoading(true);
      const { data } = await createPoll({
        category: selectedModel,
      });

      setCurrentStep(currentStep + 1);

      setQuestion(data.question);
      setId(data.id);
      setAnswers(data.choices || ["", ""]);
    } catch {
      toast("Error", {
        description: "Failed to generate poll question. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPollWithEmotion = async (emotion: string) => {
    try {
      setIsEmotionLoading(true);
      const { data } = await createPollWithEmotional({
        id,
        emotional: emotion,
      });
      setQuestion(data.question);
      setAnswers(data.choices || ["", ""]);
      setSelectedEmotion(emotion);
    } catch {
      toast("Error", {
        description: "Failed to regenerate poll question. Please try again.",
      });
    } finally {
      setIsEmotionLoading(false);
    }
  };

  const handleEmotionChange = async (emotion: string) => {
    if (isEmotionLoading) return;
    await fetchPollWithEmotion(emotion);
  };

  return (
    <div className="container max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2
                  ${
                    index <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background text-muted-foreground"
                  }`}
              >
                {index + 1}
              </div>
              <div className="text-sm text-center">{step}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-muted w-full" />
          <motion.div
            className="absolute top-0 left-0 h-1 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep + 1) * (100 / steps.length)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Select AI Model</h2>
              <RadioGroup
                value={selectedModel}
                onValueChange={setSelectedModel}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {models.map((model) => (
                  <div key={model.id}>
                    <RadioGroupItem
                      value={model.id}
                      id={model.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={model.id}
                      className="flex flex-col items-center justify-center h-56 rounded-lg border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="w-full md:w-1/2 h-[200px] relative">
                        <Orb
                          hoverIntensity={0.25}
                          rotateOnHover={true}
                          hue={model.orbHue}
                          forceHoverState={true}
                        >
                          <Image
                            src={model.imgUrl || "/default-image.png"}
                            alt={model.name}
                            width={200}
                            height={200}
                            className="rounded-[100%]"
                          />
                        </Orb>
                      </div>
                      <div className="font-semibold">{model.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {model.category}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStep === 1 && (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  <h2 className="text-2xl font-bold ">Your Poll Question</h2>
                  <p className="text-lg font-medium">{question}</p>
                </div>
                <div className="p-4 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md">Answer Choices</h3>
                    {answers.map((answer, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-inner"
                      >
                        <p className="text-md">{answer}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-semibold">
                      Choose Emotion Style
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {emotionStyles.map((emotion) => (
                        <EthUsageDrawer
                          balance={parseFloat(balance)}
                          neededEth={0.0000001}
                          onProceed={() => handleEmotionChange(emotion.id)}
                          key={emotion.id}
                        >
                          <Button
                            variant={
                              selectedEmotion === emotion.id
                                ? "default"
                                : "outline"
                            }
                            className="h-auto py-4 flex flex-col items-center justify-center"
                            disabled={isEmotionLoading}
                          >
                            {isEmotionLoading ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mb-2" />
                            ) : (
                              <span className="text-4xl mb-2">
                                {emotion.emoji}
                              </span>
                            )}
                            <span className="text-sm font-medium">
                              {emotion.name}
                            </span>
                          </Button>
                        </EthUsageDrawer>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep === steps.length - 1 ? (
          <div>
            <Button onClick={handleShare} disabled={!canProceed()}>
              <Share2 className="w-4 h-4 mr-2" />
              Share on Farcaster
            </Button>
          </div>
        ) : (
          <EthUsageDrawer
            balance={parseFloat(balance)}
            neededEth={0.000001}
            onProceed={handleNext}
          >
            <Button disabled={!canProceed() || isLoading}>
              {isLoading ? (
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 
              dark:border-black dark:border-t-transparent"
                />
              ) : null}
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </EthUsageDrawer>
        )}
      </div>
    </div>
  );
}
