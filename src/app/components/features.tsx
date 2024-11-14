import FeatureCard from "./feature-card";
import { FeaturesDataType } from "@/lib/definitions";

const featuresData: FeaturesDataType[] = [
  {
    id: 1,
    title: "Full-Stack Development",
    description:
      "Building scalable web applications with modern technologies like React, Next.js, Node.js and cloud infrastructure.",
    icon: "database",
  },
  {
    id: 2,
    title: "Analytics Integration",
    description:
      "Implementing comprehensive analytics tracking to measure user behavior and optimize application performance.",
    icon: "chart",
  },
  {
    id: 3,
    title: "Data-Driven Solutions",
    description:
      "Creating custom dashboards and reports to help visualize metrics and make informed product decisions.",
    icon: "dashboard",
  },
];

export default function Features() {
  return (
    <div className="bg-black py-[72px] text-white sm:py-24">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-bold tracking-tight sm:text-6xl">
          My Expertise
        </h2>
        <div className="mx-auto max-w-2xl">
          <p className="mt-5 text-center text-xl text-white/70">
            Combining modern web development with analytics expertise to build
            high-performance applications that deliver measurable results and
            exceptional user experiences.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}