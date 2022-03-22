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
  {
    precNo: 14,
    precName: "北海道石狩地方",
    blocks: [
      {
        blockNo: 47412,
        blockName: "札幌",
      },
    ],
  },
  {
    precNo: 15,
    precName: "北海道空知地方",
    blocks: [
      {
        blockNo: 47413,
        blockName: "岩見沢",
      },
    ],
  },
  {
    precNo: 16,
    precName: "北海道後志地方",
    blocks: [
      {
        blockNo: 47411,
        blockName: "小樽",
      },
      {
        blockNo: 47433,
        blockName: "倶知安",
      },
      {
        blockNo: 47421,
        blockName: "寿都",
      },
    ],
  },
  {
    precNo: 17,
    precName: "北海道網走・北見・紋別地方",
    blocks: [
      {
        blockNo: 47405,
        blockName: "雄武",
      },
      {
        blockNo: 47435,
        blockName: "紋別",
      },
      {
        blockNo: 47409,
        blockName: "網走",
      },
    ],
  },
  {
    precNo: 18,
    precName: "北海道根室地方",
    blocks: [
      {
        blockNo: 47420,
        blockName: "根室",
      },
    ],
  },
  {
    precNo: 19,
    precName: "北海道釧路地方",
    blocks: [
      {
        blockNo: 47418,
        blockName: "釧路",
      },
    ],
  },
  {
    precNo: 20,
    precName: "北海道十勝地方",
    blocks: [
      {
        blockNo: 47417,
        blockName: "帯広",
      },
      {
        blockNo: 47440,
        blockName: "広尾",
      },
    ],
  },
  {
    precNo: 21,
    precName: "北海道胆振地方",
    blocks: [
      {
        blockNo: 47424,
        blockName: "苫小牧",
      },
      {
        blockNo: 47423,
        blockName: "室蘭",
      },
    ],
  },
  {
    precNo: 22,
    precName: "北海道日高地方",
    blocks: [
      {
        blockNo: 47426,
        blockName: "浦河",
      },
    ],
  },
  {
    precNo: 23,
    precName: "北海道渡島地方",
    blocks: [
      {
        blockNo: 47430,
        blockName: "函館",
      },
    ],
  },
  {
    precNo: 24,
    precName: "北海道檜山地方",
    blocks: [
      {
        blockNo: 47428,
        blockName: "江差",
      },
    ],
  },
];
