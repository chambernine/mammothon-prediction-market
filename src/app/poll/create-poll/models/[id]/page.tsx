import { notFound } from "next/navigation";
import { getModelById, categoryColors } from "@/data/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Orb from "@/components/ui/orb";
import Image from "next/image";
import DecryptedText from "@/components/ui/decrypted-text";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const model = getModelById(id);

  if (!model) {
    notFound();
  }

  return (
    <div className="flex h-[60vh] w-full items-center justify-center ">
      <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
        <div className="flex w-full justify-center lg:w-1/2">
          <div className="relative h-80 w-80 md:h-96 md:w-96">
            <div className="group relative h-full w-full rounded-full transition-all duration-300 hover:scale-105">
              <Orb
                hoverIntensity={0.25}
                rotateOnHover={true}
                hue={model.orbHue}
                forceHoverState={true}
              >
                <Image
                  src={model.imgUrl || "/default-image.png"}
                  alt={model.name}
                  width={300}
                  height={300}
                  className="rounded-[100%]"
                />
              </Orb>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Card className="h-full">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl font-bold md:text-3xl">
                {model.name}
              </CardTitle>
              <div className="animate-fade-in space-y-2 text-lg">
                <DecryptedText
                  text={model.description}
                  speed={100}
                  maxIterations={20}
                  animateOn="view"
                  revealDirection="center"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={`text-sm ${categoryColors[model.category]}`}
                  >
                    {model.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
