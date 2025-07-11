/* eslint-disable */
import type { BaseTranslation } from '../i18n-types'

const ko = {
	searchForm: {
		label: '유저 이름',
		placeholder: '유저 이름을 입력해주세요.',
		search: '검색',
	},
	recentMatches: {
		noData: '정보가 없습니다.',
	},
	userRecords: {
		heading: {
			rank: '순위',
			winLose: '승패',
			name: '이름',
			score: '점수',
			k: 'K',
			d: 'D',
			a: 'A',
			equipments: '장비',
			damageDealtToPlayers: '딜',
			damageTakenFromPlayers: '탱',
			healingAmount: '힐',
			trait: '특성',
			rpGain: 'RP',
		},
		value: {
			win: '승',
			lose: '패',
			rank: '{rank:number}위',
		},
		preMadeTeamSize: '사전구성 {n:number}인 팀',
		isAlphaKilled: '알파 킬',
		isOmegaKilled: '오메가 킬',
		isGammaKilled: '감마 킬',
		isWickelineKilled: '위클라인 킬',
		noData: '정보 없음',
	},
	matchingMode: {
		'2': '일반',
		'3': '랭크',
		'6': '코발트',
		'8': '유니온',
		all: '전체',
	},
	stats: {
		heading: {
			count: '횟수',
			score: '점수',
			halfRate: '반타작률',
			averageDamage: '평균 딜',
		},
		recentNDays: '최근 {n:number}일간',
		limitHint: '(최대 {limit:number}경기)',
	},
	button: {
		open: '열기',
		close: '닫기',
		detail: '자세히',
	},
	refresh: {
		text: '전적 갱신',
		keyboard: '[F5]',
	},
	error: {
		title: '오류',
	},
	status: {
		'401': '인증 자격 증명이 없습니다.',
		'404': '페이지를 찾을 수 없습니다.',
	},
	weapon: {
		'1': '글러브',
		'2': '톤파',
		'3': '방망이',
		'4': '채찍',
		'5': '투척',
		'6': '암기',
		'7': '활',
		'8': '석궁',
		'9': '권총',
		'10': '돌격소총',
		'11': '저격총',
		'13': '망치',
		'14': '도끼',
		'15': '단검',
		'16': '양손검',
		'18': '쌍검',
		'19': '창',
		'20': '쌍절곤',
		'21': '레이피어',
		'22': '기타',
		'23': '카메라',
		'24': '아르카나',
		'25': 'VF의수',
	},
	api: {
		weaponTypeDescription: {
			Glove: '글러브는 근거리 무기로, 빠른 연속 공격이 특징인 무기 타입입니다.',
			Tonfa: '톤파는 근거리 무기로, 높은 생존력을 확보한 무기 타입입니다.',
			Bat: '방망이는 근거리 무기로, 유연하게 상대를 대처할 수 있는 무기 타입입니다.',
			Whip: '채찍은 근거리 무기로, 거리 조절을 통한 교전에 특화 된 무기 타입입니다.',
			HighAngleFire: '투척은 원거리 무기로, 긴 사거리를 바탕으로 시야 차단을 통한 교전이 가능한 무기 타입입니다.',
			DirectFire: '암기는 원거리 무기로, 스킬과 기본 공격으로 큰 피해를 주는 무기 타입입니다.',
			Bow: '활은 원거리 무기로, 높은 성장 기대치를 가지고 있는 무기 타입입니다.',
			CrossBow: '석궁은 원거리 무기로, 상대 접근을 제어하며 거리 조절을 통해 전투하는 무기 타입입니다.',
			Pistol: '권총은 원거리 무기로, 빠른 이동 속도를 기반으로 스타일리시한 전투가 가능한 무기 타입입니다.',
			AssaultRifle: '돌격 소총은 원거리 무기로, 빠른 공격 속도를 통한 지속 전투에 능한 무기 타입입니다.',
			SniperRifle: '저격총은 원거리 무기로, 긴 사거리와 강한 단발 공격이 특징인 무기 타입입니다.',
			Hammer: '망치는 근거리 무기로, 공격 속도는 느리지만 강력한 한 방을 가진 무기 타입입니다.',
			Axe: '도끼는 근거리 무기로, 전투 유지력이 좋은 무기 타입입니다.',
			OneHandSword: '단검은 근거리 무기로, 기습과 순간적인 교전에 특화 된 무기 타입입니다.',
			TwoHandSword: '양손검은 근거리 무기로, 공수 균형이 잘 잡힌 무기 타입입니다.',
			DualSword: '쌍검은 근거리 무기로, 스타일리시한 전투가 가능한 무기 타입입니다.',
			Spear: '창은 근거리 무기로, 중거리 교전에 특화 된 무기 타입입니다.',
			Nunchaku: '쌍절곤은 근거리 무기로, 다재다능한 무기 타입입니다.',
			Rapier: '레이피어는 근거리 무기로, 빠르게 상대에게 돌진할 수 있는 무기 타입입니다.',
			Guitar: '기타는 원거리 무기로, 아군 서포팅에 최적화 된 무기 타입입니다.',
			Camera: '카메라는 원거리 무기로, 시야를 차단할 수 있는 무기스킬을 가진 무기 타입입니다.',
			Arcana: '아르카나는 원거리 무기로, 마법 스킬을 조합하여 전투를 펼치는 무기 타입입니다.',
			VFArm: 'VF 의수는 근거리 무기로, 무기 조합 제작없이 업그레이드 할 수 있는 무기 타입입니다.',
		},
		itemType: {
			All: '모든 아이템',
			None: '없음',
			Weapon: '무기',
			Armor: '방어구',
			Special: '특수',
			Misc: '기타',
			Consume: '소모품',
		},
		weaponType: {
			None: '없음',
			Glove: '글러브',
			Tonfa: '톤파',
			Bat: '방망이',
			Whip: '채찍',
			HighAngleFire: '투척',
			DirectFire: '암기',
			Bow: '활',
			CrossBow: '석궁',
			Pistol: '권총',
			AssaultRifle: '돌격 소총',
			SniperRifle: '저격총',
			Hammer: '망치',
			Axe: '도끼',
			OneHandSword: '단검',
			TwoHandSword: '양손검',
			Polearm: '폴암',
			DualSword: '쌍검',
			Spear: '창',
			Nunchaku: '쌍절곤',
			Rapier: '레이피어',
			Guitar: '기타',
			Camera: '카메라',
			Arcana: '아르카나',
			VFArm: 'VF의수',
		},
		miscItemType: {
			None: '없음',
			Material: '재료',
		},
		consumableItemType: {
			None: '없음',
			Food: '음식',
			Beverage: '음료',
			Special: '강화',
			SpecialFood: '강화',
			SpecialBeverage: '강화',
			Bounty: '현상금',
		},
		masteryType: {
			None: '없음',
			Glove: '글러브',
			Tonfa: '톤파',
			Bat: '방망이',
			Whip: '채찍',
			HighAngleFire: '투척',
			DirectFire: '암기',
			Bow: '활',
			CrossBow: '석궁',
			Pistol: '권총',
			AssaultRifle: '돌격 소총',
			SniperRifle: '저격총',
			Hammer: '망치',
			Axe: '도끼',
			OneHandSword: '단검',
			TwoHandSword: '양손검',
			Polearm: '폴암',
			DualSword: '쌍검',
			Spear: '창',
			Nunchaku: '쌍절곤',
			Rapier: '레이피어',
			Guitar: '기타',
			Camera: '카메라',
			Arcana: '아르카나',
			VFArm: 'VF의수',
			Trap: '함정',
			Craft: '제작',
			Search: '탐색',
			Move: '이동',
			Health: '체력',
			Defense: '방어',
			HpRegen: '재생',
			Meditation: '명상',
			Hunt: '사냥',
		},
		skinDescription: {
			'1001001': '피투성이 전기톱, 사람을 찢는 가위와 칼. \n흥겨운 콧노래 소리가 들리면 도망갈 것.',
			'1001002': '아름답게 찢어줄게. 장미의 이름으로.',
			'1001003': '규칙을 만드는 사람이 있다면, 부수는 사람도 있어야 균형이 맞겠지.',
			'1001004': '즐겁게 날뛸 준비 됐나, 제군?',
			'1001005': '죽는 게 끝이 아니라고, 내가 말했지?\n',
			'1002001': '순찰을 시작한지 다섯 시간 째. \n아무래도 그녀는 길을 잃은 듯 하다.',
			'1002002': '괜찮다면, 내년에도 함께 와줄래요?',
			'1002003': '업무 방해는 용서하지 않겠어요!',
			'1002004': '걱정 마세요. 어느 때보다 선명히 보이니까요!',
			'1003001': '긍지와 자존심은 스스로 지키는 것. 날카롭게 꿰뚫는 칼날 아래에서 눈동자가 반짝였다.',
			'1003002': '모두는 하나를 위해, 하나는 모두를 위해. ',
			'1003003': '차가우면서도, 부드럽게. 와인과 검은 닮은 점이 많지.',
			'1003004': '현장 진입. 최우선 목표는 고용인의 안전이다!',
			'1003005': '질서 정연, 그것이 올바른 훈련의 첫걸음이다.',
			'1004001': '힘과 권력을 쌓아 올리고, 그 전설을 가장 높고 오만한 자에게 바치리라.',
			'1004002': '잘 어울리나? 진정한 남자만이 꽃을 소화할 수 있는 법이지.',
			'1004003': '겨우 그 정도 깡으로 무슨 반항을 하겠다는 거야?',
			'1004004': '하! 결국 이 몸의 질주는 아무도 못 막았군!',
			'1005001': '어둠 속에서 진실을 발견하게 될 것이오.',
			'1005002': '이제 내가 시험할 시간이 왔군.',
			'1005003': '재물이 많다면 마음도 풍요로워 지는 법이오.\n<color=#FFBB00>[보이스 변경]</color>',
			'1006001': '집중해서 목표를 노리는 일은 어렵지 않아. 단지 한 번에 끊어낼 수 있느냐가 중요할 뿐.',
			'1006002': '나는 빨간 망토. 늑대는 여기에 있고... 할머니를 찾으면 되나?',
			'1006003': '늑대는 가장 강한 동물을 사냥한다.',
			'1006004': '악에 물든 자들을 사냥할 시간이다.\n',
			'1007001': '가끔은 몸으로 부딪혀야 결판이 나는 경우도 있다.',
			'1007002': '끝까지 물어뜯을 테니까 각오해.',
			'1007003': '결투 신청이냐? 심심풀이로는 나쁘지 않겠네.',
			'1007004': '이 정도로는 만족 못하겠는데.',
			'1007005': '방해하지 말고 꺼져. 치이기 싫으면.',
			'1007006': '뭘 봐? 너도 바다에 처박히고 싶어?',
			'1008001': '기, 기대해도 좋아! 세상을 바꿀 라이브니까!',
			'1008002': '겨울 축제를, 시, 시작할까?',
			'1008003': '기타와 엠프만 있으면 어디든 무대야!',
			'1008004': '행진은 멈추지 않아. 음악으로 세상을 구할 때까지!',
			'1008005': '이번에도 내 음악을 사랑해줘서 고,고마워!',
			'1009001': '특별히 새로운 상황인 건 아니야. 하던 대로 하면 되는 거지.',
			'1009002': '악령은 악령이다. 그들의 과거는 중요하지 않아.',
			'1009003': '새로운 시작을 준비하기에 적당한 밤이야.',
			'1009004': '쉬운 길은 아니었지. 하지만 그렇기 때문에 여기 있는 거야.',
			'1010001': '떠돌이 삶이 나쁜 것만은 아니야~ 어차피 날 찾을 사람도 없고, 특별한 목적지도 없으니까.',
			'1010002': '이거? 물병이야, 물병~ 아무튼 그렇다니까~',
			'1010003': '으응? 내가 용인 건가아? 그래, 악귀는 내가 물리쳐줄 테니까 축제를 즐기라고~',
			'1010004': '안줏거리 내놓으면 안 잡아먹지!',
			'1010005': '으응~? 취한 채로 물에 들어가면 안된다구~? 헤헤, 걱정 마~',
			'1011001': '모범생이라니요, 그저 매 순간을 실전처럼 생각할 뿐입니다.',
			'1011002': '눈으로 보고, 발을 맞추고, 마음을 다잡은 뒤에 검을 휘두릅니다.',
			'1011003': '우리 앞에 새로운 세계가 기다리는 것 같네요.',
			'1011004': '악한 자는 조금 다른 냄새를 풍기는군요.',
			'1011005': '산 자에게는 평화를, 죽은 자에게는 안식을',
			'1012001': '하얗게 피었다가 까맣게 지는 목련... 사람의 운명도 그런 거겠죠.',
			'1012002': '수업이 시작되겠군요. 그것이야말로 운명이지요.',
			'1012003': '방황하는 영혼들을 구원하는 게 저에게 주어진 운명입니다.',
			'1012004': '운명보다 강한 건, 노력이에요.',
			'1012005': '저와는 익숙지 않은 행사지만... 잘 어울리나요?',
			'1013001': '날 것을 손질하는 데에는 시간이 꽤 걸린다. 그것은 그 재료가 살아온 시간에 비하면 턱없이 짧은 시간임에 틀림없다.',
			'1013002': '매콤한 불 맛 좀 봐라!',
			'1013003': '이 참에 마스코트로 데뷔나 해볼까?',
			'1014001': '죄인들을 모두 심판하리라.\n',
			'1014002': '방황하는 자들에게는 인도를, 잠식된 이들에게는 구원을…',
			'1014003': '마녀들의 집회에는 가고 싶지 않아...',
			'1014004': '여름은 싫지만... 어쩔 수 없지...\n',
			'1015001': '어쩌면 그녀도 살고 싶어 할지 모른다.\n눈 속에서 살아 있는 클로버처럼.',
			'1015002': '오늘은... 조금 다른 옷을 입게 됐어요. 윌슨도요.',
			'1015003': '눈... 좋아하세요? 저는 싫어하지 않아요...',
			'1015004': '진열된 빵은 만지면 안 돼요... 윌슨이 지켜보고 있으니까...',
			'1015005': '아픔도, 기쁨도, 모두 제가 가져갈게요.',
			'1016001': '나랑 같이 밤 바람 쐬러 갈래?',
			'1016002': 'Your Games. Your Devices. Play Anywhere.',
			'1016003': '기다릴 필요 없어. 이미 도착했으니까!',
			'1016004': '그럼, 우리 어디까지 떠나볼까?',
			'1017001': '어디부터 시작할까? 어차피 전부 태워버릴 거지만.',
			'1017002': '제일 좋은 소독 방법은 소각이랍니다!',
			'1017003': '추우면 말씀해 주세요, 주인님... 얼마든지 데워드릴 테니까요. 흐흐...',
			'1017004': '재미있고 뜨거운 연소 반응 실험, 시작해볼까?',
			'1018001': '나이나 성별, 직업은 상관없습니다. \n그래서 얼마 주실 거죠?',
			'1018002': '축제는 좋아합니다. 사람의 경계심을 누그러뜨려주거든요.',
			'1018003': '언제든 불러주세요. 최상의 서비스로 모셔드릴 테니까요.',
			'1018004': '오늘 밤은 긴 밤이 될 것 같군요.',
			'1019001': '주인님, 오늘 메뉴는 엄청 기대해도 좋아!',
			'1019002': 'Trick or treat! 할로윈 마술 시작이야!',
			'1019003': '안녕! 오늘은 너희가 관객이 돼줄래?',
			'1019004': '더위도 도망가는 마술을 선보여줄게!',
			'1019005': '눈 떼지마! 토끼로 변할지도 모르니까!\n',
			'1020001': '자, 오늘은 어떤 꼬맹이들을 혼내주러 가야하지?',
			'1020002': '초대받지는 않았지만, 좀 끼어들어도 되지? 자, 어디부터 즐겨 볼까?',
			'1020003': '자. 이번엔 보물상자를 낚아보실까.',
			'1020004': '내 궤도에 들어온 이상 절대 도망칠 수 없어.',
			'1020005': '거역하는 놈들은 다 박살 내도 좋아.',
			'1021001': '이름과 교실, 확인 완료.',
			'1021002': '잡역부를 부르려던 거면 실수한 거야.',
			'1021003': '풀코스 준비 완료. 오늘의 메인 디쉬가 입에 맞으시면 좋겠군요.',
			'1021004': '흠, 특별히 오늘만이야.',
			'1022001': '뭐든지 말씀하세요, 메뉴에 없는 것도 주문 받으니까요!',
			'1022002': '하하, 죄송합니다! 쓰레기가 쌓여있는 건 못 참아서 말이에요.',
			'1022003': '치워야 할 게 산더미인데요? 얼른 시작하죠!',
			'1022004': '더블 엘! 여름에도 쉬지 않고 찾아갑니다!',
			'1022005': '성탄절 선물 받을 준비는 되셨나요?',
			'1022006': '잊지 마세요. 사신은 늘 당신 곁에 있습니다.',
			'1023001': '전쟁에서는 살아남은 쪽이 이긴 거라고 농담처럼 말하긴 합니다.',
			'1023002': '해를 끼치진 않을게요. 그냥 조금만. 아주 조금만 더 손보는 거예요.',
			'1023003': '저런, 점수 미달인 학생은 보충수업이랍니다~',
			'1023004': '쉿, 누가 들으면 큰일 날 거예요.',
			'1024001': '승리는 가만히 앉아서 거머쥘 수 있는 게 아니야.',
			'1024002': '내가 꿀 꿈은 내가 정하겠어.',
			'1024003': '주인님, 오늘 아침 식사 후 예정은, 저와 함께하는 체스 연습입니다.',
			'1025001': '잡생각이 많으면 빼앗길 뿐이야.',
			'1025002': '믿음이나 기도로는 해결할 수 없는 게 있지.',
			'1025003': '전 대원, 초대받지 못한 손님을 위해 환영 인사를 준비하도록.',
			'1026001': '성능 개선? 말만 해, 뭐든 최고의 성능을 끌어내 줄 테니까. ',
			'1026002': '내가 닿지 못할 곳은 없어. 한계가 없으니까.',
			'1026003': '세기의 발명은 재능과 노력, 그리고 카페인에서 나오는 법이야.',
			'1027001': '미션 클리어, 다음으로 넘어갈까요?',
			'1027002': '사건과 퍼즐의 공통점은 말이죠, 누군가 그걸 풀어주길 바란다는 겁니다.',
			'1028001': '빨리 수업이 끝나서 도서관에 갈 수 있으면 좋겠네요.',
			'1028002': '어떤 덕담을 써드려야 할까... 아! 생각났어요~',
			'1028003': '오늘은 바다가 들려주는 동화에 귀를 기울여봐요.',
			'1028004': '갓 나온 빵처럼 따뜻한 이야기, 들어보실래요?',
			'1028005': '우리들이 함께한 시간으로 또 하나의 책이 완성됐어요!',
			'1028006': '앞으로도 같이 써 내려가요. 우리들의 이야기를!',
			'1029001': '이제 좀 영웅이 된 기분이 드는데.',
			'1029002': '단련하기에 나쁘지 않은 환경이군.',
			'1029003': '눈 속에서도 난 지지 않아!\n',
			'1029004': '이제 항해를 시작한다, 제군.',
			'1030001': '안녕? 오늘은 달콤하게 온에어야!',
			'1030002': '초대장 잘 받았지? 지각하면 디저트는 없어!',
			'1030003': '일레븐과 함께하는 피서 일기! 지금 방송 시작할게!',
			'1030004': '영원히 잊지 못할 행복한 추억을 만들어줄게!',
			'1031001': '나의 화살은 부정한 모든 것을 꿰뚫을 거야.',
			'1031002': '이 한 발에 진심을 담아.',
			'1031003': '악몽이 반복되지 않도록 하겠어.',
			'1031004': '해를 가리고 있잖아. 비켜줄래?',
			'1031005': '내 화살이 빛을 밝혀줄 거야.',
			'1031006': '로얄 스트레이트 플러시. 이게 내 실력이야.',
			'1032001': '이런 역할을 맡는 것도 오랜만이군. 그럼, 행복한 휴일 되라고.',
			'1032002': '심판도, 룰도 없는 그라운드에서 살아남는 법을 가르쳐주지.',
			'1032003': '이번 마운드는 꽤 거칠어 보이는군.',
			'1033001': '그럴듯한 계획이라도 있는 거야? 덤벼 봐!',
			'1033002': '그냥 마음껏 뛰어놀라고? 간단한 대본이라도 달란 말이야!',
			'1033003': '비켜 비켜! 너희들 상대할 시간 없어!',
			'1033004': '현장에서 이런 사람을 발견하면 꼭 연락해!\n',
			'1033005': '어, 어쩔 수 없이 입는 거니까..! 이번 한 번뿐이야!',
			'1034001': '내 카메라로 이 아름다운 풍경을 다 담을 수 있을 지 모르겠어.',
			'1034002': '이 여정을 한 폭의 사진으로 담아낼 수 있다면...',
			'1035001': '좋은 싸움을 하기 위해서는 올바른 정신이 필요하다.',
			'1035002': '이 바닥은 말이야, 각오만으론 많이 부족하다고?',
			'1036001': '옛날에 길을 잃었을 땐 별을 보고 찾아갔대. 나도 너에게 그런 존재가 되고 싶어.',
			'1036002': '누군가의 평범한 삶을 지킬 수 있다면, 이걸로 된 거야.',
			'1036003': '준비한 선물이 있어. 받아줄래?',
			'1036004': '좋은 친구들, 행복한 추억... 이 시간이 영원했으면...',
			'1037001': '모든 게 엉망이군, 이제 정리해야겠어.',
			'1037002': '가면 뒤에 숨은 진짜 모습을 꺼내주지.',
			'1037003': '오늘 헤어 스타일, 잘 어울리는군.',
			'1038001': '여기서 보고 들었던 일들은 전부 잊어, 알겠니?',
			'1038002': '배우의 무기는 얼굴이 아니야. 어디서든 빛나는 자신감이지.',
			'1038003': '어떤 배역도 소화할 수 있어야, 일류 배우라고 할 수 있지.',
			'1039001': "'불가능'이었던 푸른 장미의 꽃말이 '기적'으로 바뀐 것을 아시나요? 오늘 우리의 만남도 불가능에서 기적으로 바뀌었네요.",
			'1039002': '사랑받는 모습이야말로 가장 아름다우니까요!',
			'1039003': '그대와 함께 걷는 길에 축복을!',
			'1040001': '접객은 저희에게 맡겨주세요.',
			'1040002': '올해도 함께 있어 줘서 고마워.\n<color=#10adff>니나도 고마워!</color>',
			'1041001': '가장 낮은 곳에 빛을 밝히겠나이다.',
			'1041002': '정화의 불꽃이 너희를 씻어낼 것이라.',
			'1042001': '단잠을 자던 이 몸을 왜 불렀느냐?',
			'1042002': '다행히 지각은 면했구나. 칭찬해주마.',
			'1042003': '그렇게나 이 몸이 필요했던 것이냐? 후후. 칭찬해주마!',
			'1042004': '흥, 이 몸의 감시에서 벗어날 수 있을 줄 알았더냐? 어리석긴!',
			'1043001': '해체하지 못할 폭탄은 없어. 조금, 아쉽지만.',
			'1043002': '톡톡 쏘는 맛과 펑펑 터지는 맛, 넌 어느 쪽이 좋아?',
			'1043003': '되도록이면 멀리, 아무도 찾지 못할 곳으로.',
			'1043004': '스릴을 찾아온 거라면, 제대로 왔어.',
			'1044001': '애원해도 소용없어, 보내줄 생각이 없거든.',
			'1044002': '네가 가진 모든 걸 보여줄 차례다.',
			'1044003': '빨리 덤벼. 내가 지금 시간이 없어서 말이야.',
			'1045001': '그래서, 제 자리가 어디죠?',
			'1045002': '옷이 날개라는 말. 딱 이럴 때를 두고 하는 말이죠.',
			'1045003': '물 좀 안 튀기게 좀 떨어져서 놀면 안 되나요?',
			'1045004': '춤이랑 노래도 자신 있냐구요? 글쎄요, 어떻게 보이는데요?',
			'1046001': '너도 인생이 꼬였던 모양이군. 하지만 떠나줘야겠어.',
			'1046002': '난처한 상황에 처하는 취미라도 있나?',
			'1046003': '커피, 주문했나?',
			'1047001': '모두들 잘 있어, 난 먼저 나가볼게~',
			'1047002': '가진 게 많을수록, 잃는 것도 많아지는 법이란다?',
			'1047003': '끝맛이 씁쓸해야 초콜릿도 더 달게 느껴지는 법이지, 후후.',
			'1047004': '꽤나 혹독한 훈련이 될지도 몰라, 괜찮지?',
			'1048001': '붓과 함께라면, 어디든 내 캔버스야!',
			'1048002': '네가 좋아하는 색엔, 어떤 마법의 힘이 담겨있을까?',
			'1048003': '작은 점들이 모여 큰 그림이 완성되는 걸 보면... 두근거리지 않아..?',
			'1049001': 'Ready, Check, Good! 루미아 랜드에서 즐거운 시간을 보낼 수 있도록 노력할게!\n',
			'1049002': 'Play smart. Win more. OP.GG',
			'1049003': '거기, 수상한 당신! 잠깐 검문이 있겠습니다!',
			'1049004': '무더위에 지지말고 축제를 즐기자!',
			'1050001': '누군가를 위한 무대가 아닌, 오직 저만을 위한 무대예요.',
			'1050002': '기다리는 건 별로 좋아하지 않는데 말이죠.',
			'1050003': '학생의 본분이 무엇인지, 지금부터 다시 가르쳐 드리죠.',
			'1050004': '연습은 실전처럼, 기본은 충실하게.',
			'1051001': '끝없이 피어나는 꽃처럼, 제 노래는 멈추지 않아요.',
			'1051002': '아, 방금 좋은 가사들이 떠올랐어요.\n지금 한 번 엮어볼까요?',
			'1052001': '저는 그저 길을 보여드릴 뿐이에요. 그 길을 걸을지는 당신에게 달렸죠.',
			'1052002': '제 운명을 받아주시겠어요?',
			'1053001': '약자가 살아남을 수 있는 세상이 아니다.',
			'1053002': '누구 앞에서 감히 자비를 언급하는 거냐.',
			'1054001': '바다를 우습게 보지 말라고. 어이! 거기 너한테 하는 말이다, 이 자식아!',
			'1054002': '거친 놈들만 살아남는 게 이 바닥의 룰이라고!',
			'1055001': '여기서부터는 제 관할구역이에요. 진입하겠습니다!',
			'1055002': '오늘 수업은 소방 안전 교육입니다!',
			'1055003': '거기 다치신 분! 혹시 피도 나나요?',
			'1055004': '이번 훈련의 목표는 안전!',
			'1056001': '항상 부족하다 느껴지는 것. 돈과 단련의 공통점이지.',
			'1056002': '보아하니 넌 마음을 비워낼 필요가 좀 있을 것 같군.',
			'1057001': '좋아, 이번엔 나침반을 따라가 볼까.',
			'1057002': '오직 진실과 공정함으로 기자로서의 초심을 잊지 않도록..\n<color=#FFBB00>[보이스 변경]</color>',
			'1058001': '영원한 적 같은 건 없어. 잠재적 파트너만 있을 뿐이야.',
			'1058002': '수고엔 보상이 따르는 법.',
			'1058003': '프로가 내려주는 특별한 커피 맛이 궁금하지 않아?',
			'1058004': '같이 한 잔 하겠어? 오늘은 특별한 날이니까.',
			'1058005': '과거가 아닌 미래를 위해, 건배.',
			'1059001': '성의를 보인다면 우정으로 보답해주겠네.',
			'1059002': '사적인 감정은 없어. 네 목에 달린 현상금에 볼일이 있는 거지.',
			'1060001': '파괴를 통해 새로운 가치를 찾는 것, 그것이 바로 예술이야.',
			'1060002': '기다리는 시간조차 행복한 날이야.',
			'1061001': '귀엽다고 봐주기 없기예요!',
			'1061002': '수수께끼의 요원 알렘! 의뢰비는 생선으로 받습니다!',
			'1062001': '우리가 끝내지 않으면 달리 누가 하겠습니까.',
			'1062002': '다만 싸워서 지켜낸다. 그뿐입니다.',
			'1062003': '복창합니다. 목표 확인, 조준, 발사.',
			'1063001': '이게 네가 말한 최선의 방책이야?',
			'1063002': '항상 기도해요. 이 악몽같은 날들이 끝나길...',
			'1064001': '행복한 꿈만 꿀 거라 생각했나요?',
			'1064002': '같이 꿈 속으로 헤엄쳐볼까요?',
			'1064003': '환상이 현실이 되는 날, 우린 만날 거예요.',
			'1065001': '<color=#cb2849>본부, 현재 상황 이상 없음.</color> \n<color=#10adff>오! 엄청 수상한 놈이 오는데!</color>',
			'1065002': '<color=#00FFFF>시원하게 놀 준비 됐지? </color> \n<color=#F78181>방해만 하지 마.</color>',
			'1065003': '<color=#00FFFF>이거 내가 진짜 좋아하는 노랜데, 들어볼래?</color> \n<color=#F78181>내 건 이미 들려줬어.</color>',
			'1066001': '이것으로 역사가 또 한 번 뒤집어지겠군.',
			'1067001': '나쁜 짓을 하셨으면 벌을 받으셔야죠?\n',
			'1067002': '토끼와 게임 한판, 어떠신가요?',
			'1068001': '노장과 로망은 죽지 않는 법!',
			'1068002': '누구냐! 겁도 없이 내 앞을 막는 녀석은!',
			'1069001': '자~ 모두 집중~ 지금부터 레니 군악대 행진이 시작됩니다~',
			'1069002': '세상에서 제~일 달콤한 초콜릿이야! 나눠주지 말고 네가 다 먹어야 해~?\n',
			'1070001': '나는 어두운 곳에 핀 한 떨기 매화.',
			'1071001': '전부 태워주지. 네놈의 업보까지.',
			'1072001': '쉿. 모두 자고 있잖아.',
			'1072002': '자, 모두 집중. 시범은 딱 한 번 뿐이야.',
			'1073001': '잘 어울리나요? 후후, 다녀오겠습니다!\n',
			'1073002': '함께 해주세요. 저 깊은 어둠 속으로...',
			'1074001': '다 잃으셨다고? 걱정 마, 나한테 다 계획이 있으니까.',
			'1075001': '이 밤에 어울리는 아름다운 선율을 연주해줄게.\n',
			'1076001': '아아, 드디어 내 차례가 온 거 맞지?\n',
			'1077001': '도를 추구하는 자, 얽매이지 말지어다.',
			'1078001': '어이, 지금 밟고 있는 땅이 누구 구역인지 알고는 있는 거야?',
		},
		itemGrade: {
			None: '없음',
			Common: '일반',
			Uncommon: '고급',
			Rare: '희귀',
			Epic: '영웅',
			Legend: '전설',
			Mythic: '초월',
		},
		monsterName: {
			'1': '닭',
			'2': '박쥐',
			'3': '멧돼지',
			'4': '들개',
			'5': '늑대',
			'6': '곰',
			'7': '위클라인',
			'8': '알파',
			'9': '오메가',
			'10': '감마',
			'11': '드론',
			'12': '변이 닭',
			'13': '변이 박쥐',
			'14': '변이 멧돼지',
			'15': '변이 들개',
			'16': '변이 늑대',
			'17': '변이 곰',
			'18': '까마귀',
			'19': '변이 까마귀',
			'20': '버려진 연구실 박쥐',
			'100': '터렛',
			'101': '닭',
			'102': '박쥐',
			'103': '멧돼지',
			'104': '들개',
			'105': '늑대',
			'106': '곰',
			'107': '위클라인',
			'108': '알파',
			'109': '오메가',
			'110': '감마',
			'111': '드론',
			'112': '변이 닭',
			'113': '변이 박쥐',
			'114': '변이 멧돼지',
			'115': '변이 들개',
			'116': '변이 늑대',
			'117': '변이 곰',
		},
		traitName: {
			'7000000': '파괴',
			'7000201': '취약',
			'7000401': '흡혈마',
			'7000501': '벽력',
			'7000601': '아드레날린',
			'7000701': '액셀러레이터',
			'7010101': '철갑탄',
			'7010201': '복수자',
			'7010301': '수확',
			'7010311': '엔도르핀',
			'7010401': '갈증',
			'7010501': '열세극복',
			'7010601': '영혼 흡수 장치',
			'7010701': '상처 악화',
			'7010901': '광분',
			'7011001': '약자 멸시',
			'7100000': '저항',
			'7100101': '금강',
			'7100201': '불괴',
			'7100301': '망각',
			'7100401': '빛의 수호',
			'7100501': '응징',
			'7110101': '대담',
			'7110201': '특공대',
			'7110301': '둔감',
			'7110401': '견고',
			'7110501': '중장갑',
			'7110601': '먹보',
			'7110701': '불굴',
			'7110801': '캠핑 가이드',
			'7110901': '육식주의',
			'7111001': '진통제',
			'7200000': '지원',
			'7200101': '초재생',
			'7200201': '증폭 드론',
			'7200301': '치유 드론',
			'7200401': '추진력',
			'7200501': '헌신',
			'7210101': '가시 덤불',
			'7210201': '집결',
			'7210301': '테이아',
			'7210401': '후방 보급',
			'7210501': '시가전',
			'7210601': '스프린터',
			'7210801': '할인 쿠폰',
			'7211001': '사냥의 전율',
			'7211101': '코인 토스',
			'7300000': '혼돈',
			'7300101': '스텔라 차지',
			'7300201': '도깨비불',
			'7300301': '와류',
			'7310101': '힘의 축적',
			'7310201': '서큘러 시스템',
			'7310301': '오버워치',
			'7310401': '철갑탄',
			'7310501': 'R_echarger',
			'7900101': '공격력 I',
			'7900102': '공격력 II',
			'7900103': '공격력 III',
			'7900201': '방어력 I',
			'7900202': '방어력 II',
			'7900203': '방어력 III',
			'7900301': '공격 속도 I',
			'7900302': '공격 속도 II',
			'7900303': '공격 속도 IIl',
			'7900401': '이동 속도 I',
			'7900402': '이동 속도 II',
			'7900403': '이동 속도 Ill',
			'7900501': '쿨다운 감소 I',
			'7900502': '쿨다운 감소 Il',
			'7900503': '쿨다운 감소 Ill',
			'7900601': '모든 피해 흡혈 I',
			'7900602': '모든 피해 흡혈 Il',
			'7900603': '모든 피해 흡혈 IlI',
			'7900701': '방해 효과 저항 I',
			'7900702': '방해 효과 저항 ',
			'7900703': '방해 효과 저항',
			'7900801': '치명타 확률 I',
			'7900802': '치명타 확률 Il',
			'7900803': '치명타 확률 Ill',
			'7910101': '공격력 I',
			'7910111': '공격력 II',
			'7910121': '공격력 III',
			'7910201': '방어력 I',
			'7910211': '방어력 II',
			'7910221': '방어력 III',
			'7910301': '공격 속도 I',
			'7910311': '공격 속도 II',
			'7910321': '공격 속도 IIl',
			'7910401': '이동 속도 I',
			'7910411': '이동 속도 II',
			'7910421': '이동 속도 Ill',
			'7910501': '쿨다운 감소 I',
			'7910511': '쿨다운 감소 Il',
			'7910521': '쿨다운 감소 Ill',
			'7910601': '치명타 피해 I',
			'7910611': '치명타 피해 Il',
			'7910621': '치명타 피해 Ill',
			'7910701': '스킬 증폭 I',
			'7910711': '스킬 증폭 Il',
			'7910721': '스킬 증폭 IlI',
			'7920101': '철벽 I',
			'7920102': '철벽 Il',
			'7920103': '철벽',
			'7920201': '하이퍼 크리티컬 I',
			'7920202': '하이퍼 크리티컬 Il',
			'7920203': '광견병',
			'7920301': '생명력 강탈 I',
			'7920302': '생명력 강탈 Il',
			'7920303': '생명력 강탈',
			'7920401': '고귀한 희생 I',
			'7920402': '고귀한 희생 Il',
			'7920403': '고귀한 희생',
			'7920501': '잠꾸러기 I',
			'7920502': '잠꾸러기 Il',
			'7920503': '잠꾸러기',
			'7920603': '소생',
			'7920701': '전능자 I',
			'7920702': '전능자 Il',
			'7920703': '전능자',
			'7920801': '오염된 늪 I',
			'7920802': '오염된 늪 Il',
			'7920803': '오염된 늪',
			'7920903': '함구령',
			'7921003': '플라즈마 노바',
			'7921101': '시너지 I',
			'7921102': '시너지 Il',
			'7921103': '시너지',
			'7921203': '압도적인 힘',
			'7921301': '대용량 충전지 I',
			'7921302': '대용량 충전지 Il',
			'7921303': '대용량 충전지',
			'7921401': '수집가 I',
			'7921402': '수집가 II',
			'7921403': '수집가 III',
			'7921501': '디스코 I',
			'7921502': '디스코 Il',
			'7921503': '디스코',
			'7921602': '라이프 백',
			'7921701': '기동 타격대 I',
			'7921702': '기동 타격대 Il',
			'7921703': '기동 타격대',
			'7921802': '수상한 실험',
			'7921903': '발키리 드라이브',
			'7922003': 'A.M.D.S',
			'7922102': '지진파',
			'7922201': '상처 찢기 I',
			'7922202': '상처 찢기 Il',
			'7922203': '상처 찢기',
			'7922302': '철갑탄',
			'7922402': '수확 Mk2',
			'7922502': '둔감',
			'7922602': '견고',
			'7922702': '가시 덤불',
			'7922803': '대리인',
			'7922903': '유독성 발자국',
			'7923002': '강림',
			'7923101': '산울림 I',
			'7923102': '산울림 Il',
			'7923103': '산울림',
			'7923201': '하이퍼 크리티컬 I',
			'7923202': '하이퍼 크리티컬 Il',
			'7923203': '하이퍼 크리티컬',
			'7923302': '오버워치',
			'7923401': '중력장',
			'7923411': '롤링썬더',
			'7923421': '대지분쇄',
			'7923502': '불굴',
			'7923602': '진통제',
			'7923703': '최후통첩',
			'7923803': '찰나의 악몽',
			'7923903': '카트로즈',
		},
		skinName: {
			'1001000': '재키',
			'1001001': '처형자 재키',
			'1001002': '스칼렛 코사지 재키',
			'1001003': '시스템쇼크 재키',
			'1001004': '사관후보생 재키',
			'1001005': '고스트헌터 재키',
			'1002000': '아야',
			'1002001': '경찰 아야',
			'1002002': '불꽃놀이 아야',
			'1002003': '하우스키퍼 아야',
			'1002004': '사관후보생 아야',
			'1003000': '피오라',
			'1003001': '장교 피오라',
			'1003002': '총사 피오라',
			'1003003': '파티드레스 피오라',
			'1003004': '하우스키퍼 피오라',
			'1003005': '제식 교관 피오라',
			'1004000': '매그너스',
			'1004001': '보스 매그너스',
			'1004002': '남국 매그너스',
			'1004003': '반항아 매그너스',
			'1004004': '사관후보생 매그너스',
			'1005000': '자히르',
			'1005001': '사신 자히르',
			'1005002': '사이코시스 자히르',
			'1005003': '부자히르',
			'1006000': '나딘',
			'1006001': '헌터 나딘',
			'1006002': '빨간 망토 나딘',
			'1006003': '야생의 부름 나딘',
			'1006004': '악마사냥꾼 나딘',
			'1007000': '현우',
			'1007001': '뒷골목 현우',
			'1007002': '레드데블 현우',
			'1007003': '사관후보생 현우',
			'1007004': '사관후보생 현우 이터니티 스킨',
			'1007005': '멧현우',
			'1007006': '해변가 현우',
			'1008000': '하트',
			'1008001': '밴드 리더 하트',
			'1008002': '눈꽃축제 하트',
			'1008003': '퍼플퀸 하트',
			'1008004': '군악대 하트',
			'1008005': '사관후보생 하트',
			'1009000': '아이솔',
			'1009001': '아포칼립스 아이솔',
			'1009002': '고스트헌터 아이솔',
			'1009003': '새해 토끼 아이솔',
			'1009004': '사관후보생 아이솔',
			'1010000': '리 다이린',
			'1010001': '여행자 리 다이린',
			'1010002': '반항아 리 다이린',
			'1010003': '용 다이린',
			'1010004': '어흥 다이린',
			'1010005': '한여름의 취기 리 다이린',
			'1010006': '사관후보생 리 다이린',
			'1011000': '유키',
			'1011001': '사관후보생 유키',
			'1011002': '일도양단 유키',
			'1011003': '미드나잇 시노비 유키',
			'1011004': '유키멍',
			'1011005': '고스트헌터 유키',
			'1012000': '혜진',
			'1012001': '목련꽃 혜진',
			'1012002': '사관후보생 혜진',
			'1012003': '고스트헌터 혜진',
			'1012004': '수험생 혜진',
			'1012005': '성야의 무녀 혜진',
			'1013000': '쇼우',
			'1013001': '일식요리사 쇼우',
			'1013002': '피구왕 쇼우',
			'1013003': '판다왔쇼우',
			'1014000': '키아라',
			'1014001': '심판자 키아라',
			'1014002': '고스트헌터 키아라',
			'1014003': '마녀 키아라',
			'1014004': '해변가 키아라',
			'1015000': '시셀라',
			'1015001': '겨울 클로버 시셀라',
			'1015002': '노블 시셀라',
			'1015003': '눈꽃축제 시셀라',
			'1015004': '윌슨 베이커리 시셀라',
			'1015005': '몽환의 악마 시셀라',
			'1016000': '실비아',
			'1016001': '미드나잇 브리즈 실비아',
			'1016002': 'GeForce Now 실비아',
			'1016003': '퍼펙트 딜리버리 실비아',
			'1016004': '여행자 실비아',
			'1017000': '아드리아나',
			'1017001': '파이어뱃 아드리아나',
			'1017002': '해충박멸 아드리아나',
			'1017003': '메이드 아드리아나',
			'1017004': '위드리아나',
			'1018000': '쇼이치',
			'1018001': '히트맨 쇼이치',
			'1018002': '눈꽃축제 쇼이치',
			'1018003': '퍼펙트 서버 쇼이치',
			'1018004': '뱀파이어 쇼이치',
			'1019000': '엠마',
			'1019001': '메이드 엠마',
			'1019002': '마녀 엠마',
			'1019003': '숲속 친구들 엠마',
			'1019004': '썸머 파티 매지션 엠마',
			'1019005': '매지컬 래빗 엠마',
			'1020000': '레녹스',
			'1020001': '언더보스 레녹스',
			'1020002': '성야 레녹스',
			'1020003': '해적 레녹스',
			'1020004': '사이버에니악 레녹스',
			'1020005': '심연의 마왕 레녹스',
			'1021000': '로지',
			'1021001': '블랙로즈 로지',
			'1021002': '네메시스 로지',
			'1021003': '하우스키퍼 로지',
			'1021004': '발렌타인 로지',
			'1022000': '루크',
			'1022001': '바텐더 루크',
			'1022002': '뒷골목 루크',
			'1022003': '사관후보생 루크',
			'1022004': '썸머 타임 클리너 루크',
			'1022005': '루돌크',
			'1022006': '사신 루크',
			'1023000': '캐시',
			'1023001': '군의관 캐시',
			'1023002': '사이키메딕 캐시',
			'1023003': '선생님 캐시',
			'1023004': '프리즌 브레이크 캐시',
			'1024000': '아델라',
			'1024001': '화이트 퀸 아델라',
			'1024002': '꿈델라',
			'1024003': '메이드 아델라',
			'1025000': '버니스',
			'1025001': '아포칼립스 버니스',
			'1025002': '악마사냥꾼 버니스',
			'1025003': '하우스키퍼 버니스',
			'1026000': '바바라',
			'1026001': '정비공 바바라',
			'1026002': '코즈믹 엔지니어 바바라',
			'1026003': '연구원 바바라',
			'1027000': '알렉스',
			'1027001': '오퍼레이터 알렉스',
			'1027002': '사립탐정 알렉스',
			'1028000': '수아',
			'1028001': '사관후보생 수아',
			'1028002': '새해의 이야기꾼 수아',
			'1028003': '해변가 수아',
			'1028004': '카페 알바 수아',
			'1028005': '1st Anniversary 수아',
			'1028006': '1st Anniversary Dawn 수아',
			'1029000': '레온',
			'1029001': '특수부대 레온',
			'1029002': '썸머 파티 레온',
			'1029003': '스노보더 레온',
			'1029004': '장교 레온',
			'1030000': '일레븐',
			'1030001': '스위트 일레븐',
			'1030002': '티타임 래빗 일레븐',
			'1030003': '선샤인 마린 일레븐',
			'1030004': '러블리 세레나데 일레븐',
			'1031000': '리오',
			'1031001': '무녀 리오',
			'1031002': '정의의 마법소녀 리오',
			'1031003': '사랑의 마법소녀 리오',
			'1031004': '여름방학 리오',
			'1031005': '미드나잇 오로라 리오',
			'1031006': '퍼펙트 샷 바니 리오',
			'1032000': '윌리엄',
			'1032001': '고요한 밤의 신사 윌리엄',
			'1032002': '뒷골목 윌리엄',
			'1032003': '아포칼립스 윌리엄',
			'1033000': '니키',
			'1033001': '뒷골목 니키',
			'1033002': '비치발리볼 니키',
			'1033003': '문제아 니키',
			'1033004': '사립탐정 니키',
			'1033005': '언럭키 바니 니키',
			'1034000': '나타폰',
			'1034001': '극지탐험 나타폰',
			'1034002': '탐험가 나타폰',
			'1035000': '얀',
			'1035001': '무에타이 챔피언 얀',
			'1035002': '챌린지 리퍼 얀',
			'1036000': '이바',
			'1036001': '별 관찰자 이바',
			'1036002': '사관후보생 이바',
			'1036003': '발렌타인 이바',
			'1036004': '한여름의 추억 이바',
			'1037000': '다니엘',
			'1037001': '역병의사 다니엘',
			'1037002': '마스커레이드 다니엘',
			'1037003': '화이트데이 다니엘',
			'1038000': '제니',
			'1038001': '마피아 제니',
			'1038002': '마스커레이드 제니',
			'1038003': '럭셔리 바니 제니',
			'1039000': '카밀로',
			'1039001': '연미복 카밀로',
			'1039002': '아이돌 카밀로',
			'1039003': '요밀로',
			'1040000': '클로에',
			'1040001': '메이드 클로에',
			'1040002': '새해 토끼 클로에',
			'1041000': '요한',
			'1041001': '대행자 요한',
			'1041002': '악마사냥꾼 요한',
			'1042000': '비앙카',
			'1042001': '파자마 비앙카',
			'1042002': '전학생 비앙카',
			'1042003': '사관후보생 비앙카',
			'1042004': '프리즌 키퍼 비앙카',
			'1043000': '셀린',
			'1043001': '폭탄해체반 셀린',
			'1043002': '메가펌킨 셀린',
			'1043003': '여유로운 발걸음 셀린',
			'1043004': '봄버 래빗 셀린',
			'1044000': '에키온',
			'1044001': '뒷골목 에키온',
			'1044002': '사관후보생 에키온',
			'1044003': '암흑가 에키온',
			'1045000': '마이',
			'1045001': '전학생 마이',
			'1045002': '사관후보생 마이',
			'1045003': '엘레강트 썸머 마이',
			'1045004': '아이돌 마이',
			'1046000': '에이든',
			'1046001': '고스트헌터 에이든',
			'1046002': '해결사 에이든',
			'1046003': '카페 매니저 에이든',
			'1047000': '라우라',
			'1047001': '프리즌 브레이크 라우라',
			'1047002': '암흑가 라우라',
			'1047003': '비터스윗 라우라',
			'1047004': '작전 교관 라우라',
			'1048000': '띠아',
			'1048001': '거리의 화가 띠아',
			'1048002': '견습 마녀 띠아',
			'1048003': '픽셀아트 띠아',
			'1049000': '펠릭스',
			'1049001': '놀이공원 펠릭스',
			'1049002': 'OP.GG 펠릭스',
			'1049003': '기동 경찰 펠릭스',
			'1049004': '한여름의 축제 펠릭스',
			'1050000': '엘레나',
			'1050001': '블랙스완 엘레나',
			'1050002': '한겨울 엘레나',
			'1050003': '학생회장 엘레나',
			'1050004': '사관후보생 엘레나',
			'1051000': '프리야',
			'1051001': '영원의 꽃 프리야',
			'1051002': '싱어송라이터 프리야',
			'1052000': '아디나',
			'1052001': '운명의 아르카나 아디나',
			'1052002': '영원한 서약 아디나',
			'1053000': '마커스',
			'1053001': '아포칼립스 마커스',
			'1053002': '악마사냥꾼 마커스',
			'1054000': '칼라',
			'1054001': '해상구조요원 칼라',
			'1054002': '뒷골목 칼라',
			'1055000': '에스텔',
			'1055001': '소방기동대 에스텔',
			'1055002': '교내소방부 에스텔',
			'1055003': '앙스텔',
			'1055004': '안전 교관 에스텔',
			'1056000': '피올로',
			'1056001': '도전자 피올로',
			'1056002': '스트리트 파이터 피올로',
			'1057000': '마르티나',
			'1057001': '탐험기자 마르티나',
			'1057002': '20년 전 마르티나',
			'1058000': '헤이즈',
			'1058001': '암흑가 헤이즈',
			'1058002': '프라이빗 썸머 헤이즈',
			'1058003': '카페 매니저 헤이즈',
			'1058004': '1st Anniversary 헤이즈',
			'1058005': '1st Anniversary Blanc 헤이즈',
			'1059000': '아이작',
			'1059001': '암흑가 아이작',
			'1059002': '와일드웨스트 아이작',
			'1060000': '타지아',
			'1060001': '브로큰 글래스 타지아',
			'1060002': '발렌타인 타지아',
			'1061000': '이렘',
			'1061001': '눈싸움 이렘',
			'1061002': '알렘',
			'1062000': '테오도르',
			'1062001': '기동특임대 테오도르',
			'1062002': '전투사제 테오도르',
			'1062003': '사격 교관 테오도르',
			'1063000': '이안',
			'1063001': '구속된 이안',
			'1063002': '구원받지 못한 이안',
			'1064000': '바냐',
			'1064001': '불길한 꿈의 주인 바냐',
			'1064002': '한여름의 꿈 바냐',
			'1064003': '홀로그래프 페어리 바냐',
			'1065000': '데비&마를렌',
			'1065001': '경호원 데비&마를렌',
			'1065002': '스파클링 트윈즈 데비&마를렌',
			'1065003': '방과 후 자유시간 데비&마를렌',
			'1066000': '아르다',
			'1066001': '고고학 연구원 아르다',
			'1067000': '아비게일',
			'1067001': '프리즌 키퍼 아비게일',
			'1067002': '포커페이스 바니 아비게일',
			'1068000': '알론소',
			'1068001': '신사 알론소',
			'1068002': '지옥의 선봉장 알론소',
			'1069000': '레니',
			'1069001': '군악대 레니',
			'1069002': '스위트 데빌 레니',
			'1070000': '츠바메',
			'1070001': '암향소영 츠바메',
			'1071000': '케네스',
			'1071001': '전투사제 케네스',
			'1072000': '카티야',
			'1072001': '밤까마귀 카티야',
			'1072002': '훈련소장 카티야',
			'1073000': '샬럿',
			'1073001': '전학생 샬럿',
			'1073002': '타락의 유열 샬럿',
			'1074000': '다르코',
			'1074001': '딜러 다르코',
			'1075000': '르노어',
			'1075001': '그레이스 녹턴 르노어',
			'1076000': '가넷',
			'1076001': '구속된 가넷',
			'1077000': '유민',
			'1077001': '방랑도사 유민',
			'1078000': '히스이',
			'1078001': '뒷골목 히스이',
			'1079000': '유스티나',
			'1080000': '이슈트반',
			'1081000': '니아',
		},
		characterName: {
			'0': '무작위',
			'1': '재키',
			'2': '아야',
			'3': '피오라',
			'4': '매그너스',
			'5': '자히르',
			'6': '나딘',
			'7': '현우',
			'8': '하트',
			'9': '아이솔',
			'10': '리 다이린',
			'11': '유키',
			'12': '혜진',
			'13': '쇼우',
			'14': '키아라',
			'15': '시셀라',
			'16': '실비아',
			'17': '아드리아나',
			'18': '쇼이치',
			'19': '엠마',
			'20': '레녹스',
			'21': '로지',
			'22': '루크',
			'23': '캐시',
			'24': '아델라',
			'25': '버니스',
			'26': '바바라',
			'27': '알렉스',
			'28': '수아',
			'29': '레온',
			'30': '일레븐',
			'31': '리오',
			'32': '윌리엄',
			'33': '니키',
			'34': '나타폰',
			'35': '얀',
			'36': '이바',
			'37': '다니엘',
			'38': '제니',
			'39': '카밀로',
			'40': '클로에',
			'41': '요한',
			'42': '비앙카',
			'43': '셀린',
			'44': '에키온',
			'45': '마이',
			'46': '에이든',
			'47': '라우라',
			'48': '띠아',
			'49': '펠릭스',
			'50': '엘레나',
			'51': '프리야',
			'52': '아디나',
			'53': '마커스',
			'54': '칼라',
			'55': '에스텔',
			'56': '피올로',
			'57': '마르티나',
			'58': '헤이즈',
			'59': '아이작',
			'60': '타지아',
			'61': '이렘',
			'62': '테오도르',
			'63': '이안',
			'64': '바냐',
			'65': '데비&마를렌',
			'66': '아르다',
			'67': '아비게일',
			'68': '알론소',
			'69': '레니',
			'70': '츠바메',
			'71': '케네스',
			'72': '카티야',
			'73': '샬럿',
			'74': '다르코',
			'75': '르노어',
			'76': '가넷',
			'77': '유민',
			'78': '히스이',
			'79': '유스티나',
			'80': '이슈트반',
			'81': '니아',
			'9999': '나쟈',
		},
		specialItemType: {
			None: '없음',
			Special: '특수',
			Summon: '설치',
			GhostItem: '특수',
			Gadget: '가젯',
			OnSelect: '전환',
		},
		armorType: {
			None: '없음',
			Head: '머리',
			Chest: '옷',
			Arm: '팔/장식',
			Leg: '다리',
			Trinket: '장식',
		},
	},
} satisfies BaseTranslation

export default ko
