if(!db){var db={}};db.idVersion=db.idVersion||{};db.idVersion.tag=1;db.tag={"0":{"name":{"kr":"남성","jp":"男性","en":"Male","cn":"男性干员"},"type":"sex"},"1":{"name":{"kr":"여성","jp":"女性","en":"Female","cn":"女性干员"},"type":"sex"},"2":{"name":{"kr":"근거리","jp":"近距離","en":"Melee","cn":"近战位"},"type":"range"},"3":{"name":{"kr":"원거리","jp":"遠距離","en":"Ranged","cn":"远程位"},"type":"range"},"4":{"name":{"kr":"가드","jp":"前衛","en":"Guard","cn":"近卫"},"type":"class"},"5":{"name":{"kr":"디펜더","jp":"重装","en":"Defender","cn":"重装"},"type":"class"},"6":{"name":{"kr":"메딕","jp":"医療","en":"Medic","cn":"医疗"},"type":"class"},"7":{"name":{"kr":"뱅가드","jp":"先鋒","en":"Vanguard","cn":"先锋"},"type":"class"},"8":{"name":{"kr":"서포터","jp":"補助","en":"Supporter","cn":"辅助"},"type":"class"},"9":{"name":{"kr":"스나이퍼","jp":"狙撃","en":"Sniper","cn":"狙击"},"type":"class"},"10":{"name":{"kr":"스페셜리스트","jp":"特殊","en":"Specialist","cn":"特种"},"type":"class"},"11":{"name":{"kr":"캐스터","jp":"術師","en":"Caster","cn":"术师"},"type":"class"},"12":{"name":{"kr":"감속","jp":"減速","en":"Slow","cn":"减速"},"type":"property"},"13":{"name":{"kr":"강제이동","jp":"強制移動","en":"Shift","cn":"位移"},"type":"property"},"14":{"name":{"kr":"누커","jp":"爆発力","en":"Nuker","cn":"爆发"},"type":"property"},"15":{"name":{"kr":"디버프","jp":"弱化","en":"Debuff","cn":"削弱"},"type":"property"},"16":{"name":{"kr":"딜러","jp":"火力","en":"DPS","cn":"输出"},"type":"property"},"17":{"name":{"kr":"로봇","jp":"ロボット","en":"Robot","cn":"支援机械"},"type":"property"},"18":{"name":{"kr":"방어형","jp":"防御","en":"Defense","cn":"防护"},"type":"property"},"19":{"name":{"kr":"범위공격","jp":"範囲攻撃","en":"AoE","cn":"群攻"},"type":"property"},"20":{"name":{"kr":"생존형","jp":"生存","en":"Survival","cn":"生存"},"type":"property"},"21":{"name":{"kr":"소환","jp":"召喚","en":"Summon","cn":"召唤"},"type":"property"},"22":{"name":{"kr":"제어형","jp":"牽制","en":"Crowd Control","cn":"控场"},"type":"property"},"23":{"name":{"kr":"지원","jp":"支援","en":"Support","cn":"支援"},"type":"property"},"24":{"name":{"kr":"코스트+","jp":"COST回復","en":"DP-Recovery","cn":"费用回复"},"type":"property"},"25":{"name":{"kr":"쾌속부활","jp":"高速再配置","en":"Fast-Redeploy","cn":"快速复活"},"type":"property"},"26":{"name":{"kr":"힐링","jp":"治療","en":"Healing","cn":"治疗"},"type":"property"},"27":{"name":{"kr":"신입","jp":"初期","en":"Starter","cn":"新手"},"type":"qualification"},"28":{"name":{"kr":"특별채용","jp":"エリート","en":"Senior Operator","cn":"资深干员"},"type":"qualification"},"29":{"name":{"kr":"고급특별채용","jp":"上級エリート","en":"Top Operator","cn":"高级资深干员"},"type":"qualification"},"30":{"name":{"kr":"원소","jp":"元素","en":"Elemental","cn":"元素"},"type":"property"}};db.tag.keys=Object.keys(db.tag);db.tag.keys.forEach(key=>{db.tag[key].tagCode=Math.pow(2, Number(key))});db.tag.version="2025.01.27"