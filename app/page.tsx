import { BackgroundGrids } from "@/components/background-grids";
import { Bubble } from "@/components/bubble";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden relative">
      <h1 className="text-2xl font-bold text-neutral-600 dark:text-white text-center md:text-4xl relative z-20">
        Neon <span className="font-light">x</span> Aceternity <br />{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-violet-600">
          {" "}
          Chatbot
        </span>{" "}
        template
      </h1>

      <BackgroundGrids />
      <Bubble />
    </div>
  );
}
