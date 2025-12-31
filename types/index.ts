export type BlockType = 'Hero' | 'SectionTitle' | 'FeatureRows' | 'ParallaxContent' | 'ContentSection' | 'Pricing' | 'Content' | 'CTA' | 'Footer';

export interface BlockData {
  id: string;
  type: BlockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
}

export interface PageData {
  title: string;
  description: string;
  blocks: BlockData[];
}
