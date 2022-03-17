interface PrecBlock {
  precNo: number;
  precName: string;
  blocks: {
    blockNo: number;
    blockName: string;
  }[];
}

export const PrecBlockList: PrecBlock[] = [
  {
    precNo: 11,
    precName: "北海道宗谷地方",
    blocks: [
      {
        blockNo: 47401,
        blockName: "稚内",
      },
      {
        blockNo: 47402,
        blockName: "北見枝幸",
      },
    ],
  },
  {
    precNo: 12,
    precName: "北海道上川地方",
    blocks: [
      {
        blockNo: 47407,
        blockName: "旭川",
      },
    ],
  },
  {
    precNo: 13,
    precName: "北海道留萌地方",
    blocks: [
      {
        blockNo: 47404,
        blockName: "羽幌",
      },
      {
        blockNo: 47406,
        blockName: "留萌",
      },
    ],
  },
];
