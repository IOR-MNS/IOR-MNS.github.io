// 체크된 태그 배열을 받아서 쿼리스트링 만듦
// 태그마다 &으로 구분
const makeQueryString = function(checkedTagsArr)
{
	var queryStr = new String()
	
	for (var i = 0; i < (checkedTagsArr.length - 1); i++) {
		queryStr += checkedTagsArr[i] + '&'
	}
	queryStr += checkedTagsArr[checkedTagsArr.length - 1]
	
	return queryStr
}