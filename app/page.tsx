import SmoothScroll from "@/components/SmoothScroll";
import BlockRenderer from "@/components/BlockRenderer";
import CursorLight from "@/components/CursorLight";
import { PageData } from "@/types";

const pageData: PageData = {
  title: "LANDIO",
  description: "Flat-fee property marketing. /n No commissions. You own the leads.",
  blocks: [
    {
      id: "hero-1",
      type: "Hero",
      props: {
        title: "GET YOUR PROPERTIES ON THE MAP",
        subtitle: "Feature Them On",
        description: "Flat-fee property marketing.\nNo commissions. You own the leads.",
        ctaText: "Start Selling",
        ctaLink: "/post-a-property",
      },
    },
    {
      id: "pricing-1",
      type: "Pricing",
      props: {
        title: "Pricing",
        subtitle: "Choose the package that fits your inventory.",
        plans: [
          {
            name: "INDIVIDUAL",
            price: "$497",
            period: "1 PROPERTY",
            features: [
              "1 Property Listing",
              "Unlimited Photos",
              "Direct Buyer Leads"
            ],
            ctaText: "GET STARTED",
            ctaLink: "/post-a-property",
          },
          {
            name: "10-PACK",
            price: "$397",
            period: "PER PROPERTY",
            description: "$3,997 Total (20% Savings)",
            features: [
              "10 Property Listings",
              "20% Cost Savings",
              "Never Expires",
              "Priority Support"
            ],
            ctaText: "GET STARTED",
            ctaLink: "/post-a-property?package=10pack",
            highlight: true,
          },
          {
            name: "ENTERPRISE",
            price: "LET'S TALK",
            period: "TO SALES",
            description: "For Brokerages, Teams & Developers",
            features: [
              "Custom Services",
            ],
            ctaText: "TALK TO SALES",
            ctaLink: "/schedule-call",
          },
        ],
      },
    },
    {
      id: "section-title-1",
      type: "SectionTitle",
      props: {
        title: "WHY LANDIO?",
        align: "center",
      },
    },
    {
      id: "content-section-1",
      type: "ContentSection",
      props: {
        variant: "featured",
        title: "BUILT FOR LAND",
        description: "LANDIO is built by experienced land investors, designers, and marketers who understand the nuances of land, acreage, and rural property markets.",
        imageUrl: "/images/ux-rollingHills.jpg",
        imageAlt: "Rolling hills landscape",
        orientation: "left",
      },
    },
    {
      id: "content-section-2",
      type: "ContentSection",
      props: {
        variant: "parallax",
        title: "COMPREHENSIVE PROPERTY MAP",
        description: "Put your property in front of a global audience of buyers seeking land across all sizes, types, and price ranges. Our comprehensive property map ensures your listing gets seen by the right eyes.",
        imageUrl: "/images/landio-map.jpg",
        orientation: "left",
      },
    },
    {
      id: "content-section-3",
      type: "ContentSection",
      props: {
        variant: "featured",
        title: "DEDICATED LANDIO PROPERTY PAGE",
        description: "Every property gets its own page designed to convert serious buyers. High-resolution imagery, detailed maps, and clear calls to action.",
        imageUrl: "/images/landio-page.png",
        imageAlt: "Modern luxury home interior",
        orientation: "right",
        imageBleed: 3,
      },
    },
    {
      id: "content-section-4",
      type: "ContentSection",
      props: {
        variant: "parallax",
        title: "YOU OWN THE LEADS",
        description: "All inquiries go directly to you. No lead resale. No middlemen. You control the relationship from start to finish, maximizing your conversion rates and building your own buyer list.",
        imageUrl: "/images/ux-leads.png",
        imagePositionY: "60%",
        orientation: "right",
      },
    },
    {
      id: "content-section-5",
      type: "ContentSection",
      props: {
        variant: "featured",
        title: "STRATEGIC SOCIAL MEDIA EXPOSURE",
        description: "LANDIO has built a large and engaged social media following across Instagram, Facebook, YouTube, and TikTok. Our audience includes a diverse mix of land buyers, investors, entrepreneurs, and public figures drawn to land, nature, and legacy.",
        imageUrl: "/images/ux-social.png",
        imageAlt: "Social media apps on smartphone",
        orientation: "left",
      },
    },
    {
      id: "content-section-6",
      type: "ContentSection",
      props: {
        variant: "parallax",
        title: "LIQUIDITY IN AN ILLIQUID MARKET",
        description: "Land has traditionally been one of the hardest assets to sell. We're changing that. By streamlining the marketing process and connecting you directly with qualified buyers, we turn stagnant inventory into capital you can reinvest.",
        imageUrl: "/images/ux-map.png",
        orientation: "left",
      },
    },
    {
      id: "cta-1",
      type: "CTA",
      props: {
        title: "Ready to Sell More Land?",
        description: "LANDIO is a marketing platform, not a brokerage. You retain full control of pricing, negotiations, relationships, and closing.",
        buttonText: "GET STARTED NOW",
        buttonLink: "/post-a-property",
      },
    },
    {
      id: "footer-1",
      type: "Footer",
      props: {
        copyright: "© 2024 LANDIO. All rights reserved.",
      },
    },
  ],
};

export default function Home() {
  return (
    <SmoothScroll>
      <CursorLight />
      <main className="min-h-screen bg-black selection:bg-teal-500 selection:text-white overflow-x-hidden">
        {pageData.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </main>
    </SmoothScroll>
  );
}
