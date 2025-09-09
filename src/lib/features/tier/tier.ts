const colorMap = {
  Iron: {
    bg: "#9ba2b2",
    fg: "#151414",
  },
  Bronze: {
    bg: "#b5632b",
    fg: "#2e1915",
  },
  Silver: {
    bg: "#ccd2e4",
    fg: "#1c222d",
  },
  Gold: {
    bg: "#e8c272",
    fg: "#3a2720",
  },
  Platinum: {
    bg: "#aad586",
    fg: "#183b46",
  },
  Diamond: {
    bg: "#eae7f3",
    fg: "#312a4c",
  },
  Meteorite: {
    bg: "#ceebfc",
    fg: "#323d62",
  },
  Mythril: {
    bg: "#d7f7f8",
    fg: "#24385f",
  },
  Demigod: {
    bg: "#ffffff",
    fg: "#31484a",
  },
  Eternity: {
    bg: "#e5c7c7",
    fg: "#821537",
  },
};

const data = [
  {
    name: "Iron",
    end: 600,
  },
  {
    name: "Bronze",
    end: 1400,
  },
  {
    name: "Silver",
    end: 2400,
  },
  {
    name: "Gold",
    end: 3600,
  },
  {
    name: "Platinum",
    end: 5000,
  },
  {
    name: "Diamond",
    end: 6400,
  },
].reduce(
  (acc, x, i, items) => {
    const begin = items[i - 1]?.end ?? 0;
    const end = x.end;
    for (let i = 0; i < 4; i++) {
      const step = 4 - i;
      const size = (end - begin) / 4;
      const start = size * i + begin;
      const cutoff = size * (i + 1) + begin;
      acc.push({
        name: x.name,
        step,
        start,
        cutoff,
        size,
      });
    }
    return acc;
  },
  [] as {
    name: string;
    step: number;
    start: number;
    cutoff: number;
    size: number;
  }[],
);

export function getTier(rp: number): {
  name: string;
  reminder: number;
  size: number;
  fg: string;
  bg: string;
  step?: number;
} {
  const t = tier(rp);
  const color = colorMap[t.name as "Iron"];
  return {
    ...t,
    ...color,
  };
}

function tier(rp: number): {
  name: string;
  reminder: number;
  size: number;
  step?: number;
} {
  if (rp < 0) {
    return {
      name: data[0].name,
      reminder: 0,
      size: data[0].size,
      step: data[0].step,
    };
  }
  if (rp < 6400) {
    const x = data.find((x) => rp < x.cutoff);
    if (x == null) throw rp;
    return {
      name: x.name,
      reminder: rp - x.start,
      size: x.size,
      step: x.step,
    };
  }
  if (rp < 7100) {
    return {
      name: "Meteorite",
      reminder: rp - 6400,
      size: 7100 - 6400,
    };
  }
  return {
    name: "Mythril",
    reminder: rp - 7100,
    size: Number.MAX_SAFE_INTEGER,
  };
}
