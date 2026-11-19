import type { StaticImageData } from "next/image";
import sceneLarge from "./assets/island/scene.webp";
import sceneSmall from "./assets/island/scene-small.webp";
import islandLarge from "./assets/island/island.webp";
import islandSmall from "./assets/island/island-small.webp";
import runningLarge from "./assets/island/running.webp";
import runningSmall from "./assets/island/running-small.webp";
import resultLarge from "./assets/island/result.webp";
import resultSmall from "./assets/island/result-small.webp";

export type ProjectImage = {
  large: StaticImageData;
  small: StaticImageData;
  alt: string;
};

type ProjectStatus = "released" | "in-development" | "experimental";

export type Project = {
  name: string;
  englishName: string;
  slug: string;
  summary: string;
  tagline?: string;
  description: string;
  status: ProjectStatus;
  releaseNote?: string;
  category: string;
  cover: ProjectImage;
  screenshots: { title: string; description: string; image: ProjectImage }[];
  artwork?: ProjectImage;
  theme: { wash: string; frame: string };
  website?: string;
  repository?: string;
  platform?: string;
  support?: { email: string; privacy: string; terms: string; instructions?: string };
  featured?: boolean;
};

export const statusLabels: Record<ProjectStatus, string> = {
  released: "已發布",
  "in-development": "開發中",
  experimental: "實驗專案",
};

export const islandProject = {
  name: "孤島求生",
  englishName: "IslandSurvival",
  slug: "island-survival",
  category: "專注計時 × 島嶼經營",
  tagline: "孤島求生。讓專注長成一座島。",
  summary: "放下手機，專注一段時間。完成後回到島上領取金幣，從第一棟房子開始，慢慢蓋出自己的城鎮。",
  description: "《孤島求生》把專注計時和島嶼經營放在一起。讀書、工作或做自己的事，都能為小島累積金幣與經驗。你可以用金幣買建築，也能用開拓旗把島擴大。",
  status: "in-development",
  releaseNote: "Google Play 即將上架",
  platform: "Android",
  cover: {
    large: islandLarge,
    small: islandSmall,
    alt: "孤島求生實機畫面，像素風島嶼上蓋滿了道路和建築",
  },
  artwork: {
    large: sceneLarge,
    small: sceneSmall,
    alt: "",
  },
  screenshots: [
    {
      title: "留一段時間給手上的事",
      description: "選擇專注時長與類別。想少一點干擾時，可以選擇在計時期間封印容易分心的 App。",
      image: { large: runningLarge, small: runningSmall, alt: "專注計時畫面，顯示倒數進度與暫停按鈕" },
    },
    {
      title: "回到島上領取獎勵",
      description: "完成專注後領取經驗與金幣，看看今天累積了多少專注時間。",
      image: { large: resultLarge, small: resultSmall, alt: "一段專注結束後的獎勵和當日進度" },
    },
  ],
  theme: { wash: "#dce9ee", frame: "#1c5f8b" },
  website: "https://islandsurvival-intro.pages.dev/",
  support: {
    email: "cc20110630@gmail.com",
    privacy: "https://islandsurvival-privacy.pages.dev/",
    terms: "https://islandsurvival-terms.pages.dev/",
    instructions: "有使用問題或建議，可以從 App 內的「我的 → 設定 → 關於」回報，或寄信給我們。",
  },
  featured: true,
} satisfies Project;

export const projects: readonly Project[] = [islandProject];
export const featuredProject = projects.find((project) => project.featured) ?? islandProject;

export function projectPath(project: Project) {
  return `/work/${project.slug}/`;
}
