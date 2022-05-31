// 아이템 수량
//'mcalc_item-have_아이템ID' : 보유량
//'mcalc_item-need_아이템ID' : 필요량
//'mcalc_item-craft-have_아이템ID' : 제작-보유량(제작획득량)
//'mcalc_item-craft-need_아이템ID' : 제작-필요량(제작소모량)

// 아이템별 제작 설정
//'mcalc_craft-config_아이템ID' : 'no', 'as-possible', 'all' 중 하나의 문자열.

// 필터링 설정
//'mcalc_filter-config_필터명' : 'true', 'false' 중 하나의 문자열.

const clearStorageData = function () {
	var allKeys = Object.keys(localStorage).filter(function (key) {
        return key.indexOf('mcalc_') === 0
    })
    
	for (var i = 0; i < allKeys.length; ++i) {
		localStorage.removeItem(allKeys[i])
	}
    
    allKeys = Object.keys(sessionStorage).filter(function (key) {
        return key.indexOf('mcalc_') === 0
    })
    
	for (var i = 0; i < allKeys.length; ++i) {
		sessionStorage.removeItem(allKeys[i])
	}
}

const clearStorageNeedData = function () {
    var allKeys = Object.keys(localStorage).filter(function (key) {
        return key.indexOf('mcalc_item-need') === 0
    })
    
    for (var i = 0; i < allKeys.length; ++i) {
        localStorage.removeItem(allKeys[i])
    }
}

const clearStorageHaveData = function () {
    var allKeys = Object.keys(localStorage).filter(function (key) {
        return key.indexOf('mcalc_item-have') === 0
    })
    
    for (var i = 0; i < allKeys.length; ++i) {
        localStorage.removeItem(allKeys[i])
    }
}

const clearStorageCalcData = function () {
	// 로컬스토리지 데이터 초기화
	var allKeys = Object.keys(localStorage).filter(function (key) {
        return key.indexOf('mcalc_item-craft_') === 0
    })
    
	for (var i = 0; i < allKeys.length; ++i) {
		localStorage.removeItem(allKeys[i])
	}
    
	// 세션스토리지 데이터 초기화
    clearSessionStorageCalcData()
}

const clearSessionStorageCalcData = function () {
	allKeys = Object.keys(sessionStorage).filter(function (key) {
        return key.indexOf('mcalc_item-demand_') === 0
    })
    
	for (var i = 0; i < allKeys.length; ++i) {
		sessionStorage.removeItem(allKeys[i])
	}
}

const getItem_have = function (itemID) {
	return Number(localStorage.getItem('mcalc_item-have_' + itemID))
}
const getItem_need = function (itemID) {
	return Number(localStorage.getItem('mcalc_item-need_' + itemID))
}
const getItem_craft = function (itemID) {
    return Number(localStorage.getItem('mcalc_item-craft_' + itemID))
}
const getItem_demand = function (itemID) {
    return JSON.parse(sessionStorage.getItem('mcalc_item-demand_' + itemID) || '{}')
}
const getItem_totalDemand = function (itemID) {
    var demands = getItem_demand(itemID)
    var keys = Object.keys(demands)
    var sum = 0
    
    for (var i = 0, len = keys.length; i < len; ++i) {
        sum += demands[keys[i]]
    }
    
    return sum
}

const setItem_have = function (itemID, val) {
	val = Number(val)
	if (isNaN(val)) {
		console.log('오류', val)
		return
	}
	
	if (val !== 0) {
		localStorage.setItem('mcalc_item-have_' + itemID, val)
	}
	else {
		localStorage.removeItem('mcalc_item-have_' + itemID)
	}
}

const setItem_need = function (itemID, val) {
	val = Number(val)
	if (isNaN(val)) {
		console.log('오류', val)
		return
	}
	
	if (val !== 0) {
		localStorage.setItem('mcalc_item-need_' + itemID, val)
	}
	else {
		localStorage.removeItem('mcalc_item-need_' + itemID)
	}
}

const setItem_craft = function (itemID, val) {
	val = Number(val)
	if (isNaN(val)) {
		console.log('오류', val)
		return
	}
	
	if (val !== 0) {
		localStorage.setItem('mcalc_item-craft_' + itemID, val)
	}
	else {
		localStorage.removeItem('mcalc_item-craft_' + itemID)
	}
}

const setItem_demand = function (targetID, requesterID, val) {
	val = Number(val)
	if (isNaN(val)) {
		console.log('오류', val)
		return
	}
	
    var demand = getItem_demand(targetID)
    demand[requesterID] = val
    
    sessionStorage.setItem('mcalc_item-demand_' + targetID, JSON.stringify(demand))
}
/*
const getItem_craft_availableMaterials = function (itemID) {
	return localStorage.getItem('mcalc_item-craft-available-materials_' + itemID)
}
const getItem_craft_demands = function (itemID) {
	return localStorage.getItem('mcalc_item-craft-demands_' + itemID)
}
const getCraftConfig = function (itemID) {
	return localStorage.getItem('mcalc_craft-config_' + itemID)
}
const getFilterConfig = function (filterName) {
	return localStorage.getItem('mcalc_filter-config_' + filterName)
}
*/

/*
const setItem_craft_availableMaterials = function (itemID, val) {
	localStorage.setItem('mcalc_item-craft-available-materials_' + itemID, val)
}
const setItem_craft_demands = function (itemID, val) {
	localStorage.setItem('mcalc_item-craft-demands_' + itemID, val)
}
const setCraftConfig = function (itemID, val) {
	localStorage.setItem('mcalc_craft-config_' + itemID, val)
}
const setFilterConfig = function (filterName, val) {
	localStorage.setItem('mcalc_filter-config_' + filterName, val)
}
*/
