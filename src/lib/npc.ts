import { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Alignment, NPCType } from "@/api/npc/types";

export type AlignmentDetails = {
  [key in Alignment]: {
    label: string;
    description: string;
    tagColor: ComponentProps<typeof Badge>["color"];
  };
};

export type NPCTypeDetails = {
  [key in NPCType]: {
    label: string;
    description: string;
    tagColor: ComponentProps<typeof Badge>["color"];
  };
};

export const alignmentDetails: AlignmentDetails = {
  lawful_good: {
    label: "Lawful Good",
    description:
      "Characters who follow a strict moral code and prioritize doing what is right and just, even at personal cost or sacrifice. They are champions of good and are driven by their desire to protect and help others.",
    tagColor: "success",
  },
  neutral_good: {
    label: "Neutral Good",
    description:
      "Characters who are guided by their own conscience and do what they believe is right, but are more flexible in their approach than Lawful Good characters. They are often motivated by a desire to do good and help others, but may not be as bound by laws or rules.",
    tagColor: "success",
  },
  chaotic_good: {
    label: "Chaotic Good",
    description:
      "Characters who prioritize their own individual freedom and happiness, but still strive to do what is right and just. They are often rebels or nonconformists who reject authority and may be willing to break the law to do what they believe is right.",
    tagColor: "success",
  },
  lawful_neutral: {
    label: "Lawful Neutral",
    description:
      "Characters who value order and stability above all else, and seek to uphold laws and traditions. They may be impartial or follow a strict code of conduct, but are not necessarily good or evil.",
    tagColor: "neutral",
  },
  true_neutral: {
    label: "True Neutral",
    description:
      "Characters who are neutral in all things, and do not take sides in conflicts. They are often driven by their own self-interest or a desire to maintain balance in the world.",
    tagColor: "neutral",
  },
  chaotic_neutral: {
    label: "Chaotic Neutral",
    description:
      "Characters who prioritize their own individual freedom and happiness, and are willing to break laws and rules to achieve it. They are often unpredictable and may act on impulse or for their own amusement.",
    tagColor: "neutral",
  },
  lawful_evil: {
    label: "Lawful Evil",
    description:
      "Characters who follow a strict code of conduct and seek to maintain power and order, even at the expense of others. They are often tyrants or dictators who believe that the ends justify the means.",
    tagColor: "danger",
  },
  neutral_evil: {
    label: "Neutral Evil",
    description:
      "Characters who are driven by their own self-interest and do not care about laws or morals. They may be willing to harm or betray others for personal gain, but are not necessarily sadistic or malicious.",
    tagColor: "danger",
  },
  chaotic_evil: {
    label: "Chaotic Evil",
    description:
      "Characters who are unpredictable and seek to cause chaos and destruction for their own pleasure or gain. They may revel in violence and mayhem, and have no regard for the well-being of others.",
    tagColor: "danger",
  },
};

export const npcTypeDetails: NPCTypeDetails = {
  background: {
    label: "Background",
    description:
      "These are the everyday, unremarkable people that populate the game world. They often have no direct impact on the plot and are used to provide atmosphere, detail, or to serve as minor sources of information.",
    tagColor: "neutral",
  },
  functional: {
    label: "Functional",
    description:
      "These NPCs provide a specific service or function within the game world, such as merchants, blacksmiths, or innkeepers. They can be interacted with by the players for their services or to gather information related to their function.",
    tagColor: "accent",
  },
  proactive: {
    label: "Proactive",
    description:
      "These NPCs have their own goals and agendas, separate from the player characters. They actively work towards achieving their objectives, which can sometimes intersect with the players' goals, creating interesting opportunities for interaction or conflict.",
    tagColor: "orange",
  },
  dynamic: {
    label: "Dynamic",
    description:
      "These NPCs undergo significant growth or change over the course of the story. They can be allies or enemies, and their actions or decisions have lasting consequences on the plot.",
    tagColor: "blue",
  },
  foil: {
    label: "Foil",
    description:
      "These NPCs are specifically designed to challenge or contrast with the player characters, often highlighting their strengths or weaknesses. They can be rivals or simply characters with opposing viewpoints or values.",
    tagColor: "danger",
  },
  epic: {
    label: "Epic",
    description:
      "These NPCs are larger-than-life figures in the game world, often possessing great power, influence, or importance. They can be major allies or enemies, and their involvement in the story can dramatically impact the plot.",
    tagColor: "primary",
  },
  quest_giver: {
    label: "Quest Giver",
    description:
      "These NPCs provide the player characters with objectives or missions to complete, either directly or indirectly. Their roles can vary widely, from powerful figures seeking assistance to desperate individuals in need of help. They are often the catalysts for the story or key plot points.",
    tagColor: "yellow",
  },
};
