import type { StaticImageData } from "next/image";
import sceneLarge from "./assets/island/scene.webp";
import sceneSmall from "./assets/island/scene-small.webp";
import islandLarge from "./assets/island/island.webp";
import islandSmall from "./assets/island/island-small.webp";
import runningLarge from "./assets/island/running.webp";
import runningSmall from "./assets/island/running-small.webp";
import resultLarge from "./assets/island/result.webp";
import resultSmall from "./assets/island/result-small.webp";
import focusLarge from "./assets/island/focus.webp";
import focusSmall from "./assets/island/focus-small.webp";
import buildLarge from "./assets/island/build.webp";
import buildSmall from "./assets/island/build-small.webp";
import dailyLarge from "./assets/island/daily.webp";
import dailySmall from "./assets/island/daily-small.webp";

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
  fieldNote?: {
    title: string;
    summary: string;
    image: ProjectImage;
    topics: { title: string; description: string }[];
  };
  faq?: { question: string; answer: string }[];
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
      title: "安排這一段時間",
      description: "選擇 15 到 180 分鐘，把這段時間標記成讀書、工作或自己的分類。需要時，可以先選好想暫時封印的 App。",
      image: { large: focusLarge, small: focusSmall, alt: "專注設定畫面，包含時長、類別與封印 App 的選項" },
    },
    {
      title: "留一段時間給手上的事",
      description: "啟動倒數後，把手機放到一旁。期間仍可暫停計時，也能使用電話和設定等系統 App。",
      image: { large: runningLarge, small: runningSmall, alt: "專注計時畫面，顯示倒數進度與暫停按鈕" },
    },
    {
      title: "回到島上領取獎勵",
      description: "完成計時會獲得經驗、金幣和生命值。結算畫面也會顯示當天的累積進度。",
      image: { large: resultLarge, small: resultSmall, alt: "一段專注結束後的獎勵和當日進度" },
    },
    {
      title: "在島上蓋點新的",
      description: "用金幣買建築，再挑個位置放下去。完成每日任務還能拿到開拓旗，慢慢擴大島嶼。",
      image: { large: buildLarge, small: buildSmall, alt: "建造模式顯示島嶼格線和可放置的建築" },
    },
  ],
  fieldNote: {
    title: "小島有自己的日常",
    summary: "可以在岸邊釣魚，遇到隨機小遊戲，也能選一個台灣縣市，讓現實的天氣跟著來到島上。挑個下雨天回去看看，熟悉的小島會換一副樣子。",
    image: {
      large: dailyLarge,
      small: dailySmall,
      alt: "四張實機畫面顯示教學獎勵、島上事件、岸邊釣魚和下雨的小島",
    },
    topics: [
      { title: "把荒島住成自己的樣子", description: "島上從一小塊土地開始。你可以移動建築、調整佈局，用道路和裝飾連起不同區域。等級越高，能解鎖的建築與裝飾也越多。" },
      { title: "讓小島跟著你休息", description: "每段專注都會替土地補充養分。遇到旅行或需要休息的日子，可以開啟度假模式，暫停養分流失。" },
      { title: "和朋友一起專注", description: "登入後可以加好友。兩人的專注時間重疊達到 20 分鐘，就能各自領取獎勵。也能拜訪彼此的小島、留言和送禮物。" },
    ],
  },
  faq: [
    { question: "需要先登入嗎？", answer: "訪客模式可以玩單人內容，島嶼和紀錄會留在裝置上。使用 Google 帳號登入後，可以備份進度、加好友和一起專注。" },
    { question: "可以只用計時功能嗎？", answer: "可以。使用情形存取權限用於判斷是否打開了自己選擇封印的 App。只想計時的話，可以跳過這個權限。" },
    { question: "支援哪些裝置？", answer: "目前支援 Android 8.0 以上的手機和平板。Google Play 的上架消息會公布在產品官網。" },
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
