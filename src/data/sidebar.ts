import { BookOpen, Bot } from "lucide-react";
import { models } from "./models";

export const sidebarData = {
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: models.map((model) => ({
        title: model.name,
        url: `/poll/create-poll/models/${model.id}`,
      })),
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
      ],
    },
  ],
  histories: [
    {
      name: "Design Engineering",
      url: `/poll/create-poll/polls/123`,
    },
    {
      name: "Sales & Marketing",
      url: `/poll/create-poll/polls/{model.id}`,
    },
    {
      name: "Travel",
      url: `/poll/create-poll/polls/{poll.id}`,
    },
  ],
};
