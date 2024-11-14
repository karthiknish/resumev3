import CallToAction from "./components/call-to-action";
import FAQsSection from "./components/faqs-section";
import Features from "./components/features";
import HeroSection from "./components/hero-section";
import ProductShowcase from "./components/product-showcase";

export default function Home() {
  return (
    <>
      <head>
        <title>Karthik Nishanth - Home</title>
        <meta name="description" content="Web and app developer with expertise in performance marketing. Building high-performance, scalable applications with modern technologies." />
        <meta name="keywords" content="web development, app development, performance marketing, full stack developer, Karthik Nishanth" />
        <meta property="og:title" content="Karthik Nishanth - Web/App Developer" />
        <meta property="og:description" content="Web and app developer with expertise in performance marketing. Building high-performance, scalable applications with modern technologies." />
        <meta property="og:type" content="website" />
      </head>

      <HeroSection />
      {/* <LogoTicker /> */}
      <Features />
      <ProductShowcase />
      <FAQsSection />
      <CallToAction />
    </>
  );
}