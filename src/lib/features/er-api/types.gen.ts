export interface Root {
  UserNicknameErResponse: UserNicknameErResponse;
  UserGamesErResponse: UserGamesErResponse;
  GamesErResponse: GamesErResponse;
}

export interface GamesErResponse {
  code: number;
  message: string;
  userGames: UserGame[];
}

export interface UserGame {
  userNum: number;
  nickname: string;
  gameId: number;
  seasonId: number;
  matchingMode: number;
  matchingTeamMode: number;
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  bestWeapon: number;
  bestWeaponLevel: number;
  masteryLevel: { [key: string]: number };
  equipment: { [key: string]: number };
  versionMajor: number;
  versionMinor: number;
  language: Language;
  skillLevelInfo: { [key: string]: number };
  skillOrderInfo: { [key: string]: number };
  serverName: "Asia";
  maxHp: number;
  maxSp: number;
  attackPower: number;
  defense: number;
  hpRegen: number;
  spRegen: number;
  attackSpeed: number;
  moveSpeed: number;
  outOfCombatMoveSpeed: number;
  sightRange: number;
  attackRange: number;
  criticalStrikeChance: number;
  criticalStrikeDamage: number;
  coolDownReduction: number;
  lifeSteal: number;
  normalLifeSteal: number;
  skillLifeSteal: number;
  amplifierToMonster: number;
  trapDamage: number;
  bonusCoin: number;
  gainExp: number;
  baseExp: number;
  bonusExp: number;
  startDtm: string;
  duration: number;
  playTime: number;
  watchTime: number;
  totalTime: number;
  survivableTime: number;
  botAdded: number;
  botRemain: number;
  restrictedAreaAccelerated: number;
  safeAreas: number;
  teamNumber: number;
  preMade: number;
  eventMissionResult: { [key: string]: number };
  gainedNormalMmrKFactor: number;
  victory: number;
  craftUncommon: number;
  craftRare: number;
  craftEpic: number;
  craftLegend: number;
  damageToPlayer: number;
  damageToPlayer_trap: number;
  damageToPlayer_basic: number;
  damageToPlayer_skill: number;
  damageToPlayer_itemSkill: number;
  damageToPlayer_direct: number;
  damageToPlayer_uniqueSkill: number;
  damageFromPlayer: number;
  damageFromPlayer_trap: number;
  damageFromPlayer_basic: number;
  damageFromPlayer_skill: number;
  damageFromPlayer_itemSkill: number;
  damageFromPlayer_direct: number;
  damageFromPlayer_uniqueSkill: number;
  damageToMonster: number;
  damageToMonster_trap: number;
  damageToMonster_basic: number;
  damageToMonster_skill: number;
  damageToMonster_itemSkill: number;
  damageToMonster_direct: number;
  damageToMonster_uniqueSkill: number;
  damageFromMonster: number;
  damageToPlayer_Shield: number;
  damageOffsetedByShield_Player: number;
  damageOffsetedByShield_Monster: number;
  killMonsters: { [key: string]: number };
  healAmount: number;
  teamRecover: number;
  protectAbsorb: number;
  addSurveillanceCamera: number;
  addTelephotoCamera: number;
  removeSurveillanceCamera: number;
  removeTelephotoCamera: number;
  useHyperLoop: number;
  useSecurityConsole: number;
  giveUp: number;
  teamSpectator: number;
  routeIdOfStart: number;
  routeSlotId: number;
  placeOfStart: string;
  matchSize: number;
  teamKill: number;
  totalFieldKill: number;
  accountLevel: number;
  killerUserNum: number;
  killer: Killer;
  killDetail?: string;
  causeOfDeath?: string;
  placeOfDeath?: string;
  killerCharacter?: string;
  killerWeapon?: string;
  killerUserNum2: number;
  killerUserNum3: number;
  fishingCount: number;
  useEmoticonCount: number;
  expireDtm: string;
  traitFirstCore: number;
  traitFirstSub: number[];
  traitSecondSub: number[];
  airSupplyOpenCount: number[];
  foodCraftCount: number[];
  beverageCraftCount: number[];
  rankPoint: number;
  totalTurbineTakeOver: number;
  usedNormalHealPack: number;
  usedReinforcedHealPack: number;
  usedNormalShieldPack: number;
  usedReinforceShieldPack: number;
  totalVFCredits: number[];
  activelyGainedCredits: number;
  usedVFCredits: number[];
  sumUsedVFCredits: number;
  craftMythic: number;
  playerDeaths: number;
  killGamma: boolean;
  scoredPoint: number[];
  killDetails: string;
  deathDetails: string;
  killsPhaseOne: number;
  killsPhaseTwo: number;
  killsPhaseThree: number;
  deathsPhaseOne: number;
  deathsPhaseTwo: number;
  deathsPhaseThree: number;
  usedPairLoop: number;
  ccTimeToPlayer: number;
  creditSource: { [key: string]: number };
  boughtInfusion: "{}";
  itemTransferredConsole: number[];
  itemTransferredDrone: number[];
  escapeState: number;
  totalDoubleKill: number;
  totalTripleKill: number;
  totalQuadraKill: number;
  totalExtraKill: number;
  collectItemForLog: number[];
  equipFirstItemForLog: { [key: string]: number[] };
  battleZone1AreaCode: number;
  battleZone1BattleMark: number;
  battleZone1ItemCode: unknown[];
  battleZone2AreaCode: number;
  battleZone2BattleMark: number;
  battleZone2ItemCode: unknown[];
  battleZone3AreaCode: number;
  battleZone3BattleMark: number;
  battleZone3ItemCode: unknown[];
  battleZonePlayerKill: number;
  battleZoneDeaths: number;
  battleZone1Winner: number;
  battleZone2Winner: number;
  battleZone3Winner: number;
  battleZone1BattleMarkCount: number;
  battleZone2BattleMarkCount: number;
  battleZone3BattleMarkCount: number;
  tacticalSkillGroup: number;
  tacticalSkillLevel: number;
  totalGainVFCredit: number;
  killPlayerGainVFCredit: number;
  killChickenGainVFCredit: number;
  killBoarGainVFCredit: number;
  killWildDogGainVFCredit: number;
  killWolfGainVFCredit: number;
  killBearGainVFCredit: number;
  killOmegaGainVFCredit: number;
  killBatGainVFCredit: number;
  killWicklineGainVFCredit: number;
  killAlphaGainVFCredit: number;
  killItemBountyGainVFCredit: number;
  killDroneGainVFCredit: number;
  killGammaGainVFCredit: number;
  killTurretGainVFCredit: number;
  itemShredderGainVFCredit: number;
  totalUseVFCredit: number;
  remoteDroneUseVFCreditMySelf: number;
  remoteDroneUseVFCreditAlly: number;
  transferConsoleFromMaterialUseVFCredit: number;
  transferConsoleFromEscapeKeyUseVFCredit: number;
  transferConsoleFromRevivalUseVFCredit: number;
  tacticalSkillUpgradeUseVFCredit: number;
  infusionReRollUseVFCredit: number;
  infusionTraitUseVFCredit: number;
  infusionRelicUseVFCredit: number;
  infusionStoreUseVFCredit: number;
  teamElimination: number;
  teamDown: number;
  teamBattleZoneDown: number;
  teamRepeatDown: number;
  adaptiveForce: number;
  adaptiveForceAttack: number;
  adaptiveForceAmplify: number;
  skillAmp: number;
  campFireCraftUncommon: number;
  campFireCraftRare: number;
  campFireCraftEpic: number;
  campFireCraftLegendary: number;
  cobaltRandomPickRemoveCharacter: number;
  tacticalSkillUseCount: number;
  creditRevivalCount: number;
  creditRevivedOthersCount: number;
  timeSpentInBriefingRoom: number;
  IsLeavingBeforeCreditRevivalTerminate: boolean;
  crGetAnimal: number;
  crGetMutant: number;
  crGetPhaseStart: number;
  crGetKill: number;
  crGetAssist: number;
  crGetTimeElapsed: number;
  crGetCreditBonus: number;
  crUseRemoteDrone: number;
  crUseUpgradeTacticalSkill: number;
  crUseTreeOfLife: number;
  crUseMeteorite: number;
  crUseMythril: number;
  crUseForceCore: number;
  crUseVFBloodSample: number;
  crUseActivationModule: number;
  crUseRootkit: number;
  mmrGainInGame: number;
  mmrAvg?: number;
  mmrAfter?: number;
  mmrLossEntryCost: number;
  premadeMatchingType: number;
  viewContribution: number;
  useReconDrone: number;
  useEmpDrone: number;
  exceptPreMadeTeam: boolean;
  terminateCount: number;
  clutchCount: number;
  unknownKill: number;
  mainWeather: number;
  subWeather: number;
  activeInstallation: { [key: string]: number };
  useGuideRobot: number;
  guideRobotRadial: number;
  guideRobotFlagShip: number;
  guideRobotSignature: number;
  crGetByGuideRobot: number;
  damageToGuideRobot: number;
  getBuffCubeRed: number;
  getBuffCubePurple: number;
  getBuffCubeGreen: number;
  getBuffCubeGold: number;
  getBuffCubeSkyBlue: number;
  sumGetBuffCube: number;
  hackAttemptLog: HackAttemptLog;
  isLeavingBeforeCreditRevivalTerminate: boolean;
  killer2?: Killer2;
  killDetail2?: string;
  causeOfDeath2?: string;
  placeOfDeath2?: string;
  killerCharacter2?: string;
  killerWeapon2?: string;
  killer3?: Killer;
  killDetail3?: string;
  causeOfDeath3?: string;
  placeOfDeath3?: string;
  killerCharacter3?: string;
  killerWeapon3?: string;
}

export interface HackAttemptLog {
  TARGET_OUT_OF_SIGHT?: number;
  PING_TARGET?: number;
}

export enum Killer {
  Empty = "",
  Player = "player",
}

export enum Killer2 {
  Player = "player",
  RestrictedArea = "restrictedArea",
}

export enum Language {
  ChineseSimplified = "ChineseSimplified",
  ChineseTraditional = "ChineseTraditional",
  Korean = "Korean",
}

export interface UserGamesErResponse {
  code: number;
  message: string;
  userGames: UserGame[];
  next: number;
}

export interface UserNicknameErResponse {
  code: number;
  message: string;
  user: User;
}

export interface User {
  userNum: number;
  nickname: string;
}
