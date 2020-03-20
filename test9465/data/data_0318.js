// 언어설정 전역변수. 기본값은 한글
var LANG = 'kr'

// 언어설정 전역변수를 안전하게 변경
const setLang = function (newLang) {
	// 문자열이 아니라면 걸러냄
	if ((typeof newLang).toLowerCase() !== 'string')
	{
		console.log('data.js, setLang(): 입력값이 올바르지 않음:', newLang)
		return false
	}
	
	// 적합한 문자열이 아니라면 걸러냄
	if ('kr|en|jp|cn'.indexOf(newLang.toLowerCase()) < 0)
	{
		console.log('data.js, setLang(): 입력값이 올바르지 않음:', newLang)
		return false
	}
	
	// 입력값이 적합하다면 소문자로 만들어서 언어 설정 변경
	LANG = newLang.toLowerCase()
	
	return LANG
}

// 언어설정 전역변수를 안전하게 가져옴
const getLang = function () {
	// 문자열이 아니라면 기본값으로 초기화
	if ((typeof LANG).toLowerCase() !== 'string')
	{
		console.log('data.js, getLang(): 언어설정이 올바르지 않아 "kr"로 초기화:', LANG)
		LANG = 'kr'
	}
	
	// 적합한 문자열이 아니라면 기본값으로 초기화
	if ('kr|en|jp|cn'.indexOf(LANG.toLowerCase()) < 0)
	{
		console.log('data.js, getLang(): 언어설정이 올바르지 않아 "kr"로 초기화:', LANG)
		LANG = 'kr'
	}
	
	LANG = LANG.toLowerCase()
	
	return LANG
}


/*
// object
data : {
	creationTime,
	tagData,
	opData
}

// array of objects
tagData : {
	[
		{
			id,
			name,
			tagCode
		},
		{
			id,
			name,
			tagCode
		}
	]
}

// array of objects
opData : {
	[
		{
			id,
			name,
			rarity,
			tagCode
		},
		{
			id,
			name,
			rarity,
			tagCode
		}
	]
}

// object
name : {
	kr,
	en,
	jp,
	cn
}
*/

var data = JSON.parse('{"creationTime":1580586625,"tagData":[{"id":0,"tagCode":1,"name":{"kr":"신입","en":"Starter","jp":"","cn":""}},{"id":1,"tagCode":2,"name":{"kr":"특별채용","en":"Senior Operator","jp":"","cn":""}},{"id":2,"tagCode":4,"name":{"kr":"고급특별채용","en":"Top Operator","jp":"","cn":""}},{"id":3,"tagCode":8,"name":{"kr":"근거리","en":"Melee","jp":"","cn":""}},{"id":4,"tagCode":16,"name":{"kr":"원거리","en":"Ranged","jp":"","cn":""}},{"id":5,"tagCode":32,"name":{"kr":"뱅가드","en":"Vanguard","jp":"","cn":""}},{"id":6,"tagCode":64,"name":{"kr":"가드","en":"Guard","jp":"","cn":""}},{"id":7,"tagCode":128,"name":{"kr":"디펜더","en":"Defender","jp":"","cn":""}},{"id":8,"tagCode":256,"name":{"kr":"스나이퍼","en":"Sniper","jp":"","cn":""}},{"id":9,"tagCode":512,"name":{"kr":"캐스터","en":"Caster","jp":"","cn":""}},{"id":10,"tagCode":1024,"name":{"kr":"메딕","en":"Medic","jp":"","cn":""}},{"id":11,"tagCode":2048,"name":{"kr":"서포터","en":"Supporter","jp":"","cn":""}},{"id":12,"tagCode":4096,"name":{"kr":"스페셜리스트","en":"Specialist","jp":"","cn":""}},{"id":13,"tagCode":8192,"name":{"kr":"힐링","en":"Healing","jp":"","cn":""}},{"id":14,"tagCode":16384,"name":{"kr":"지원","en":"Support","jp":"","cn":""}},{"id":15,"tagCode":32768,"name":{"kr":"딜러","en":"DPS","jp":"","cn":""}},{"id":16,"tagCode":65536,"name":{"kr":"범위공격","en":"AoE","jp":"","cn":""}},{"id":17,"tagCode":131072,"name":{"kr":"감속","en":"Slow","jp":"","cn":""}},{"id":18,"tagCode":262144,"name":{"kr":"생존형","en":"Survival","jp":"","cn":""}},{"id":19,"tagCode":524288,"name":{"kr":"방어형","en":"Defense","jp":"","cn":""}},{"id":20,"tagCode":1048576,"name":{"kr":"디버프","en":"Debuff","jp":"","cn":""}},{"id":21,"tagCode":2097152,"name":{"kr":"강제이동","en":"Shift","jp":"","cn":""}},{"id":22,"tagCode":4194304,"name":{"kr":"제어형","en":"Crowd Control","jp":"","cn":""}},{"id":23,"tagCode":8388608,"name":{"kr":"누커","en":"Nuker","jp":"","cn":""}},{"id":24,"tagCode":16777216,"name":{"kr":"소환","en":"Summon","jp":"","cn":""}},{"id":25,"tagCode":33554432,"name":{"kr":"쾌속부활","en":"Fast-Redeploy","jp":"","cn":""}},{"id":26,"tagCode":67108864,"name":{"kr":"코스트+","en":"DP-Recovery","jp":"","cn":""}},{"id":27,"tagCode":134217728,"name":{"kr":"로봇","en":"Robot","jp":"","cn":""}},{"id":28,"tagCode":268435456,"name":{"kr":"출현불가","en":"","jp":"","cn":""}}],"opData":[{"id":0,"rarity":6,"tagCode":269517332,"name":{"kr":"에이야퍄들라","en":"Eyjafjalla","jp":"エイヤフィヤトラ","cn":"艾雅法拉"}},{"id":1,"rarity":6,"tagCode":1114644,"name":{"kr":"이프리트","en":"Ifrit","jp":"イフリータ","cn":"伊芙利特"}},{"id":2,"rarity":6,"tagCode":272712212,"name":{"kr":"모스티마","en":"Mostima","jp":"","cn":"莫斯提马"}},{"id":3,"rarity":6,"tagCode":268730444,"name":{"kr":"블레이즈","en":"Blaze","jp":"","cn":"煌"}},{"id":4,"rarity":6,"tagCode":276856908,"name":{"kr":"첸","en":"Ch\'en","jp":"","cn":"陈"}},{"id":5,"rarity":6,"tagCode":268730444,"name":{"kr":"헬라그","en":"Hellagur","jp":"","cn":"赫拉格"}},{"id":6,"rarity":6,"tagCode":49228,"name":{"kr":"실버애쉬","en":"SilverAsh","jp":"シルバーアッシュ","cn":"银灰"}},{"id":7,"rarity":6,"tagCode":268730444,"name":{"kr":"스카디","en":"Skadi","jp":"","cn":"斯卡蒂"}},{"id":8,"rarity":6,"tagCode":25620,"name":{"kr":"나이팅게일","en":"Nightingale","jp":"ナイチンゲール","cn":"夜莺"}},{"id":9,"rarity":6,"tagCode":25620,"name":{"kr":"샤이닝","en":"Shining","jp":"シャイニング","cn":"闪灵"}},{"id":10,"rarity":6,"tagCode":33044,"name":{"kr":"엑시아","en":"Exusiai","jp":"エクシア","cn":"能天使"}},{"id":11,"rarity":6,"tagCode":268468500,"name":{"kr":"슈바르츠","en":"Schwarz","jp":"","cn":"黑"}},{"id":12,"rarity":6,"tagCode":268488724,"name":{"kr":"아악","en":"Aak","jp":"","cn":"阿"}},{"id":13,"rarity":6,"tagCode":268617748,"name":{"kr":"안젤리나","en":"Angelina","jp":"アンジェリーナ","cn":"安洁莉娜"}},{"id":14,"rarity":6,"tagCode":268617748,"name":{"kr":"마젤란","en":"Magallan","jp":"","cn":"麦哲伦"}},{"id":15,"rarity":6,"tagCode":557196,"name":{"kr":"호시구마","en":"Hoshiguma","jp":"ホシグマ","cn":"星熊"}},{"id":16,"rarity":6,"tagCode":268976268,"name":{"kr":"니엔","en":"Nian","jp":"","cn":"年"}},{"id":17,"rarity":6,"tagCode":549004,"name":{"kr":"사리아","en":"Saria","jp":"サリア","cn":"塞雷娅"}},{"id":18,"rarity":6,"tagCode":67141676,"name":{"kr":"시즈","en":"Siege","jp":"シージ","cn":"推进之王"}},{"id":19,"rarity":5,"tagCode":268468754,"name":{"kr":"아미야","en":"Amiya","jp":"アーミヤ","cn":"阿米娅"}},{"id":20,"rarity":5,"tagCode":268608018,"name":{"kr":"나이트메어","en":"Nightmare","jp":"","cn":"夜魔"}},{"id":21,"rarity":5,"tagCode":272695826,"name":{"kr":"스카이파이어","en":"Skyfire","jp":"スカイフレア","cn":"天火"}},{"id":22,"rarity":5,"tagCode":268992586,"name":{"kr":"아스테시아","en":"Astesia","jp":"","cn":"星极"}},{"id":23,"rarity":5,"tagCode":268763210,"name":{"kr":"브로카","en":"Broca","jp":"","cn":"布洛卡"}},{"id":24,"rarity":5,"tagCode":268730442,"name":{"kr":"플레임브링어","en":"Flamebringer","jp":"","cn":"炎客"}},{"id":25,"rarity":5,"tagCode":268730442,"name":{"kr":"프란카","en":"Franka","jp":"フランカ","cn":"芙兰卡"}},{"id":26,"rarity":5,"tagCode":294986,"name":{"kr":"인드라","en":"Indra","jp":"インドラ","cn":"因陀罗"}},{"id":27,"rarity":5,"tagCode":269516874,"name":{"kr":"라플란드","en":"Lappland","jp":"ラップランド","cn":"拉普兰德"}},{"id":28,"rarity":5,"tagCode":276889674,"name":{"kr":"새비지","en":"Savage","jp":"サベージ","cn":"暴行"}},{"id":29,"rarity":5,"tagCode":327754,"name":{"kr":"스펙터","en":"Specter","jp":"スペクター","cn":"幽灵鲨"}},{"id":30,"rarity":5,"tagCode":268484682,"name":{"kr":"스와이어","en":"Swire","jp":"","cn":"诗怀雅"}},{"id":31,"rarity":5,"tagCode":268461074,"name":{"kr":"브리즈","en":"Breeze","jp":"","cn":"微风"}},{"id":32,"rarity":5,"tagCode":268444690,"name":{"kr":"실론","en":"Ceylon","jp":"","cn":"锡兰"}},{"id":33,"rarity":5,"tagCode":25618,"name":{"kr":"프틸롭시스","en":"Ptilopsis","jp":"フィリオプシス","cn":"白面鸮"}},{"id":34,"rarity":5,"tagCode":9234,"name":{"kr":"사일런스","en":"Silence","jp":"サイレンス","cn":"赫默"}},{"id":35,"rarity":5,"tagCode":25618,"name":{"kr":"와파린","en":"Warfarin","jp":"ワルファリン","cn":"华法琳"}},{"id":36,"rarity":5,"tagCode":33042,"name":{"kr":"블루포이즌","en":"Blue Poison","jp":"アズリウス","cn":"蓝毒"}},{"id":37,"rarity":5,"tagCode":268501266,"name":{"kr":"익스큐터","en":"Executor","jp":"","cn":"送葬人"}},{"id":38,"rarity":5,"tagCode":8421650,"name":{"kr":"파이어워치","en":"Firewatch","jp":"ファイヤーウォッチ","cn":"守林人"}},{"id":39,"rarity":5,"tagCode":268468498,"name":{"kr":"그레이스롯","en":"GreyThroat","jp":"","cn":"灰喉"}},{"id":40,"rarity":5,"tagCode":1114386,"name":{"kr":"메테오라이트","en":"Meteorite","jp":"メテオリーテ","cn":"陨星"}},{"id":41,"rarity":5,"tagCode":33042,"name":{"kr":"플래티넘","en":"Platinum","jp":"プラチナ","cn":"白金"}},{"id":42,"rarity":5,"tagCode":33042,"name":{"kr":"프로방스","en":"Provence","jp":"プロヴァンス","cn":"普罗旺斯"}},{"id":43,"rarity":5,"tagCode":2134026,"name":{"kr":"클리프하트","en":"Cliffheart","jp":"クリフハート","cn":"崖心"}},{"id":44,"rarity":5,"tagCode":2232330,"name":{"kr":"에프이터","en":"FEater","jp":"エフイーター","cn":"食铁兽"}},{"id":45,"rarity":5,"tagCode":299018,"name":{"kr":"맨티코어","en":"Manticore","jp":"マンティコア","cn":"狮蝎"}},{"id":46,"rarity":5,"tagCode":37752842,"name":{"kr":"레드","en":"Projekt Red","jp":"レッド","cn":"红"}},{"id":47,"rarity":5,"tagCode":270667786,"name":{"kr":"스노우상트","en":"Snowsant","jp":"","cn":"雪雉"}},{"id":48,"rarity":5,"tagCode":303042570,"name":{"kr":"와이 푸","en":"Waai Fu","jp":"","cn":"槐琥"}},{"id":49,"rarity":4,"tagCode":272666634,"name":{"kr":"에단","en":"Ethan","jp":"","cn":"伊桑"}},{"id":50,"rarity":5,"tagCode":272762898,"name":{"kr":"글라우쿠스","en":"Glaucus","jp":"","cn":"格劳克斯"}},{"id":51,"rarity":5,"tagCode":20973586,"name":{"kr":"메이어","en":"Mayer","jp":"メイヤー","cn":"梅尔"}},{"id":52,"rarity":5,"tagCode":1050642,"name":{"kr":"프라마닉스","en":"Pramanix","jp":"プラマニクス","cn":"初雪"}},{"id":53,"rarity":5,"tagCode":268462098,"name":{"kr":"소라","en":"Sora","jp":"ソラ","cn":"空"}},{"id":54,"rarity":5,"tagCode":165906,"name":{"kr":"이스티나","en":"Истина","jp":"イースチナ","cn":"真理"}},{"id":55,"rarity":5,"tagCode":268959882,"name":{"kr":"바이슨","en":"Bison","jp":"","cn":"拜松"}},{"id":56,"rarity":5,"tagCode":2621578,"name":{"kr":"크루아상","en":"Croissant","jp":"クロワッサン","cn":"可颂"}},{"id":57,"rarity":5,"tagCode":268968074,"name":{"kr":"운","en":"Hung","jp":"","cn":"吽"}},{"id":58,"rarity":5,"tagCode":557194,"name":{"kr":"리스캄","en":"Liskarm","jp":"リスカム","cn":"雷蛇"}},{"id":59,"rarity":5,"tagCode":532618,"name":{"kr":"니어","en":"Nearl","jp":"ニアール","cn":"临光"}},{"id":60,"rarity":5,"tagCode":819338,"name":{"kr":"벌컨","en":"Vulcan","jp":"ヴァルカン","cn":"火神"}},{"id":61,"rarity":5,"tagCode":336068650,"name":{"kr":"그라니","en":"Grani","jp":"","cn":"格拉尼"}},{"id":62,"rarity":5,"tagCode":335577130,"name":{"kr":"리드","en":"Reed","jp":"","cn":"苇草"}},{"id":63,"rarity":5,"tagCode":71303210,"name":{"kr":"텍사스","en":"Texas","jp":"テキサス","cn":"德克萨斯"}},{"id":64,"rarity":5,"tagCode":67125290,"name":{"kr":"지마","en":"Зима","jp":"ズィマー","cn":"凛冬"}},{"id":65,"rarity":4,"tagCode":66064,"name":{"kr":"기타노","en":"Gitano","jp":"ギターノ","cn":"远山"}},{"id":66,"rarity":4,"tagCode":268632592,"name":{"kr":"그레이","en":"Greyy","jp":"","cn":"格雷伊"}},{"id":67,"rarity":4,"tagCode":1081872,"name":{"kr":"헤이즈","en":"Haze","jp":"ヘイズ","cn":"夜烟"}},{"id":68,"rarity":4,"tagCode":268468296,"name":{"kr":"비헌터","en":"Beehunter","jp":"","cn":"猎蜂"}},{"id":69,"rarity":4,"tagCode":49224,"name":{"kr":"도베르만","en":"Dobermann","jp":"ドーベルマン","cn":"杜宾"}},{"id":70,"rarity":4,"tagCode":327752,"name":{"kr":"에스텔","en":"Estelle","jp":"エステル","cn":"艾丝黛尔"}},{"id":71,"rarity":4,"tagCode":163912,"name":{"kr":"프로스트리프","en":"Frostleaf","jp":"フロストリーフ","cn":"霜叶"}},{"id":72,"rarity":4,"tagCode":294984,"name":{"kr":"마토이마루","en":"Matoimaru","jp":"マトイマル","cn":"缠丸"}},{"id":73,"rarity":4,"tagCode":32840,"name":{"kr":"무스","en":"Mousse","jp":"ムース","cn":"慕斯"}},{"id":74,"rarity":4,"tagCode":268444688,"name":{"kr":"가비알","en":"Gavial","jp":"ガヴィル","cn":"嘉维尔"}},{"id":75,"rarity":4,"tagCode":9232,"name":{"kr":"미르","en":"Myrrh","jp":"ミルラ","cn":"末药"}},{"id":76,"rarity":4,"tagCode":9232,"name":{"kr":"퍼퓨머","en":"Perfumer","jp":"パフューマー","cn":"调香师"}},{"id":77,"rarity":4,"tagCode":268444688,"name":{"kr":"수수루","en":"Sussurro","jp":"","cn":"苏苏洛"}},{"id":78,"rarity":4,"tagCode":268599568,"name":{"kr":"엠브리엘","en":"Ambriel","jp":"","cn":"安比尔"}},{"id":79,"rarity":4,"tagCode":295184,"name":{"kr":"제시카","en":"Jessica","jp":"ジェシカ","cn":"杰西卡"}},{"id":80,"rarity":4,"tagCode":268599568,"name":{"kr":"메이","en":"May","jp":"","cn":"梅"}},{"id":81,"rarity":4,"tagCode":1081616,"name":{"kr":"메테오","en":"Meteor","jp":"","cn":"流星"}},{"id":82,"rarity":4,"tagCode":196880,"name":{"kr":"시라유키","en":"ShiraYuki","jp":"シラユキ","cn":"白雪"}},{"id":83,"rarity":4,"tagCode":268468496,"name":{"kr":"버메일","en":"Vermeil","jp":"","cn":"红云"}},{"id":84,"rarity":4,"tagCode":34082824,"name":{"kr":"그라벨","en":"Gravel","jp":"グラベル","cn":"砾"}},{"id":85,"rarity":4,"tagCode":2101256,"name":{"kr":"로프","en":"Rope","jp":"ロープ","cn":"暗索"}},{"id":86,"rarity":4,"tagCode":2101256,"name":{"kr":"쇼","en":"Shaw","jp":"ショウ","cn":"阿消"}},{"id":87,"rarity":4,"tagCode":285214736,"name":{"kr":"딥컬러","en":"Deepcolor","jp":"ディピカ","cn":"深海色"}},{"id":88,"rarity":4,"tagCode":133136,"name":{"kr":"어스스피릿","en":"Earthspirit","jp":"アーススピリット","cn":"地灵"}},{"id":89,"rarity":4,"tagCode":524424,"name":{"kr":"쿠오라","en":"Cuora","jp":"クオーラ","cn":"蛇屠箱"}},{"id":90,"rarity":4,"tagCode":268992648,"name":{"kr":"두르나르","en":"Dur-nar","jp":"","cn":"坚雷"}},{"id":91,"rarity":4,"tagCode":524424,"name":{"kr":"마터호른","en":"Matterhorn","jp":"マッターホルン","cn":"角峰"}},{"id":92,"rarity":4,"tagCode":532616,"name":{"kr":"굼","en":"Гум","jp":"グム","cn":"古米"}},{"id":93,"rarity":4,"tagCode":336068648,"name":{"kr":"쿠리어","en":"Courier","jp":"クーリエ","cn":"讯使"}},{"id":94,"rarity":4,"tagCode":335552552,"name":{"kr":"머틀","en":"Myrtle","jp":"","cn":"桃金娘"}},{"id":95,"rarity":4,"tagCode":67141672,"name":{"kr":"스캐빈저","en":"Scavenger","jp":"スカベンジャー","cn":"清道夫"}},{"id":96,"rarity":4,"tagCode":67141672,"name":{"kr":"비그나","en":"Vigna","jp":"ヴィグナ","cn":"红豆"}},{"id":97,"rarity":3,"tagCode":66064,"name":{"kr":"라바","en":"Lava","jp":"ラヴァ","cn":"炎熔"}},{"id":98,"rarity":3,"tagCode":33296,"name":{"kr":"스튜어드","en":"Steward","jp":"スチュワード","cn":"史都华德"}},{"id":99,"rarity":3,"tagCode":294984,"name":{"kr":"멜란사","en":"Melantha","jp":"メランサ","cn":"玫兰莎"}},{"id":100,"rarity":3,"tagCode":268468296,"name":{"kr":"미드나이트","en":"Midnight","jp":"","cn":"月见夜"}},{"id":101,"rarity":3,"tagCode":268763208,"name":{"kr":"포푸카","en":"Popukar","jp":"","cn":"泡普卡"}},{"id":102,"rarity":3,"tagCode":9232,"name":{"kr":"안셀","en":"Ansel","jp":"アンセル","cn":"安赛尔"}},{"id":103,"rarity":3,"tagCode":9232,"name":{"kr":"히비스커스","en":"Hibiscus","jp":"ハイビスカス","cn":"芙蓉"}},{"id":104,"rarity":3,"tagCode":33040,"name":{"kr":"아드나키엘","en":"Adnachiel","jp":"アドナキエル","cn":"安德切尔"}},{"id":105,"rarity":3,"tagCode":268501264,"name":{"kr":"캐터펄트","en":"Catapult","jp":"","cn":"空爆"}},{"id":106,"rarity":3,"tagCode":33040,"name":{"kr":"크루스","en":"Kroos","jp":"クルース","cn":"克洛丝"}},{"id":107,"rarity":3,"tagCode":133136,"name":{"kr":"오키드","en":"Orchid","jp":"オーキッド","cn":"梓兰"}},{"id":108,"rarity":3,"tagCode":524424,"name":{"kr":"비글","en":"Beagle","jp":"ビーグル","cn":"米格鲁"}},{"id":109,"rarity":3,"tagCode":268959880,"name":{"kr":"카디건","en":"Cardigan","jp":"カーディ","cn":"卡缇"}},{"id":110,"rarity":3,"tagCode":268968072,"name":{"kr":"스팟","en":"Spot","jp":"","cn":"斑点"}},{"id":111,"rarity":3,"tagCode":67108904,"name":{"kr":"팽","en":"Fang","jp":"フェン","cn":"芬"}},{"id":112,"rarity":3,"tagCode":67141672,"name":{"kr":"플룸","en":"Plume","jp":"プリュム","cn":"翎羽"}},{"id":113,"rarity":3,"tagCode":67108904,"name":{"kr":"바닐라","en":"Vanilla","jp":"バニラ","cn":"香草"}},{"id":114,"rarity":2,"tagCode":529,"name":{"kr":"12F","en":"12F","jp":"12F","cn":"12F"}},{"id":115,"rarity":2,"tagCode":529,"name":{"kr":"두린","en":"Durin","jp":"ドゥリン","cn":"杜林"}},{"id":116,"rarity":2,"tagCode":137,"name":{"kr":"느와르 코르네","en":"Noir Corne","jp":"ノイルホーン","cn":"黑角"}},{"id":117,"rarity":2,"tagCode":41,"name":{"kr":"야토","en":"Yato","jp":"ヤトウ","cn":"夜刀"}},{"id":118,"rarity":2,"tagCode":273,"name":{"kr":"레인저","en":"Rangers","jp":"レンジャー","cn":"巡林者"}},{"id":119,"rarity":1,"tagCode":134234184,"name":{"kr":"Castle-3","en":"Castle-3","jp":"Castle-3","cn":"Castle-3"}},{"id":120,"rarity":1,"tagCode":134226960,"name":{"kr":"Lancet-2","en":"Lancet-2","jp":"Lancet-2","cn":"Lancet-2"}}]}')
