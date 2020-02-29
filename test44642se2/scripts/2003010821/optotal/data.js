var LANG="kr",setLang=function(a){return"string"!==(typeof a).toLowerCase()||0>"kr|en|jp|cn".indexOf(a.toLowerCase())?(console.log("data.js, setLang(): \uc785\ub825\uac12\uc774 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc74c:",a),!1):LANG=a.toLowerCase()},getLang=function(){"string"!==(typeof LANG).toLowerCase()&&(console.log('data.js, getLang(): \uc5b8\uc5b4\uc124\uc815\uc774 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc544 "kr"\ub85c \ucd08\uae30\ud654:',LANG),LANG="kr");0>"kr|en|jp|cn".indexOf(LANG.toLowerCase())&&
(console.log('data.js, getLang(): \uc5b8\uc5b4\uc124\uc815\uc774 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc544 "kr"\ub85c \ucd08\uae30\ud654:',LANG),LANG="kr");return LANG=LANG.toLowerCase()},data=JSON.parse('{"creationTime":1580586625,"tagData":[{"id":0,"tagCode":1,"name":{"kr":"\uc2e0\uc785","en":"Starter","jp":"","cn":""}},{"id":1,"tagCode":2,"name":{"kr":"\ud2b9\ubcc4\ucc44\uc6a9","en":"Senior Operator","jp":"","cn":""}},{"id":2,"tagCode":4,"name":{"kr":"\uace0\uae09\ud2b9\ubcc4\ucc44\uc6a9","en":"Top Operator","jp":"","cn":""}},{"id":3,"tagCode":8,"name":{"kr":"\uadfc\uac70\ub9ac","en":"Melee","jp":"","cn":""}},{"id":4,"tagCode":16,"name":{"kr":"\uc6d0\uac70\ub9ac","en":"Ranged","jp":"","cn":""}},{"id":5,"tagCode":32,"name":{"kr":"\ubc45\uac00\ub4dc","en":"Vanguard","jp":"","cn":""}},{"id":6,"tagCode":64,"name":{"kr":"\uac00\ub4dc","en":"Guard","jp":"","cn":""}},{"id":7,"tagCode":128,"name":{"kr":"\ub514\ud39c\ub354","en":"Defender","jp":"","cn":""}},{"id":8,"tagCode":256,"name":{"kr":"\uc2a4\ub098\uc774\ud37c","en":"Sniper","jp":"","cn":""}},{"id":9,"tagCode":512,"name":{"kr":"\uce90\uc2a4\ud130","en":"Caster","jp":"","cn":""}},{"id":10,"tagCode":1024,"name":{"kr":"\uba54\ub515","en":"Medic","jp":"","cn":""}},{"id":11,"tagCode":2048,"name":{"kr":"\uc11c\ud3ec\ud130","en":"Supporter","jp":"","cn":""}},{"id":12,"tagCode":4096,"name":{"kr":"\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8","en":"Specialist","jp":"","cn":""}},{"id":13,"tagCode":8192,"name":{"kr":"\ud790\ub9c1","en":"Healing","jp":"","cn":""}},{"id":14,"tagCode":16384,"name":{"kr":"\uc11c\ud3ec\ud2b8","en":"Support","jp":"","cn":""}},{"id":15,"tagCode":32768,"name":{"kr":"\ub51c\ub7ec","en":"DPS","jp":"","cn":""}},{"id":16,"tagCode":65536,"name":{"kr":"\ubc94\uc704\uacf5\uaca9","en":"AoE","jp":"","cn":""}},{"id":17,"tagCode":131072,"name":{"kr":"\uac10\uc18d","en":"Slow","jp":"","cn":""}},{"id":18,"tagCode":262144,"name":{"kr":"\uc0dd\uc874\ud615","en":"Survival","jp":"","cn":""}},{"id":19,"tagCode":524288,"name":{"kr":"\ubc29\uc5b4\ud615","en":"Defense","jp":"","cn":""}},{"id":20,"tagCode":1048576,"name":{"kr":"\ub514\ubc84\ud504","en":"Debuff","jp":"","cn":""}},{"id":21,"tagCode":2097152,"name":{"kr":"\uac15\uc81c\uc774\ub3d9","en":"Shift","jp":"","cn":""}},{"id":22,"tagCode":4194304,"name":{"kr":"\uc81c\uc5b4\ud615","en":"Crowd Control","jp":"","cn":""}},{"id":23,"tagCode":8388608,"name":{"kr":"\ub204\ucee4","en":"Nuker","jp":"","cn":""}},{"id":24,"tagCode":16777216,"name":{"kr":"\uc18c\ud658","en":"Summon","jp":"","cn":""}},{"id":25,"tagCode":33554432,"name":{"kr":"\ucf8c\uc18d\ubd80\ud65c","en":"Fast-Redeploy","jp":"","cn":""}},{"id":26,"tagCode":67108864,"name":{"kr":"\ucf54\uc2a4\ud2b8+","en":"DP-Recovery","jp":"","cn":""}},{"id":27,"tagCode":134217728,"name":{"kr":"\ub85c\ubd07","en":"Robot","jp":"","cn":""}},{"id":28,"tagCode":268435456,"name":{"kr":"\ucd9c\ud604\ubd88\uac00","en":"","jp":"","cn":""}}],"opData":[{"id":0,"rarity":6,"tagCode":269517332,"name":{"kr":"\uc5d0\uc774\uc57c\ud344\ub4e4\ub77c","en":"Eyjafjalla","jp":"\u30a8\u30a4\u30e4\u30d5\u30a3\u30e4\u30c8\u30e9","cn":"\u827e\u96c5\u6cd5\u62c9"}},{"id":1,"rarity":6,"tagCode":1114644,"name":{"kr":"\uc774\ud504\ub9ac\ud2b8","en":"Ifrit","jp":"\u30a4\u30d5\u30ea\u30fc\u30bf","cn":"\u4f0a\u8299\u5229\u7279"}},{"id":2,"rarity":6,"tagCode":272712212,"name":{"kr":"\ubaa8\uc2a4\ud2f0\ub9c8","en":"Mostima","jp":"","cn":"\u83ab\u65af\u63d0\u9a6c"}},{"id":3,"rarity":6,"tagCode":268730444,"name":{"kr":"\ube14\ub808\uc774\uc988","en":"Blaze","jp":"","cn":"\u714c"}},{"id":4,"rarity":6,"tagCode":276856908,"name":{"kr":"\uccb8","en":"Ch\'en","jp":"","cn":"\u9648"}},{"id":5,"rarity":6,"tagCode":268730444,"name":{"kr":"\ud5ec\ub77c\uadf8","en":"Hellagur","jp":"","cn":"\u8d6b\u62c9\u683c"}},{"id":6,"rarity":6,"tagCode":49228,"name":{"kr":"\uc2e4\ubc84\uc560\uc26c","en":"SilverAsh","jp":"\u30b7\u30eb\u30d0\u30fc\u30a2\u30c3\u30b7\u30e5","cn":"\u94f6\u7070"}},{"id":7,"rarity":6,"tagCode":268730444,"name":{"kr":"\uc2a4\uce74\ub514","en":"Skadi","jp":"","cn":"\u65af\u5361\u8482"}},{"id":8,"rarity":6,"tagCode":25620,"name":{"kr":"\ub098\uc774\ud305\uac8c\uc77c","en":"Nightingale","jp":"\u30ca\u30a4\u30c1\u30f3\u30b2\u30fc\u30eb","cn":"\u591c\u83ba"}},{"id":9,"rarity":6,"tagCode":25620,"name":{"kr":"\uc0e4\uc774\ub2dd","en":"Shining","jp":"\u30b7\u30e3\u30a4\u30cb\u30f3\u30b0","cn":"\u95ea\u7075"}},{"id":10,"rarity":6,"tagCode":33044,"name":{"kr":"\uc5d1\uc2dc\uc544","en":"Exusiai","jp":"\u30a8\u30af\u30b7\u30a2","cn":"\u80fd\u5929\u4f7f"}},{"id":11,"rarity":6,"tagCode":268468500,"name":{"kr":"\uc288\ubc14\ub974\uce20","en":"Schwarz","jp":"","cn":"\u9ed1"}},{"id":12,"rarity":6,"tagCode":268488724,"name":{"kr":"\uc544\uc545","en":"Aak","jp":"","cn":"\u963f"}},{"id":13,"rarity":6,"tagCode":268617748,"name":{"kr":"\uc548\uc824\ub9ac\ub098","en":"Angelina","jp":"\u30a2\u30f3\u30b8\u30a7\u30ea\u30fc\u30ca","cn":"\u5b89\u6d01\u8389\u5a1c"}},{"id":14,"rarity":6,"tagCode":268617748,"name":{"kr":"\ub9c8\uc824\ub780","en":"Magallan","jp":"","cn":"\u9ea6\u54f2\u4f26"}},{"id":15,"rarity":6,"tagCode":557196,"name":{"kr":"\ud638\uc2dc\uad6c\ub9c8","en":"Hoshiguma","jp":"\u30db\u30b7\u30b0\u30de","cn":"\u661f\u718a"}},{"id":16,"rarity":6,"tagCode":268976268,"name":{"kr":"\ub2c8\uc5d4","en":"Nian","jp":"","cn":"\u5e74"}},{"id":17,"rarity":6,"tagCode":549004,"name":{"kr":"\uc0ac\ub9ac\uc544","en":"Saria","jp":"\u30b5\u30ea\u30a2","cn":"\u585e\u96f7\u5a05"}},{"id":18,"rarity":6,"tagCode":67141676,"name":{"kr":"\uc2dc\uc988","en":"Siege","jp":"\u30b7\u30fc\u30b8","cn":"\u63a8\u8fdb\u4e4b\u738b"}},{"id":19,"rarity":5,"tagCode":268468754,"name":{"kr":"\uc544\ubbf8\uc57c","en":"Amiya","jp":"\u30a2\u30fc\u30df\u30e4","cn":"\u963f\u7c73\u5a05"}},{"id":20,"rarity":5,"tagCode":268608018,"name":{"kr":"\ub098\uc774\ud2b8\uba54\uc5b4","en":"Nightmare","jp":"","cn":"\u591c\u9b54"}},{"id":21,"rarity":5,"tagCode":272695826,"name":{"kr":"\uc2a4\uce74\uc774\ud30c\uc774\uc5b4","en":"Skyfire","jp":"\u30b9\u30ab\u30a4\u30d5\u30ec\u30a2","cn":"\u5929\u706b"}},{"id":22,"rarity":5,"tagCode":268992586,"name":{"kr":"\uc544\uc2a4\ud14c\uc2dc\uc544","en":"Astesia","jp":"","cn":"\u661f\u6781"}},{"id":23,"rarity":5,"tagCode":268763210,"name":{"kr":"\ube0c\ub85c\uce74","en":"Broca","jp":"","cn":"\u5e03\u6d1b\u5361"}},{"id":24,"rarity":5,"tagCode":268730442,"name":{"kr":"\ud50c\ub808\uc784\ube0c\ub9c1\uc5b4","en":"Flamebringer","jp":"","cn":"\u708e\u5ba2"}},{"id":25,"rarity":5,"tagCode":268730442,"name":{"kr":"\ud504\ub780\uce74","en":"Franka","jp":"\u30d5\u30e9\u30f3\u30ab","cn":"\u8299\u5170\u5361"}},{"id":26,"rarity":5,"tagCode":294986,"name":{"kr":"\uc778\ub4dc\ub77c","en":"Indra","jp":"\u30a4\u30f3\u30c9\u30e9","cn":"\u56e0\u9640\u7f57"}},{"id":27,"rarity":5,"tagCode":269516874,"name":{"kr":"\ub77c\ud50c\ub780\ub4dc","en":"Lappland","jp":"\u30e9\u30c3\u30d7\u30e9\u30f3\u30c9","cn":"\u62c9\u666e\u5170\u5fb7"}},{"id":28,"rarity":5,"tagCode":276889674,"name":{"kr":"\uc0c8\ube44\uc9c0","en":"Savage","jp":"\u30b5\u30d9\u30fc\u30b8","cn":"\u66b4\u884c"}},{"id":29,"rarity":5,"tagCode":327754,"name":{"kr":"\uc2a4\ud399\ud130","en":"Specter","jp":"\u30b9\u30da\u30af\u30bf\u30fc","cn":"\u5e7d\u7075\u9ca8"}},{"id":30,"rarity":5,"tagCode":268484682,"name":{"kr":"\uc2a4\uc640\uc774\uc5b4","en":"Swire","jp":"","cn":"\u8bd7\u6000\u96c5"}},{"id":31,"rarity":5,"tagCode":268461074,"name":{"kr":"\ube0c\ub9ac\uc988","en":"Breeze","jp":"","cn":"\u5fae\u98ce"}},{"id":32,"rarity":5,"tagCode":268444690,"name":{"kr":"\uc2e4\ub860","en":"Ceylon","jp":"","cn":"\u9521\u5170"}},{"id":33,"rarity":5,"tagCode":25618,"name":{"kr":"\ud504\ud2f8\ub86d\uc2dc\uc2a4","en":"Ptilopsis","jp":"\u30d5\u30a3\u30ea\u30aa\u30d7\u30b7\u30b9","cn":"\u767d\u9762\u9e2e"}},{"id":34,"rarity":5,"tagCode":9234,"name":{"kr":"\uc0ac\uc77c\ub7f0\uc2a4","en":"Silence","jp":"\u30b5\u30a4\u30ec\u30f3\u30b9","cn":"\u8d6b\u9ed8"}},{"id":35,"rarity":5,"tagCode":25618,"name":{"kr":"\uc640\ud30c\ub9b0","en":"Warfarin","jp":"\u30ef\u30eb\u30d5\u30a1\u30ea\u30f3","cn":"\u534e\u6cd5\u7433"}},{"id":36,"rarity":5,"tagCode":33042,"name":{"kr":"\ube14\ub8e8\ud3ec\uc774\uc98c","en":"Blue Poison","jp":"\u30a2\u30ba\u30ea\u30a6\u30b9","cn":"\u84dd\u6bd2"}},{"id":37,"rarity":5,"tagCode":268501266,"name":{"kr":"\uc775\uc2a4\ud050\ud130","en":"Executor","jp":"","cn":"\u9001\u846c\u4eba"}},{"id":38,"rarity":5,"tagCode":8421650,"name":{"kr":"\ud30c\uc774\uc5b4\uc6cc\uce58","en":"Firewatch","jp":"\u30d5\u30a1\u30a4\u30e4\u30fc\u30a6\u30a9\u30c3\u30c1","cn":"\u5b88\u6797\u4eba"}},{"id":39,"rarity":5,"tagCode":268468498,"name":{"kr":"\uadf8\ub808\uc774\uc2a4\ub86f","en":"GreyThroat","jp":"","cn":"\u7070\u5589"}},{"id":40,"rarity":5,"tagCode":1114386,"name":{"kr":"\uba54\ud14c\uc624\ub77c\uc774\ud2b8","en":"Meteorite","jp":"\u30e1\u30c6\u30aa\u30ea\u30fc\u30c6","cn":"\u9668\u661f"}},{"id":41,"rarity":5,"tagCode":33042,"name":{"kr":"\ud50c\ub798\ud2f0\ub118","en":"Platinum","jp":"\u30d7\u30e9\u30c1\u30ca","cn":"\u767d\u91d1"}},{"id":42,"rarity":5,"tagCode":33042,"name":{"kr":"\ud504\ub85c\ubc29\uc2a4","en":"Provence","jp":"\u30d7\u30ed\u30f4\u30a1\u30f3\u30b9","cn":"\u666e\u7f57\u65fa\u65af"}},{"id":43,"rarity":5,"tagCode":2134026,"name":{"kr":"\ud074\ub9ac\ud504\ud558\ud2b8","en":"Cliffheart","jp":"\u30af\u30ea\u30d5\u30cf\u30fc\u30c8","cn":"\u5d16\u5fc3"}},{"id":44,"rarity":5,"tagCode":2232330,"name":{"kr":"\uc5d0\ud504\uc774\ud130","en":"FEater","jp":"\u30a8\u30d5\u30a4\u30fc\u30bf\u30fc","cn":"\u98df\u94c1\u517d"}},{"id":45,"rarity":5,"tagCode":299018,"name":{"kr":"\ub9e8\ud2f0\ucf54\uc5b4","en":"Manticore","jp":"\u30de\u30f3\u30c6\u30a3\u30b3\u30a2","cn":"\u72ee\u874e"}},{"id":46,"rarity":5,"tagCode":37752842,"name":{"kr":"\ub808\ub4dc","en":"Projekt Red","jp":"\u30ec\u30c3\u30c9","cn":"\u7ea2"}},{"id":47,"rarity":5,"tagCode":270667786,"name":{"kr":"\uc2a4\ub178\uc6b0\uc0c1\ud2b8","en":"Snowsant","jp":"","cn":"\u96ea\u96c9"}},{"id":48,"rarity":5,"tagCode":303042570,"name":{"kr":"\uc640\uc774 \ud478","en":"Waai Fu","jp":"","cn":"\u69d0\u7425"}},{"id":49,"rarity":4,"tagCode":272666634,"name":{"kr":"\uc5d0\ub2e8","en":"Ethan","jp":"","cn":"\u4f0a\u6851"}},{"id":50,"rarity":5,"tagCode":272762898,"name":{"kr":"\uae00\ub77c\uc6b0\ucfe0\uc2a4","en":"Glaucus","jp":"","cn":"\u683c\u52b3\u514b\u65af"}},{"id":51,"rarity":5,"tagCode":20973586,"name":{"kr":"\uba54\uc774\uc5b4","en":"Mayer","jp":"\u30e1\u30a4\u30e4\u30fc","cn":"\u6885\u5c14"}},{"id":52,"rarity":5,"tagCode":1050642,"name":{"kr":"\ud504\ub77c\ub9c8\ub2c9\uc2a4","en":"Pramanix","jp":"\u30d7\u30e9\u30de\u30cb\u30af\u30b9","cn":"\u521d\u96ea"}},{"id":53,"rarity":5,"tagCode":268462098,"name":{"kr":"\uc18c\ub77c","en":"Sora","jp":"\u30bd\u30e9","cn":"\u7a7a"}},{"id":54,"rarity":5,"tagCode":165906,"name":{"kr":"\uc774\uc2a4\ud2f0\ub098","en":"\u0418\u0441\u0442\u0438\u043d\u0430","jp":"\u30a4\u30fc\u30b9\u30c1\u30ca","cn":"\u771f\u7406"}},{"id":55,"rarity":5,"tagCode":268959882,"name":{"kr":"\ubc14\uc774\uc2a8","en":"Bison","jp":"","cn":"\u62dc\u677e"}},{"id":56,"rarity":5,"tagCode":2621578,"name":{"kr":"\ud06c\ub8e8\uc544\uc0c1","en":"Croissant","jp":"\u30af\u30ed\u30ef\u30c3\u30b5\u30f3","cn":"\u53ef\u9882"}},{"id":57,"rarity":5,"tagCode":268968074,"name":{"kr":"\uc6b4","en":"Hung","jp":"","cn":"\u543d"}},{"id":58,"rarity":5,"tagCode":557194,"name":{"kr":"\ub9ac\uc2a4\uce84","en":"Liskarm","jp":"\u30ea\u30b9\u30ab\u30e0","cn":"\u96f7\u86c7"}},{"id":59,"rarity":5,"tagCode":532618,"name":{"kr":"\ub2c8\uc5b4","en":"Nearl","jp":"\u30cb\u30a2\u30fc\u30eb","cn":"\u4e34\u5149"}},{"id":60,"rarity":5,"tagCode":819338,"name":{"kr":"\ubc8c\ucee8","en":"Vulcan","jp":"\u30f4\u30a1\u30eb\u30ab\u30f3","cn":"\u706b\u795e"}},{"id":61,"rarity":5,"tagCode":336068650,"name":{"kr":"\uadf8\ub77c\ub2c8","en":"Grani","jp":"","cn":"\u683c\u62c9\u5c3c"}},{"id":62,"rarity":5,"tagCode":335577130,"name":{"kr":"\ub9ac\ub4dc","en":"Reed","jp":"","cn":"\u82c7\u8349"}},{"id":63,"rarity":5,"tagCode":71303210,"name":{"kr":"\ud14d\uc0ac\uc2a4","en":"Texas","jp":"\u30c6\u30ad\u30b5\u30b9","cn":"\u5fb7\u514b\u8428\u65af"}},{"id":64,"rarity":5,"tagCode":67125290,"name":{"kr":"\uc9c0\ub9c8","en":"\u0417\u0438\u043c\u0430","jp":"\u30ba\u30a3\u30de\u30fc","cn":"\u51db\u51ac"}},{"id":65,"rarity":4,"tagCode":66064,"name":{"kr":"\uae30\ud0c0\ub178","en":"Gitano","jp":"\u30ae\u30bf\u30fc\u30ce","cn":"\u8fdc\u5c71"}},{"id":66,"rarity":4,"tagCode":268632592,"name":{"kr":"\uadf8\ub808\uc774","en":"Greyy","jp":"","cn":"\u683c\u96f7\u4f0a"}},{"id":67,"rarity":4,"tagCode":1081872,"name":{"kr":"\ud5e4\uc774\uc988","en":"Haze","jp":"\u30d8\u30a4\u30ba","cn":"\u591c\u70df"}},{"id":68,"rarity":4,"tagCode":268468296,"name":{"kr":"\ube44\ud5cc\ud130","en":"Beehunter","jp":"","cn":"\u730e\u8702"}},{"id":69,"rarity":4,"tagCode":49224,"name":{"kr":"\ub3c4\ubca0\ub974\ub9cc","en":"Dobermann","jp":"\u30c9\u30fc\u30d9\u30eb\u30de\u30f3","cn":"\u675c\u5bbe"}},{"id":70,"rarity":4,"tagCode":327752,"name":{"kr":"\uc5d0\uc2a4\ud154","en":"Estelle","jp":"\u30a8\u30b9\u30c6\u30eb","cn":"\u827e\u4e1d\u9edb\u5c14"}},{"id":71,"rarity":4,"tagCode":163912,"name":{"kr":"\ud504\ub85c\uc2a4\ud2b8\ub9ac\ud504","en":"Frostleaf","jp":"\u30d5\u30ed\u30b9\u30c8\u30ea\u30fc\u30d5","cn":"\u971c\u53f6"}},{"id":72,"rarity":4,"tagCode":294984,"name":{"kr":"\ub9c8\ud1a0\uc774\ub9c8\ub8e8","en":"Matoimaru","jp":"\u30de\u30c8\u30a4\u30de\u30eb","cn":"\u7f20\u4e38"}},{"id":73,"rarity":4,"tagCode":32840,"name":{"kr":"\ubb34\uc2a4","en":"Mousse","jp":"\u30e0\u30fc\u30b9","cn":"\u6155\u65af"}},{"id":74,"rarity":4,"tagCode":268444688,"name":{"kr":"\uac00\ube44\uc54c","en":"Gavial","jp":"\u30ac\u30f4\u30a3\u30eb","cn":"\u5609\u7ef4\u5c14"}},{"id":75,"rarity":4,"tagCode":9232,"name":{"kr":"\ubbf8\ub974","en":"Myrrh","jp":"\u30df\u30eb\u30e9","cn":"\u672b\u836f"}},{"id":76,"rarity":4,"tagCode":9232,"name":{"kr":"\ud37c\ud4e8\uba38","en":"Perfumer","jp":"\u30d1\u30d5\u30e5\u30fc\u30de\u30fc","cn":"\u8c03\u9999\u5e08"}},{"id":77,"rarity":4,"tagCode":268444688,"name":{"kr":"\uc218\uc218\ub8e8","en":"Sussurro","jp":"","cn":"\u82cf\u82cf\u6d1b"}},{"id":78,"rarity":4,"tagCode":268599568,"name":{"kr":"\uc5e0\ube0c\ub9ac\uc5d8","en":"Ambriel","jp":"","cn":"\u5b89\u6bd4\u5c14"}},{"id":79,"rarity":4,"tagCode":295184,"name":{"kr":"\uc81c\uc2dc\uce74","en":"Jessica","jp":"\u30b8\u30a7\u30b7\u30ab","cn":"\u6770\u897f\u5361"}},{"id":80,"rarity":4,"tagCode":268599568,"name":{"kr":"\uba54\uc774","en":"May","jp":"","cn":"\u6885"}},{"id":81,"rarity":4,"tagCode":1081616,"name":{"kr":"\uba54\ud14c\uc624","en":"Meteor","jp":"","cn":"\u6d41\u661f"}},{"id":82,"rarity":4,"tagCode":196880,"name":{"kr":"\uc2dc\ub77c\uc720\ud0a4","en":"ShiraYuki","jp":"\u30b7\u30e9\u30e6\u30ad","cn":"\u767d\u96ea"}},{"id":83,"rarity":4,"tagCode":268468496,"name":{"kr":"\ubc84\uba54\uc77c","en":"Vermeil","jp":"","cn":"\u7ea2\u4e91"}},{"id":84,"rarity":4,"tagCode":34082824,"name":{"kr":"\uadf8\ub77c\ubca8","en":"Gravel","jp":"\u30b0\u30e9\u30d9\u30eb","cn":"\u783e"}},{"id":85,"rarity":4,"tagCode":2101256,"name":{"kr":"\ub85c\ud504","en":"Rope","jp":"\u30ed\u30fc\u30d7","cn":"\u6697\u7d22"}},{"id":86,"rarity":4,"tagCode":2101256,"name":{"kr":"\uc1fc","en":"Shaw","jp":"\u30b7\u30e7\u30a6","cn":"\u963f\u6d88"}},{"id":87,"rarity":4,"tagCode":285214736,"name":{"kr":"\ub525\uceec\ub7ec","en":"Deepcolor","jp":"\u30c7\u30a3\u30d4\u30ab","cn":"\u6df1\u6d77\u8272"}},{"id":88,"rarity":4,"tagCode":133136,"name":{"kr":"\uc5b4\uc2a4\uc2a4\ud53c\ub9bf","en":"Earthspirit","jp":"\u30a2\u30fc\u30b9\u30b9\u30d4\u30ea\u30c3\u30c8","cn":"\u5730\u7075"}},{"id":89,"rarity":4,"tagCode":524424,"name":{"kr":"\ucfe0\uc624\ub77c","en":"Cuora","jp":"\u30af\u30aa\u30fc\u30e9","cn":"\u86c7\u5c60\u7bb1"}},{"id":90,"rarity":4,"tagCode":268992648,"name":{"kr":"\ub450\ub974\ub098\ub974","en":"Dur-nar","jp":"","cn":"\u575a\u96f7"}},{"id":91,"rarity":4,"tagCode":524424,"name":{"kr":"\ub9c8\ud130\ud638\ub978","en":"Matterhorn","jp":"\u30de\u30c3\u30bf\u30fc\u30db\u30eb\u30f3","cn":"\u89d2\u5cf0"}},{"id":92,"rarity":4,"tagCode":532616,"name":{"kr":"\uad7c","en":"\u0413\u0443\u043c","jp":"\u30b0\u30e0","cn":"\u53e4\u7c73"}},{"id":93,"rarity":4,"tagCode":336068648,"name":{"kr":"\ucfe0\ub9ac\uc5b4","en":"Courier","jp":"\u30af\u30fc\u30ea\u30a8","cn":"\u8baf\u4f7f"}},{"id":94,"rarity":4,"tagCode":335552552,"name":{"kr":"\uba38\ud2c0","en":"Myrtle","jp":"","cn":"\u6843\u91d1\u5a18"}},{"id":95,"rarity":4,"tagCode":67141672,"name":{"kr":"\uc2a4\uce90\ube48\uc800","en":"Scavenger","jp":"\u30b9\u30ab\u30d9\u30f3\u30b8\u30e3\u30fc","cn":"\u6e05\u9053\u592b"}},{"id":96,"rarity":4,"tagCode":67141672,"name":{"kr":"\ube44\uadf8\ub098","en":"Vigna","jp":"\u30f4\u30a3\u30b0\u30ca","cn":"\u7ea2\u8c46"}},{"id":97,"rarity":3,"tagCode":66064,"name":{"kr":"\ub77c\ubc14","en":"Lava","jp":"\u30e9\u30f4\u30a1","cn":"\u708e\u7194"}},{"id":98,"rarity":3,"tagCode":33296,"name":{"kr":"\uc2a4\ud29c\uc5b4\ub4dc","en":"Steward","jp":"\u30b9\u30c1\u30e5\u30ef\u30fc\u30c9","cn":"\u53f2\u90fd\u534e\u5fb7"}},{"id":99,"rarity":3,"tagCode":294984,"name":{"kr":"\uba5c\ub780\uc0ac","en":"Melantha","jp":"\u30e1\u30e9\u30f3\u30b5","cn":"\u73ab\u5170\u838e"}},{"id":100,"rarity":3,"tagCode":268468296,"name":{"kr":"\ubbf8\ub4dc\ub098\uc774\ud2b8","en":"Midnight","jp":"","cn":"\u6708\u89c1\u591c"}},{"id":101,"rarity":3,"tagCode":268763208,"name":{"kr":"\ud3ec\ud504\uce74","en":"Popukar","jp":"","cn":"\u6ce1\u666e\u5361"}},{"id":102,"rarity":3,"tagCode":9232,"name":{"kr":"\uc548\uc140","en":"Ansel","jp":"\u30a2\u30f3\u30bb\u30eb","cn":"\u5b89\u8d5b\u5c14"}},{"id":103,"rarity":3,"tagCode":9232,"name":{"kr":"\ud788\ube44\uc2a4\ucee4\uc2a4","en":"Hibiscus","jp":"\u30cf\u30a4\u30d3\u30b9\u30ab\u30b9","cn":"\u8299\u84c9"}},{"id":104,"rarity":3,"tagCode":33040,"name":{"kr":"\uc544\ub4dc\ub098\ud0a4\uc5d8","en":"Adnachiel","jp":"\u30a2\u30c9\u30ca\u30ad\u30a8\u30eb","cn":"\u5b89\u5fb7\u5207\u5c14"}},{"id":105,"rarity":3,"tagCode":268501264,"name":{"kr":"\uce90\ud130\ud384\ud2b8","en":"Catapult","jp":"","cn":"\u7a7a\u7206"}},{"id":106,"rarity":3,"tagCode":33040,"name":{"kr":"\ud06c\ub8e8\uc2a4","en":"Kroos","jp":"\u30af\u30eb\u30fc\u30b9","cn":"\u514b\u6d1b\u4e1d"}},{"id":107,"rarity":3,"tagCode":133136,"name":{"kr":"\uc624\ud0a4\ub4dc","en":"Orchid","jp":"\u30aa\u30fc\u30ad\u30c3\u30c9","cn":"\u6893\u5170"}},{"id":108,"rarity":3,"tagCode":524424,"name":{"kr":"\ube44\uae00","en":"Beagle","jp":"\u30d3\u30fc\u30b0\u30eb","cn":"\u7c73\u683c\u9c81"}},{"id":109,"rarity":3,"tagCode":268959880,"name":{"kr":"\uce74\ub514\uac74","en":"Cardigan","jp":"\u30ab\u30fc\u30c7\u30a3","cn":"\u5361\u7f07"}},{"id":110,"rarity":3,"tagCode":268968072,"name":{"kr":"\uc2a4\ud31f","en":"Spot","jp":"","cn":"\u6591\u70b9"}},{"id":111,"rarity":3,"tagCode":67108904,"name":{"kr":"\ud33d","en":"Fang","jp":"\u30d5\u30a7\u30f3","cn":"\u82ac"}},{"id":112,"rarity":3,"tagCode":67141672,"name":{"kr":"\ud50c\ub8f8","en":"Plume","jp":"\u30d7\u30ea\u30e5\u30e0","cn":"\u7fce\u7fbd"}},{"id":113,"rarity":3,"tagCode":67108904,"name":{"kr":"\ubc14\ub2d0\ub77c","en":"Vanilla","jp":"\u30d0\u30cb\u30e9","cn":"\u9999\u8349"}},{"id":114,"rarity":2,"tagCode":529,"name":{"kr":"12F","en":"12F","jp":"12F","cn":"12F"}},{"id":115,"rarity":2,"tagCode":529,"name":{"kr":"\ub450\ub9b0","en":"Durin","jp":"\u30c9\u30a5\u30ea\u30f3","cn":"\u675c\u6797"}},{"id":116,"rarity":2,"tagCode":137,"name":{"kr":"\ub290\uc640\ub974 \ucf54\ub974\ub124","en":"Noir Corne","jp":"\u30ce\u30a4\u30eb\u30db\u30fc\u30f3","cn":"\u9ed1\u89d2"}},{"id":117,"rarity":2,"tagCode":41,"name":{"kr":"\uc57c\ud1a0","en":"Yato","jp":"\u30e4\u30c8\u30a6","cn":"\u591c\u5200"}},{"id":118,"rarity":2,"tagCode":273,"name":{"kr":"\ub808\uc778\uc800","en":"Rangers","jp":"\u30ec\u30f3\u30b8\u30e3\u30fc","cn":"\u5de1\u6797\u8005"}},{"id":119,"rarity":1,"tagCode":134234184,"name":{"kr":"Castle-3","en":"Castle-3","jp":"Castle-3","cn":"Castle-3"}},{"id":120,"rarity":1,"tagCode":134226960,"name":{"kr":"Lancet-2","en":"Lancet-2","jp":"Lancet-2","cn":"Lancet-2"}}]}');