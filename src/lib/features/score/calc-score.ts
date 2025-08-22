import { MatchingMode } from "$lib/shared/er-api/shapes";
import type { UserGame } from "$lib/shared/er-api/types.gen";

export function calcScore(game: UserGame) {
  switch (game.matchingMode) {
    case MatchingMode.Cobalt:
      return score([
        [game.healAmount, 0.0757, 7396, 14343],
        [game.ccTimeToPlayer, 0.0834, 4.6833334, 19.900002],
        [game.monsterKill, 0.1096, 14, 28],
        [game.damageToPlayer, 0.1618, 19665, 30748],
        [game.damageToMonster, 0.1624, 8777, 20302],
        [game.damageFromPlayer, -0.1793, 20158, 30207],
        [game.bestWeaponLevel, 0.2148, 16, 18],
        [game.playerKill, 0.2766, 4, 8],
        [sum(game.scoredPoint), 0.3682, 5, 11],
        [game.playerAssistant, 0.3796, 7, 14],
        [game.playerDeaths, -0.424, 5, 8],
      ]);
    case MatchingMode.Normal:
    case MatchingMode.Rank:
    case MatchingMode.Union:
      break;
    default:
      console.warn(`Unknown matching mode: ${game.matchingMode}`);
  }
  return score([
    [game.clutchCount, 0.1501, 0, 0],
    [game.ccTimeToPlayer, 0.2935, 2.6666667, 17.033335],
    [game.useSecurityConsole, 0.3345, 2, 6],
    [game.useEmpDrone, 0.4059, 0, 1],
    [game.monsterKill, 0.4114, 24, 53],
    [game.damageToMonster, 0.4821, 31518, 85952],
    [game.damageFromPlayer, 0.5222, 8252, 17550],
    [game.healAmount, 0.5244, 7907, 17943],
    [game.characterLevel, 0.5871, 16, 20],
    [game.bestWeaponLevel, 0.593, 16, 20],
    [game.playerKill, 0.6165, 1, 4],
    [game.damageToPlayer, 0.6432, 6495, 16934],
    [game.playTime, 0.7243, 758, 1298],
    [game.playerAssistant, 0.7491, 1, 5],
    [game.terminateCount, 0.7708, 0, 1],
    [game.totalUseVFCredit, 0.7751, 505, 1170],
  ]);
}
type Option = [number, number, number, number];
function score(config: Option[]) {
  const coef = 2;
  const value = sum(config.map(toValue));
  const total = sum(config.map(toWeight)) || 1;
  return (coef * value) / total;
}
function sum(items: number[]) {
  return items.reduce((a, b) => a + b, 0);
}
function toValue([x, mul, min, max]: Option) {
  if (max === min) return mul * x;
  return (mul * (x - min)) / (max - min);
}
function toWeight(option: Option) {
  return Math.abs(option[1]);
}
