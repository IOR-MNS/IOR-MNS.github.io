// 아이템 수량
//'mcalc_item-have_아이템ID' : 보유량
//'mcalc_item-need_아이템ID' : 필요량
//'mcalc_item-craft-have_아이템ID' : 제작-보유량(제작획득량)
//'mcalc_item-craft-need_아이템ID' : 제작-필요량(제작소모량)

// 아이템별 제작 설정
//'mcalc_craft-config_아이템ID' : 'no', 'as-possible', 'all' 중 하나의 문자열.

// 필터링 설정
//'mcalc_filter-config_필터명' : 'true', 'false' 중 하나의 문자열.

const clearLocalStorage = function () {
	localStorage.clear()
}

const getItem_have = function (itemID) {
	return localStorage.getItem('mcalc_item-have_' + itemID)
}
const getItem_need = function (itemID) {
	return localStorage.getItem('mcalc_item-need_' + itemID)
}
const getItem_craft_have = function (itemID) {
	return localStorage.getItem('mcalc_item-craft-have_' + itemID)
}
const getItem_craft_need = function (itemID) {
	return localStorage.getItem('mcalc_item-craft-need_' + itemID)
}
const getCraftConfig = function (itemID) {
	return localStorage.getItem('mcalc_craft-config_' + itemID)
}
const getFilterConfig = function (filterName) {
	return localStorage.getItem('mcalc_filter-config_' + filterName)
}

const setItem_have = function (itemID, val) {
	localStorage.setItem('mcalc_item-have_' + itemID, val)
}
const setItem_need = function (itemID, val) {
	localStorage.setItem('mcalc_item-need_' + itemID, val)
}
const setItem_craft_have = function (itemID, val) {
	localStorage.setItem('mcalc_item-craft-have_' + itemID, val)
}
const setItem_craft_need = function (itemID, val) {
	localStorage.setItem('mcalc_item-craft-need_' + itemID, val)
}
const setCraftConfig = function (itemID, val) {
	localStorage.setItem('mcalc_craft-config_' + itemID, val)
}
const setFilterConfig = function (filterName, val) {
	localStorage.setItem('mcalc_filter-config_' + filterName, val)
}