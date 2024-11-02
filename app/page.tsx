import { Bubble } from "@/components/bubble";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-4xl font-bold text-black dark:text-white md:text-7xl">
        Neon X Aceternity
      </h1>

      <Bubble />
    </div>
  );
}
