import { BlockData } from "@/types";
import Hero from "./blocks/Hero";
// import Features from "./blocks/Features"; // Deprecated/Replaced
import SectionTitle from "./blocks/SectionTitle";
import FeatureRows from "./blocks/FeatureRows";
import ParallaxContent from "./blocks/ParallaxContent";
import ContentSection from "./blocks/ContentSection";
import Pricing from "./blocks/Pricing";
import CTA from "./blocks/CTA";
import Footer from "./blocks/Footer";

const blockComponents = {
  Hero,
  SectionTitle,
  // Features,
  FeatureRows,
  ParallaxContent,
  ContentSection,
  Pricing,
  CTA,
  Footer,
  Content: () => null,
};

export default function BlockRenderer({ block }: { block: BlockData }) {
  const Component = blockComponents[block.type];

  if (!Component) {
    console.warn(`Block type "${block.type}" not found`);
    return null;
  }

  return <Component {...block.props} />;
}
