import { MatchingMode } from "../../lib/features/er-api/shapes";
import type { BaseTranslation } from "../i18n-types";

const ko = {
  searchForm: {
    label: "유저 이름",
    placeholder: "유저 이름을 입력해주세요.",
    search: "검색",
  },
  recentMatches: {
    noData: "정보가 없습니다.",
  },
  userRecords: {
    heading: {
      rank: "순위",
      winLose: "승패",
      name: "이름",
      score: "점수",
      k: "K",
      d: "D",
      a: "A",
      equipments: "장비",
      damageDealtToPlayers: "딜",
      damageTakenFromPlayers: "탱",
      healingAmount: "힐",
    },
    value: {
      win: "승",
      lose: "패",
      rank: "{rank:number}위",
    },
    preMadeTeamSize: "사전구성 {n:number}인 팀",
    isAlphaKilled: "알파 킬",
    isOmegaKilled: "오메가 킬",
    isGammaKilled: "감마 킬",
    isWickelineKilled: "위클라인 킬",
    noData: "정보 없음",
  },
  matchingMode: {
    all: "전체",
    [MatchingMode.Normal]: "일반",
    [MatchingMode.Rank]: "랭크",
    [MatchingMode.Cobalt]: "코발트",
    [MatchingMode.Union]: "유니온",
  },
  stats: {
    heading: {
      count: "횟수",
      score: "점수",
      halfRate: "반타작률",
      averageDamage: "평균 딜",
    },
    recentNDays: "최근 {n:number}일간",
    limitHint: "(최대 {limit:number}경기)",
  },
  button: {
    open: "열기",
    close: "닫기",
    detail: "자세히",
  },
  refresh: {
    text: "전적 갱신",
    keyboard: "[F5]",
  },
  status: {
    404: "페이지를 찾을 수 없습니다.",
  },
} satisfies BaseTranslation;

export default ko;
