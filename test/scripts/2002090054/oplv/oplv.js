/*
<입력>

현재 정예화단계, 레벨, 경험치
현재 보유 경험치카드, 용문폐

목표 정예화단계, 레벨

플레이할 각 자원 스테이지의 단계
평균 보상 기준인지, 하한/상한 보상 기준인지 선택(드랍량 하위 25%, 평균, 상위 25% 중 택1)
(경던 5단계, 용문던 1~5단계는 '고정드랍' 옵션으로 고정(readonly 속성 부여))

<출력>
필요 경험치, 용문폐
해당 필요 자원을 얻기 위해 돌아야하는 각 던전 판수, 그에 필요한 이성

<계산할 것>
목표 정예화까지 드는 정예화 비용
목표 정예화&레벨까지 드는 경험치

현재 정예화&레벨까지 드는 경험치

현재 보유 용문폐, 경험치

모자랄시 돌 스테이지의 종류
*/

const calc = function (formdata) {
	var temp
	var expTable = data.leveling.expTable
	var lmdTable = data.leveling.lmdTable
	
	/* 목표값 설정 */
	var to = {}
	to.exp = 0
	to.lmd = 0
	
	/* 누적 경험치 계산 */
	// 정예화 단계에 따른 누적 경험치 반영
	for (var i = 0; i < formdata.to.elite; ++i)
	{
		to.exp += expTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 경험치 반영
	to.exp += expTable['elite_' + String(formdata.to.elite)][formdata.to.level - 1]
	
	// 기존 경험치를 누적 경험치에 반영
	to.exp += formdata.to.exp
	
	/* 누적 용문폐 계산 */
	// 정예화 단계에 따른 누적 용문폐 반영
	for (var i = 0; i < formdata.to.elite; ++i)
	{
		to.lmd += lmdTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 용문폐 반영
	to.lmd += lmdTable['elite_' + String(formdata.to.elite)][formdata.to.level - 1]
	
	// 경험치에 따른 누적 용문폐 반영
	// 이미 만렙인 경우, 기존 경험치가 존재할 수 없으므로 건너뛴다.
	if (formdata.to.level < getMaxLevel(formdata.to.elite, formdata.rarity))
	{
		// 1Exp당 필요한 용문폐 계산
		var temp_lmd, temp_exp
		
		temp_lmd =  lmdTable['elite_' + String(formdata.to.elite)][formdata.to.level]
		temp_lmd -= lmdTable['elite_' + String(formdata.to.elite)][formdata.to.level - 1]
		
		temp_exp =  expTable['elite_' + String(formdata.to.elite)][formdata.to.level]
		temp_exp -= expTable['elite_' + String(formdata.to.elite)][formdata.to.level - 1]
		
		temp = temp_lmd / temp_exp
		
		to.lmd += Math.ceil(temp * formdata.to.exp)
	}
	
	/* 현재값 설정 */
	var from = {}
	from.exp = 0
	from.lmd = 0
	
	/* 누적 경험치 계산 */
	// 정예화 단계에 따른 누적 경험치 반영
	for (var i = 0; i < formdata.from.elite; ++i)
	{
		from.exp += expTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 경험치 반영
	from.exp += expTable['elite_' + String(formdata.from.elite)][formdata.from.level - 1]
	
	// 기존 경험치를 누적 경험치에 반영
	from.exp += formdata.from.exp
	
	/* 누적 용문폐 계산 */
	// 정예화 단계에 따른 누적 용문폐 반영
	for (var i = 0; i < formdata.from.elite; ++i)
	{
		from.lmd += lmdTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 용문폐 반영
	from.lmd += lmdTable['elite_' + String(formdata.from.elite)][formdata.from.level - 1]
	
	// 경험치에 따른 누적 용문폐 반영
	// 이미 만렙인 경우, 기존 경험치가 존재할 수 없으므로 건너뛴다.
	if (formdata.from.level < getMaxLevel(formdata.from.elite, formdata.rarity))
	{
		// 1Exp당 필요한 용문폐 계산
		var temp_lmd, temp_exp
		
		temp_lmd =  lmdTable['elite_' + String(formdata.from.elite)][formdata.from.level]
		temp_lmd -= lmdTable['elite_' + String(formdata.from.elite)][formdata.from.level - 1]
		
		temp_exp =  expTable['elite_' + String(formdata.from.elite)][formdata.from.level]
		temp_exp -= expTable['elite_' + String(formdata.from.elite)][formdata.from.level - 1]
		
		temp = temp_lmd / temp_exp
		
		from.lmd += Math.ceil(temp * formdata.from.exp)
	}
	
	//console.log('to', to, '\nfrom', from)
	// 보유 자원 반영
	var have = {}
	have.exp = formdata.resource.exp
	have.lmd = formdata.resource.lmd
	
	// 소모 자원 정리
	var consumption = {}
	consumption.exp = to.exp - from.exp
	consumption.lmd = to.lmd - from.lmd
	// 소모 자원에 정예화에 쓰이는 용문폐 반영
	for (var i = formdata.from.elite; i < formdata.to.elite; ++i)
	{
		consumption.lmd += data.elitePromotion.lmdTable['elite_' + String(i)][formdata.rarity - 1]
	}
	
	// 필요 자원 계산
	var required = {}
	required.exp = consumption.exp - have.exp
	required.lmd = consumption.lmd - have.lmd
	
	// 소모 자원, 필요 자원이 음수일 경우 0으로 설정
	consumption.exp = (consumption.exp < 0) ? 0 : consumption.exp
	consumption.lmd = (consumption.lmd < 0) ? 0 : consumption.lmd
	required.exp = (required.exp < 0) ? 0 : required.exp
	required.lmd = (required.lmd < 0) ? 0 : required.lmd
	
	// 자원이 부족하다면, 각 스테이지를 몇번씩 돌려야 하는지 계산
	var stage = {}
	
	// 경험치 스테이지는, 5단계를 제외하고 랜덤드랍
	temp = data.stage.exp[formdata.stage.exp]
	
	stage.exp = {}
	stage.exp.name = formdata.stage.exp
	stage.exp.worst = Math.ceil(required.exp / temp.reward.lowerBound)
	stage.exp.expectation = Math.ceil(required.exp / temp.reward.expectation)
	stage.exp.best = Math.ceil(required.exp / temp.reward.upperBound)
	
	// 용문폐 스테이지는, 모든 단계에서 고정드랍
	temp = data.stage.lmd[formdata.stage.lmd]
	
	stage.lmd = {}
	stage.lmd.name = formdata.stage.lmd
	stage.lmd.worst = Math.ceil(required.lmd / temp.reward.lowerBound)
	stage.lmd.expectation = Math.ceil(required.lmd / temp.reward.expectation)
	stage.lmd.best = Math.ceil(required.lmd / temp.reward.upperBound)
	
	// 각 스테이지를 필요한만큼 돌기 위해 필요한 이성 계산
	var sanity = {}
	
	temp = data.stage.exp[formdata.stage.exp].sanity
	
	sanity.exp = {}
	sanity.exp.worst = stage.exp.worst * temp
	sanity.exp.expectation = stage.exp.expectation * temp
	sanity.exp.best = stage.exp.best * temp
	
	temp = data.stage.lmd[formdata.stage.lmd].sanity
	
	sanity.lmd = {}
	sanity.lmd.worst = stage.lmd.worst * temp
	sanity.lmd.expectation = stage.lmd.expectation * temp
	sanity.lmd.best = stage.lmd.best * temp
	
	sanity.total = {}
	sanity.total.worst = sanity.exp.worst + sanity.lmd.worst
	sanity.total.expectation = sanity.exp.expectation + sanity.lmd.expectation
	sanity.total.best = sanity.exp.best + sanity.lmd.best
	
	
	var result = {}
	result.sanity = sanity
	result.stage = stage
	result.required = required
	result.consumption = consumption
	
	return result
}

// 사용자의 입력값을 읽어들여 반환
const getFormData = function () {
	var formdata = {}
	
	formdata.rarity = Number($('#rarity').val())
	
	formdata.from = {}
	formdata.from.elite = Number($('#from_elite').val())
	formdata.from.level = Number($('#from_level').val())
	if (formdata.from.level <= 0)
	{
		formdata.from.level = 1
	}
	formdata.from.exp = Number($('#from_exp').val())
	
	formdata.to = {}
	formdata.to.elite = Number($('#to_elite').val())
	formdata.to.level = Number($('#to_level').val())
	if (formdata.to.level == 0)
	{
		formdata.to.level = 1
	}
	formdata.to.exp = Number($('#to_exp').val())
	
	formdata.resource = {}
	formdata.resource.exp = Number($('#resource_expCard_tier1').val()) * data.expCard.tier_1
	formdata.resource.exp += Number($('#resource_expCard_tier2').val()) * data.expCard.tier_2
	formdata.resource.exp += Number($('#resource_expCard_tier3').val()) * data.expCard.tier_3
	formdata.resource.exp += Number($('#resource_expCard_tier4').val()) * data.expCard.tier_4
	formdata.resource.lmd = Number($('#resource_lmd').val())
	
	formdata.stage = {}
	formdata.stage.exp = $('#stage_exp').val()
	formdata.stage.lmd = $('#stage_lmd').val()
	
	return formdata
}

const showResult = function () {
	var formdata = getFormData()
	
	//console.log(data)
	//console.log('formdata', formdata)
	
	var result = calc(formdata)
	
	//console.log('result', result)
	
	var htmlText = ''
	
	// 기대치
	htmlText += '<form class="leveling-result-panel">'
	htmlText += '<br>'
	htmlText += '<div class="leveling-result-panel-subtitle">'
	htmlText += '기대치 ▸ '
	htmlText += '<span class="leveling-result-item">' + String(result.sanity.total.expectation) + ' 이성</span><br>'
	htmlText += '</div>'
	htmlText += '<hr>'
	htmlText += '<span style="color: #777">경험치</span> ' + result.stage.exp.name + ' ▸ ' + '<span class="leveling-result-item">' + result.stage.exp.expectation + '회 클리어</span><br>'
	htmlText += '<span style="color: #777">용문폐</span> ' + result.stage.lmd.name + ' ▸ ' + '<span class="leveling-result-item">' + result.stage.lmd.expectation + '회 클리어</span><br>'
	htmlText += '</form>'
	
	/* 최대치(worst) 또는 최소치(best)가 따로 존재한다면 출력 */
	
	// 최소치(best)가 따로 존재한다면 출력
	if ((result.stage.exp.best != result.stage.exp.expectation) || (result.stage.lmd.best != result.stage.lmd.expectation))
	{
		// 최소치(best)
		//htmlText += '<br>'
		htmlText += '<form class="leveling-result-panel" style="color: #1c70b0">'
		htmlText += '<br>'
		htmlText += '<div class="leveling-result-panel-subtitle">'
		htmlText += '최소치 ▸ '
		htmlText += '<span class="leveling-result-item">' + String(result.sanity.total.best) + ' 이성</span><br>'
		htmlText += '</div>'
		htmlText += '<hr>'
		htmlText += '<span style="color: #777">경험치</span> ' + result.stage.exp.name + ' ▸ ' + '<span class="leveling-result-item">' + result.stage.exp.best + '회 클리어</span><br>'
		htmlText += '<span style="color: #777">용문폐</span> ' + result.stage.lmd.name + ' ▸ ' + '<span class="leveling-result-item">' + result.stage.lmd.best + '회 클리어</span><br>'
		htmlText += '</form>'
	}
	
	// 최대치(worst)가 따로 존재한다면 출력
	if ((result.stage.exp.worst != result.stage.exp.expectation) || (result.stage.lmd.worst != result.stage.lmd.expectation))
	{
		// 최대치 (worst)
		//htmlText += '<br>'
		htmlText += '<form class="leveling-result-panel" style="color: #c70808">'
		htmlText += '<br>'
		htmlText += '<div class="leveling-result-panel-subtitle">'
		htmlText += '최대치 ▸ '
		htmlText += '<span class="leveling-result-item">' + String(result.sanity.total.worst) + ' 이성</span><br>'
		htmlText += '</div>'
		htmlText += '<hr>'
		htmlText += '<span style="color: #777">경험치</span> ' + result.stage.exp.name + ' ▸ ' + '<span class="leveling-result-item">' + result.stage.exp.worst + '회 클리어</span><br>'
		htmlText += '<span style="color: #777">용문폐</span> ' + result.stage.lmd.name + ' ▸ ' + '<span class="leveling-result-item">' + result.stage.lmd.worst + '회 클리어</span><br>'
		htmlText += '</form>'
	}
	
	htmlText += '<br>'
	
	htmlText += '<form class="leveling-result-panel">'
	htmlText += '<br>'
	htmlText += '필요 경험치 합계 ▸' + ' ' + '<span class="leveling-result-item">' + String(result.required.exp) + ' Exp.</span><br>'
	htmlText += '필요 용문폐 합계 ▸' + ' ' + '<span class="leveling-result-item">' + String(result.required.lmd) + ' LMD</span><br>'
	htmlText += '<br>'
	htmlText += '소모 경험치 합계 ▸' + ' ' + '<span class="leveling-result-item">' + String(result.consumption.exp) + ' Exp.</span><br>'
	htmlText += '소모 용문폐 합계 ▸' + ' ' + '<span class="leveling-result-item">' + String(result.consumption.lmd) + ' LMD</span><br>'
	htmlText += '<br>'
	htmlText += '</form>'
	
	//htmlText += '<br>'
	
	$('#leveling-result-panel').html(htmlText)
}

const getMaxLevel = function (elite, rarity) {
	return data.maxLevel['elite_' + elite][rarity - 1]
}

const setTargetLevelMax = function () {
	var formdata = getFormData()
	
	var maxLevel = getMaxLevel(formdata.to.elite, formdata.rarity)
	
	$('#to_level').val(maxLevel)
	$('#to_level').trigger('change')
}

// 상세 정보 입력란을 표시
const showDetailInfoPanel = function () {
	// 상세 정보 입력란 표시
	$('#leveling-detail-info-panel').css('display', 'block')
	
	// '상세 정보 입력란 숨기기' 버튼 표시
	$('.leveling-hide-detail-info-panel-btn').css('display', 'inline-block')
	
	// '상세 정보 입력란 보이기' 버튼 숨김
	$('.leveling-show-detail-info-panel-btn').css('display', 'none')
}

// 상세 정보 입력란을 숨김
const hideDetailInfoPanel = function () {
	// 상세 정보 입력란 숨김
	$('#leveling-detail-info-panel').css('display', 'none')
	
	// '상세 정보 입력란 숨기기' 버튼 숨김
	$('.leveling-hide-detail-info-panel-btn').css('display', 'none')
	
	// '상세 정보 입력란 보이기' 버튼 표기
	$('.leveling-show-detail-info-panel-btn').css('display', 'inline-block')
}

$(document).ready(function () {
	// 입력값 변경시, 자동 반영
	$('*').change(function () {
		// 대원 등급 변경시, 적절하게 정예화 단계 / 레벨 조정
		if ($(this).is($('#rarity')))
		{
			//console.log('rarity changed')
			
			var formdata = getFormData()
			
			var rarity = formdata.rarity
			var fromElite = formdata.from.elite
			var toElite = formdata.to.elite
			
			/* 정예화 단계 옵션 재설정 */
			// 이전에 비활성화되었던 옵션들을 일단 다시 활성화
			$('#to_elite option').attr('disabled', 'disabled').siblings().removeAttr('disabled')
			$('#from_elite option').attr('disabled', 'disabled').siblings().removeAttr('disabled')
			
			// 3성 이하는 2정예 불가
			if (rarity <= 3)
			{
				// 비활성화된 정예화 단계가 이미 선택되어 있었다면, 바로 그 아랫단계를 선택해줄 것임
				var prevFromElite = fromElite
				var prevToElite = toElite
				
				// 진급 불가능한 정예화 단계는 선택불가하도록 설정
				$('#from_elite option[value="2"]').attr('disabled', 'disabled')
				$('#to_elite option[value="2"]').attr('disabled', 'disabled')
				
				// 비활성화된 정예화 단계가 이미 선택되어 있었다면, 바로 그 아랫단계를 선택해줌
				if (prevFromElite >= 2)
				{
					$('#from_elite option[value="1"]').prop('selected', true)
					
					fromElite = 1
				}
				if (prevToElite >= 2)
				{
					$('#to_elite option[value="1"]').prop('selected', true)
					
					toElite = 1
				}
			}
			// 2성 이하는 1, 2정예 불가
			if (rarity <= 2)
			{
				// 비활성화된 정예화 단계가 이미 선택되어 있었다면, 바로 그 아랫단계를 선택해줄 것임
				var prevFromElite = fromElite
				var prevToElite = toElite
				
				// 진급 불가능한 정예화 단계는 선택불가하도록 설정
				$('#from_elite option[value="1"]').attr('disabled', 'disabled')
				$('#to_elite option[value="1"]').attr('disabled', 'disabled')
				
				// 비활성화된 정예화 단계가 이미 선택되어 있었다면, 바로 그 아랫단계를 선택해줌
				if (prevFromElite >= 1)
				{
					$('#from_elite option[value="0"]').prop('selected', true)
					
					fromElite = 0
				}
				if (prevToElite >= 1)
				{
					$('#to_elite option[value="0"]').prop('selected', true)
					
					toElite = 0
				}
			}
			
			/* 최대치 초과 레벨 재설정 */
			var fromMaxLevel = getMaxLevel(fromElite, rarity)
			var toMaxLevel = getMaxLevel(toElite, rarity)
			
			//console.log(fromMaxLevel, toMaxLevel)
			
			if (formdata.from.level > fromMaxLevel)
			{
				$('#from_level').val(fromMaxLevel)
			}
			if (formdata.to.level > toMaxLevel)
			{
				$('#to_level').val(toMaxLevel)
			}
		}
		
		//console.log('refresh result')
		showResult()
		//return
	})
})