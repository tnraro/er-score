import { MatchingMode } from "../../lib/features/er-api/shapes";
import type { Translation } from "../i18n-types";

const en: Translation = {
  searchForm: {
    label: "Username",
    placeholder: "Enter a username.",
    search: "Search",
  },
  recentMatches: {
    noData: "No data available.",
  },
  userRecords: {
    heading: {
      rank: "Rank",
      winLose: "Win/Loss",
      name: "Name",
      score: "Score",
      k: "K",
      d: "D",
      a: "A",
      equipments: "Equipment",
      damageDealtToPlayers: "Damage Dealt",
      damageTakenFromPlayers: "Damage Taken",
      healingAmount: "Healing",
    },
    value: {
      win: "Win",
      lose: "Loss",
      rank: "Rank {rank}",
    },
    preMadeTeamSize: "Pre-made team of {n}",
    isAlphaKilled: "Killed Alpha",
    isOmegaKilled: "Killed Omega",
    isGammaKilled: "Killed Gamma",
    isWickelineKilled: "Killed Wickeline",
    noData: "No data available",
  },
  matchingMode: {
    all: "All",
    [MatchingMode.Normal]: "Normal",
    [MatchingMode.Rank]: "Ranked",
    [MatchingMode.Cobalt]: "Cobalt",
    [MatchingMode.Union]: "Union",
  },
  stats: {
    heading: {
      count: "Matches",
      score: "Score",
      halfRate: "50% Win Rate",
      averageDamage: "Avg. Damage",
    },
    recentNDays: "Last {n} days",
    limitHint: "(Up to {limit} matches)",
  },
  button: {
    open: "Open",
    close: "Close",
    detail: "Details",
  },
  refresh: {
    text: "Refresh Records",
    keyboard: "[F5]",
  },
  status: {
    404: "Page not found.",
  },
};

export default en;
