/* $skillLevelElem의 옵션 및 값에 대해 하한선, 상한선을 지정한다 */
const setSkillLevelBound = function (lowerBound, upperBound, skillLevelElem) {
	// 가독성을 위해서 따로 변수 선언
	var $skillLevelElem = $(skillLevelElem)
	var sklv = Number($skillLevelElem.val())
	
	// 목표 스렙이 하한 또는 상한에 걸린다면, 알맞게 변경
	if (sklv < lowerBound) {
		$skillLevelElem.val(lowerBound)
	}
	if (sklv > upperBound) {
		$skillLevelElem.val(upperBound)
	}
	
	// 하한보다 낮거나, 상한보다 높은 값은 고를 수 없게 비활성화
	
	var numOfOptions = $skillLevelElem.find('option').length
	
	for (var i = 0; i < numOfOptions; ++i) {
		var $option = $($skillLevelElem.find('option')[i])
		var optionValue = Number($option.val())
		
		if (optionValue < lowerBound || optionValue > upperBound) {
			$option.prop('disabled', true)
		}
		else {
			$option.prop('disabled', false)
		}
	}
}

/* 각 스킬에 대해 목표 스킬 레벨의 유효성 검사 및 수정 */
const validateTargetSkillLevel = function (inputObj, targetSkillLevelElem) {
	var $targetSkillLevelElem = $(targetSkillLevelElem)
	
	// 하한, 상한을 계산
	var lowerBound = inputObj.currentSkillLevel
	var upperBound = [4, 7, 10][inputObj.targetElite]	// 스킬레벨 한도는 모든 캐릭터 공통으로 0정=4렙, 1정=7렙, 2정=10렙이다.
	
	if (lowerBound > upperBound) {
		console.log('에러: 하한이 상한보다 큽니다.', lowerBound, upperBound, inputObj, $targetSkillLevelElem)
	}
	
	// 하한, 상한을 적용
	setSkillLevelBound(lowerBound, upperBound, $targetSkillLevelElem)
}

/* 각 스킬에 대해 현재 스킬 레벨의 유효성 검사 및 수정 */
const validateCurrentSkillLevel = function (inputObj, currentSkillLevelElem) {
	var $currentSkillLevelElem = $(currentSkillLevelElem)
	
	// 하한, 상한을 계산
	var lowerBound = 1
	var upperBound = [4, 7, 10][inputObj.currentElite]	// 스킬레벨 한도는 모든 캐릭터 공통으로 0정=4렙, 1정=7렙, 2정=10렙이다.
	
	if (lowerBound > upperBound) {
		console.log('에러: 하한이 상한보다 큽니다.', lowerBound, upperBound, inputObj, $currentSkillLevelElem)
	}
	
	// 하한, 상한을 적용
	setSkillLevelBound(lowerBound, upperBound, $currentSkillLevelElem)
}

$(document).ready(function () {
	///////////////////////
	// 오퍼레이터 추가 버튼 클릭시, modal prompt 열음
	$('.add-btn').click(function () {
		$('.modal').css('display', 'block')
	})
	
	// modal prompt의 content에 있는 닫기 버튼 클릭시, 닫음
	$('.close-btn').click(function() {
		$('#modal').css('display', 'none')
	})
	
	// modal prompt의 content 바깥 클릭시, 닫음
	$(window).click(function(event) {
		if ($(event.target).is($('#modal'))) {
			$('#modal').css('display', 'none')
		}
	})
	
	// modal prompt에서 이름 입력시, 실시간 검색 수행
	$('#opname').keyup(function () {
		var name = $(this).val()
		var capitalizedName = ''
		
		var words = name.split(' ')
		
		for (var i = 0; i < words.length; ++i) {
			if (i > 0) {
				capitalizedName += ' '
			}
			capitalizedName += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
		}
		searchingCondition.name = capitalizedName
		
		showSearchResult()
	})
	
	// modal prompt에서 레어도 조건 입력시, 실시간 검색 수행
	$('.rarity-btn').click(function () {
		var rarity = Number($(this).attr('name'))
		var idx = searchingCondition.rarityArray.indexOf(rarity)
		
		// 선택 해제한 경우, rarityArray에서 해당 조건 제거
		if (idx >= 0) {
			searchingCondition.rarityArray.splice(idx, 1)
			$(this).removeClass('selected')
		}
		// 선택한 경우, rarityArray에 해당 조건 추가
		else {
			searchingCondition.rarityArray.push(rarity)
			$(this).addClass('selected')
		}
		
		showSearchResult()
	})
	
	// modal prompt에서 클래스 조건 입력시, 실시간 검색 수행
	$('.class-btn').click(function () {
		var tagCode = getTagCodeByKRTagName($(this).attr('name'))
		
		// 선택 해제한 경우, tagCode에서 해당 조건 제거
		if (tagCode & searchingCondition.tagCode) {
			$(this).removeClass('selected')
		}
		// 선택한 경우, tagCode에 해당 조건 추가
		else {
			$(this).addClass('selected')
		}
		
		// 눌린 태그를 토글
		searchingCondition.tagCode ^= tagCode
		
		showSearchResult()
	})
	
	// 로컬스토리지로부터 오퍼레이터 선택값, 정보입력값 복원
	loadLocalStorage()
})

const makeOpForm = function (opID) {
	var opName = data.opData[opID].name.en
	var rarity = Number(data.opData[opID].rarity)
	opName = opName.toLowerCase()
	
	var form = 	'<form class="op" align="center" name="op_' + opID + '"> '
	form += '<span class="remove-op-btn">×</span> '
	form += '<img class="op" src="./images/op/thumb/' + opName + '.png"><br>'
	form += '<span>정예화</span><br> '
	form += '<select style="font-size: 60%;" class="current-elite"> '
	
	var maxElite = [0, 0, 1, 2, 2, 2][rarity - 1]
	
	for (var elite = 0; elite <= maxElite; ++elite) {
		form += '<option value="' + elite + '"'
		if (elite == 0) {
			form += ' selected'
		}
		form += '>' + elite + '단계</option> '
	}
	
	form += '</select> '
	form += '<span>▸</span> '
	form += '<select style="font-size: 60%;" class="target-elite"> '
	
	for (var elite = 0; elite <= maxElite; ++elite) {
		form += '<option value="' + elite + '"'
		if (elite == maxElite) {
			form += ' selected'
		}
		form += '>' + elite + '단계</option> '
	}
	
	form += '</select><br> '
	form += '<hr> '
	form += '<button type="button" class="set-current-op-level-to-max-btn"> '
	form += 'MAX'
	form += '</button> '
	form += '<span>레벨</span> '
	form += '<button type="button" class="set-target-op-level-to-max-btn"> '
	form += 'MAX'
	form += '</button><br> '
	form += '<input type="text" class="current-op-level" style="font-size: 60%;" value="1"> '
	form += '<span>▸</span> '
	form += '<input type="text" class="target-op-level" style="font-size: 60%;" value="1"><br> '
	form += '<hr> '
	form += '<span>스킬 레벨</span><br> '
	form += '<div style="font-size: 85%; margin-top: 0.2em"> '
	form += '<span style="font-size: 65%">1스킬</span> '
	form += '<select style="width: 20%" class="current-skill-level"> '
	for (var sklv = 1; sklv <= 10; ++sklv) {
		form += '<option value="' + sklv + '">' + sklv + '</option> '
	}
	form += '</select> '
	form += '<span style="font-size: 65%">▸</span> '
	form += '<select style="width: 20%" class="target-skill-level"> '
	var defaultSklv = [4, 7, 7][maxElite]
	for (var sklv = 1; sklv <= 10; ++sklv) {
		form += '<option value="' + sklv + '"'
		if (sklv == defaultSklv) {
			form += ' selected'
		}
		form += '>' + sklv + '</option> '
	}
	form += '</select> '
	form += '<br> '
	form += '<span style="font-size: 65%">2스킬</span> '
	form += '<select style="width: 20%;" class="current-skill-level"> '
	for (var sklv = 1; sklv <= 10; ++sklv) {
		form += '<option value="' + sklv + '">' + sklv + '</option> '
	}
	form += '</select> '
	form += '<span style="font-size: 65%">▸</span> '
	form += '<select style="width: 20%" class="target-skill-level"> '
	for (var sklv = 1; sklv <= 10; ++sklv) {
		form += '<option value="' + sklv + '"'
		if (sklv == defaultSklv) {
			form += ' selected'
		}
		form += '>' + sklv + '</option> '
	}
	form += '</select> '
	form += '<br> '
	form += '<span style="font-size: 65%">3스킬</span> '
	form += '<select style="width: 20%;" class="current-skill-level"> '
	for (var sklv = 1; sklv <= 10; ++sklv) {
		form += '<option value="' + sklv + '">' + sklv + '</option> '
	}
	form += '</select> '
	form += '<span style="font-size: 65%">▸</span> '
	form += '<select style="width: 20%" class="target-skill-level"> '
	for (var sklv = 1; sklv <= 10; ++sklv) {
		form += '<option value="' + sklv + '"'
		if (sklv == defaultSklv) {
			form += ' selected'
		}
		form += '>' + sklv + '</option> '
	}
	form += '</select> '
	form += '<br> '
	form += '</div> '
	form += '</form>'
	
	return form
}

// 페이지 최초 로드시, 기존에 저장되어 있던 로컬스토리지 데이터가 존재한다면, 입력값 복원 후, 필요한 트리거 실행
const loadLocalStorage = function () {
	var propList = ['current-elite', 'target-elite', 'current-op-level', 'target-op-level', 'current-skill-level', 'target-skill-level']
	
	var existingProps = {}
	existingProps.IDs = []
	
	// 존재하는 모든 오퍼레이터에 대해, 데이터가 존재하는지 확인
	for (var i = 0; i < data.opData.length; ++i) {
		var opID = i
		
		var prefix = 'optotal_' + opID + '_'
		existingProps[opID] = []
		
		// 데이터 존재여부, 존재한다면 어느 데이터가 존재하는지 검사.
		var dataExists = false
		for (var j = 0; j < propList.length; ++j) {
			var key = prefix + propList[j]
			if (localStorage.getItem(key) !== null) {
				existingProps[opID].push(propList[j])
				dataExists = true
			}
		}
		
		if (dataExists) {
			existingProps.IDs.push(opID)
		}
	}
	
	if (existingProps.IDs.length > 0) {
		// 복원할지 물어봄
		if (!confirm('로컬스토리지에서 오퍼레이터 ' + existingProps.IDs.length + '명의 정보가 확인되었습니다.\n복원하시겠습니까?'))
		{
			// 복원하지 않겠다고 하면 복원하지 않음.
			return
		}
	}
	
	// 오퍼레이터를 복원하고, 데이터가 존재하는 항목에 한해서 입력값도 복원함. 나머지 항목은 기본값 그대로.
	// 복원한 후, 트리거도 발동시킴.
	for (var i = 0; i < existingProps.IDs.length; ++i) {
		var opID = existingProps.IDs[i]
		var prefix = 'optotal_' + opID + '_'
		
		// 오퍼레이터 폼 추가하기 전, 해당 오퍼레이터의 로컬스토리지 데이터 백업(기본값으로 덮어씌워지므로)
		var values = {}
		values.keys = []
		
		for (var j = 0; j < existingProps[opID].length; ++j) {
			var prop = existingProps[opID][j]
			var key = prefix + prop
			
			var val = JSON.parse(localStorage.getItem(key))
			
			values[prop] = val
			values.keys.push(prop)
		}
		
		// 오퍼레이터 폼 추가
		addOp(opID, false)
		
		// 추가한 폼 선택
		var $form = $('form[name="op_' + opID + '"].op')
		
		// 입력값 복원
		for (var j = 0; j < values.keys.length; ++j) {
			var key = values.keys[j]
			var val = values[key]
			
			if (key === 'current-elite') {
				$form.find('.current-elite').val(val)
			}
			
			else if (key === 'target-elite') {
				$form.find('.target-elite').val(val)
			}
			
			else if (key === 'current-op-level') {
				$form.find('.current-op-level').val(val)
			}
			
			else if (key === 'target-op-level') {
				$form.find('.target-op-level').val(val)
			}
			
			else if (key === 'current-skill-level') {
				var $sklv = $form.find('.current-skill-level')
				
				for (var k = 0; k < val.length; ++k) {
					$sklv.eq(k).val(val[k])
				}
			}
			
			else if (key === 'target-skill-level') {
				var $sklv = $form.find('.target-skill-level')
				
				for (var k = 0; k < val.length; ++k) {
					$sklv.eq(k).val(val[k])
				}
			}
		}
		
		// 필요한 트리거 발동
		$form.find('.current-elite').trigger('change')
	}
}

// 오퍼레이터 폼을 추가 후, 각종 리스너를 추가하고, 곧바로 필요한 트리거를 실행하고, 토스트 메시지를 표시.
const addOp = function (opID, showToast = true) {
	// 해당 오퍼레이터가 이미 추가되었는지 검사
	var checkDuplication = $('#selected-op form[name|="op_' + opID + '"]')
	
	if (showToast) {
		// 토스트 메시지 옵션 설정
		toastr.options = {
			"closeButton": false,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-top-full-width",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": "200",
			"hideDuration": "500",
			"timeOut": "1000",
			"extendedTimeOut": "500",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
	}
	
	// 아직 추가되지 않았을 경우에만 새로 추가함
	if (checkDuplication.length <= 0) {
		$('#selected-op').append(makeOpForm(opID))
		var $newForm = $('form[name="op_' + opID + '"].op')
		
		/* 이벤트 리스너 추가 */
		
		/////////////////////////
		// 지우기 버튼
		$newForm.find('.remove-op-btn').off('click').on('click', function () {
			// 오퍼레이터 ID 취득
			var opID = Number($(this).parent().attr('name').split('_')[1])
			
			// 비정상적인 ID라면 작업 중지
			if (Number.isNaN(opID)) {
				console.log('에러: 오퍼레이터 아이디가 숫자로 이뤄지지 않음')
				return
			}
			
			// 오퍼레이터 폼을 삭제
			$(this).parent().remove()
			
			// 로컬스토리지에서도 오퍼레이터를 삭제
			var prefix = 'optotal_' + opID + '_'
			var props = ['current-elite', 'target-elite', 'current-op-level', 'target-op-level', 'current-skill-level', 'target-skill-level']
			for (var i = 0; i < props.length; ++i) {
				localStorage.removeItem(prefix + props[i])
			}
			
			// 결과를 재계산
			showResult()
			
			// 남은 오퍼레이터가 없다면, 선택안내문구를 표시
			var numOfSelectedOp = $('form[name*="op_"].op').length
			if (numOfSelectedOp === 0) {
				$('#selected-op-guide').css('display', 'block')
			}
		})
		
		////////////////////////
		// 레벨 최대 설정 버튼
		
		// 현재 레벨을 최대로 설정
		$newForm.find('.set-current-op-level-to-max-btn').off('click').on('click', function () {
			var $form = $(this).parent()	// 이 요소는 폼의 1단계 아래에 있으므로
			var $currentOpLevel = $form.find('.current-op-level')
			
			var opID = Number($form.attr('name').split('_')[1])
			
			// 비정상적인 ID라면 작업 중지
			if (Number.isNaN(opID)) {
				console.log('에러: 오퍼레이터 아이디가 숫자로 이뤄지지 않음')
				return
			}
			
			// 최대 레벨로 설정
			var currentElite = Number($form.find('.current-elite').val())
			var rarity = data.opData[$form.attr('name').split('_')[1]].rarity
			var maxLevel = getMaxLevel(currentElite, rarity)
			$currentOpLevel.val(maxLevel)
			
			// 레벨 변경 트리거
			$form.find('.current-op-level').trigger('change')
		})
		
		// 목표 레벨을 최대로 설정
		$newForm.find('.set-target-op-level-to-max-btn').off('click').on('click', function () {
			var $form = $(this).parent()	// 이 요소는 폼의 1단계 아래에 있으므로
			var $targetOpLevel = $form.find('.target-op-level')
			
			var opID = Number($form.attr('name').split('_')[1])
			
			// 비정상적인 ID라면 작업 중지
			if (Number.isNaN(opID)) {
				console.log('에러: 오퍼레이터 아이디가 숫자로 이뤄지지 않음')
				return
			}
			
			// 최대 레벨로 설정
			var targetElite = Number($form.find('.target-elite').val())
			var rarity = data.opData[$form.attr('name').split('_')[1]].rarity
			var maxLevel = getMaxLevel(targetElite, rarity)
			$targetOpLevel.val(maxLevel)
			
			// 레벨 변경 트리거
			$form.find('.target-op-level').trigger('change')
		})
		
		/////////////////////////
		// 정예화 단계 변경시
		// 현재 정예화 단계
		$newForm.find('select.current-elite').off('change').on('change', function () {
			var $form = $(this).parent()	// 이 요소는 폼의 1단계 아래에 있으므로
			var $currentElite = $form.find('select.current-elite:enabled')
			var $targetElite = $form.find('select.target-elite:enabled')
			var opID = Number($form.attr('name').split('_')[1])
			
			/* 목표 정예화 단계 조정 */
			// 새로이 변경된 현재 단계가 기존의 목표 단계보다 높다면,
			// 목표 단계를 현재 단계로 맞춘다.
			if (Number($currentElite.val()) > Number($targetElite.val())) {
				$targetElite.val($currentElite.val())
			}
			// 기존의 목표 단계와 같거나 더 낮다면, 아무것도 하지 않는다.
			
			// 목표 단계를 현재 단계보다 낮게 선택할 수 없도록 일부 옵션을 비활성화한다.
			var numOfOptions = $targetElite.find('option').length
			
			for (i = 0; i < numOfOptions; ++i) {
				if (i < $currentElite.val()) {
					$targetElite.find('option[value="' + i + '"]').prop('disabled', true)
				} else {
					$targetElite.find('option[value="' + i + '"]').prop('disabled', false)
				}
			}
			
			/* 현재 레벨 한도 조정 */
			// 레벨 한도 얻어내기
			var rarity = data.opData[$form.attr('name').split('_')[1]].rarity
			var maxLevel = getMaxLevel(Number($currentElite.val()), rarity)
			
			
			// 설정된 레벨이 한도를 넘었다면, 한도에 딱 맞게 설정해주기
			var $currentOpLevel = $form.find('.current-op-level')
			if ($currentOpLevel.val() > maxLevel) {
				$currentOpLevel.val(maxLevel)
			}
			
			/* 현재 스킬레벨 한도 및 활성화 여부 조정 */
			// 1. 스킬레벨 한도는 모든 캐릭터 공통으로 0정=4렙, 1정=7렙, 2정=10렙이다.
			// 2. 최대 스킬 갯수는 아미야를 제외한 모든 캐릭터 공통으로 1~2성=0개, 3성=1개, 4~5성=2개, 6성=3개이다.
			//    오직 아미야만 5성임에도 불구하고 주인공 보정으로 스킬이 3개까지 열린다.
			//    아미야에 대해서만 예외 처리를 해주면 될 것이다.
			// 3. 모든 캐릭터 공통으로 0정=1스까지, 1정=2스까지, 2정=3스까지 열린다.
			
			// 스킬 최대 보유수
			var numOfSkills = [0, 0, 1, 2, 2, 3][Number(data.opData[opID].rarity) - 1]
			
			// 아미야는 5성이면서도 예외적으로 최대 3개의 스킬을 지님
			if (data.opData[opID].name.kr == '아미야') {
				numOfSkills = 3
			}
			
			// 현재 정예화 단계 기준으로 활성화된 스킬의 갯수 구하기
			var numOfEnabledSkills = [1, 2, 3][Number($currentElite.val())]
			if (numOfEnabledSkills > numOfSkills) {
				numOfEnabledSkills = numOfSkills
			}
			
			// 일단, 활성화될 예정인 스킬에 대해서만 작업 진행
			for (var i = 0; i < numOfEnabledSkills; ++i) {
				var $currentSkillLevel = $($form.find('.current-skill-level')[i])
				
				// 먼저 currentSkillLevel 엘리먼트를 활성화
				$currentSkillLevel.prop('disabled', false)
				
				// 현재 스킬 레벨에 대한 유효성 검사, 수정
				var inputObj = {}
				inputObj.currentElite = Number($currentElite.val())
				
				validateCurrentSkillLevel(inputObj, $currentSkillLevel)
			}
			
			// 다음으로는, 비활성화되어야 할 스킬에 대한 작업 진행.
			var numOfSkillInputFields = $form.find('.current-skill-level').length
			
			for (var i = numOfEnabledSkills; i < numOfSkillInputFields; ++i) {
				// 값을 1로 설정하고, 비활성화
				$($form.find('.current-skill-level')[i]).val(1)
				$($form.find('.current-skill-level')[i]).prop('disabled', true)
			}
			
			/* 새로운 현재정예화단계를 로컬스토리지에 저장 */
			var key = 'optotal_' + opID + '_current-elite'
			var val = Number($(this).val())
			val = Number.isNaN(val) ? 0 : val
			
			localStorage.setItem(key, val)
			
			// 작업이 미처 끝나지 않았는데 트리거를 실행해버리면, 작업이 서로 덮어씌워져 예상치 못한 결과를 얻을 수 있으므로,
			// 모든 작업을 마치고서 트리거를 실행한다.
			
			$form.find('.target-elite').trigger('change')
			$form.find('.current-op-level').trigger('change')
			$form.find('.current-skill-level').trigger('change')
			
			// 결과를 재계산
			showResult()
		})
		
		// 목표 정예화 단계
		$newForm.find('select.target-elite').off('change').on('change', function () {
			var $form = $(this).parent()	// 이 요소는 폼의 1단계 아래에 있으므로
			var $currentElite = $form.find('select.current-elite:enabled')
			var $targetElite = $form.find('select.target-elite:enabled')
			var opID = Number($form.attr('name').split('_')[1])
			
			/* 목표 레벨 한도 조정 */
			// 레벨 한도 얻어내기
			var rarity = data.opData[$form.attr('name').split('_')[1]].rarity
			var maxLevel = getMaxLevel(Number($targetElite.val()), rarity)
			
			// 설정된 레벨이 한도를 넘었다면, 한도에 딱 맞게 설정해주기
			var $targetOpLevel = $form.find('.target-op-level')
			if ($targetOpLevel.val() > maxLevel) {
				$targetOpLevel.val(maxLevel)
			}
			
			/* 목표 스킬레벨 한도 및 활성화 여부 조정 */
			
			// 스킬 최대 보유수
			var numOfSkills = [0, 0, 1, 2, 2, 3][Number(data.opData[opID].rarity) - 1]
			
			// 아미야는 5성이면서도 예외적으로 최대 3개의 스킬을 지님
			if (data.opData[opID].name.kr == '아미야') {
				numOfSkills = 3
			}
			
			// 목표 정예화 단계 기준으로 활성화된 스킬의 갯수 구하기
			var numOfEnabledSkills = [1, 2, 3][Number($targetElite.val())]
			if (numOfEnabledSkills > numOfSkills) {
				numOfEnabledSkills = numOfSkills
			}
			
			// 일단, 활성화될 예정인 스킬에 대해서만 작업 진행
			for (var i = 0; i < numOfEnabledSkills; ++i) {
				var $targetSkillLevel = $($form.find('.target-skill-level')[i])
				
				var targetElite = Number($targetElite.val())
				var currentSkillLevel = Number($($form.find('.current-skill-level')[i]).val())
				
				// 먼저 targetSkillLevel 엘리먼트를 활성화
				$targetSkillLevel.prop('disabled', false)
				
				// 목표 스킬 레벨에 대한 유효성 검사, 수정
				var inputObj = {}
				inputObj.targetElite = targetElite
				inputObj.currentSkillLevel = currentSkillLevel
				
				validateTargetSkillLevel(inputObj, $targetSkillLevel)
			}
			
			// 다음으로는, 비활성화되어야 할 스킬에 대한 작업 진행.
			var numOfSkillInputFields = $form.find('.target-skill-level').length
			
			for (var i = numOfEnabledSkills; i < numOfSkillInputFields; ++i) {
				// 값을 1로 설정하고, 비활성화
				$($form.find('.target-skill-level')[i]).val(1)
				$($form.find('.target-skill-level')[i]).prop('disabled', true)
			}
			
			/* 새로운 목표정예화단계를 로컬스토리지에 저장 */
			var key = 'optotal_' + opID + '_target-elite'
			var val = Number($(this).val())
			val = Number.isNaN(val) ? 2 : val
			
			localStorage.setItem(key, val)
			
			// 작업이 미처 끝나지 않았는데 트리거를 실행해버리면, 작업이 서로 덮어씌워져 예상치 못한 결과를 얻을 수 있으므로,
			// 모든 작업을 마치고서 트리거를 실행한다.
			
			$form.find('.target-op-level').trigger('change')
			$form.find('.target-skill-level').trigger('change')
			
			// 결과를 재계산
			showResult()
		})
		
		
		///////////////////////
		// 오퍼레이터 레벨 변경시
		
		// 현재 레벨 변경시
		$newForm.find('input[type="text"].current-op-level').off('change').on('change', function () {
			// 숫자가 아닌 값이라면 1로 초기화
			// 최소치보다 낮다면 최소치로 초기화
			// 최대치를 넘는다면 최대치로 초기화
			var $form = $(this).parent()	// 이 요소는 폼의 1단계 아래에 있으므로
			var opID = $form.attr('name').split('_')[1]
			var elite = Number($form.find('.current-elite').val())
			var rarity = data.opData[opID].rarity
			var maxlv = getMaxLevel(elite, rarity)
			var lv = Number($(this).val())
			lv = Number.isNaN(lv) ? 1 : lv
			lv = (lv < 1) ? 1 : lv
			lv = (lv > maxlv) ? maxlv : lv
			
			$(this).val(lv)
			
			localStorage.setItem('optotal_' + opID + '_current-op-level', lv)
			
			showResult()
		})
		
		// 목표 레벨 변경시
		$newForm.find('input[type="text"].target-op-level').off('change').on('change', function () {
			// 숫자가 아닌 값이라면 1로 초기화
			// 최소치보다 낮다면 최소치로 초기화
			// 최대치를 넘는다면 최대치로 초기화
			var $form = $(this).parent()	// 이 요소는 폼의 1단계 아래에 있으므로
			var opID = $form.attr('name').split('_')[1]
			var elite = Number($form.find('.target-elite').val())
			var rarity = data.opData[opID].rarity
			var maxlv = getMaxLevel(elite, rarity)
			var lv = Number($(this).val())
			lv = Number.isNaN(lv) ? 1 : lv
			lv = (lv < 1) ? 1 : lv
			lv = (lv > maxlv) ? maxlv : lv
			
			$(this).val(lv)
			
			localStorage.setItem('optotal_' + opID + '_target-op-level', lv)
			
			showResult()
		})
		
		///////////////////////
		// 스킬레벨 변경시
		
		// 현재스킬레벨 변경시
		$newForm.find('select.current-skill-level').off('change').on('change', function () {
			// 이 요소가 비활성화되어 있다면 아무것도 하지 않음
			if ($(this).prop('disabled') === true) {
				return
			}
			
			var changedLevel = Number($(this).val())
			var $form = $(this).parent().parent()	// 이 요소는 폼의 2단계 아래에 있으므로
			var numOfEnabledSkills = $form.find('.target-skill-level:enabled').length
			
			// 새로이 변경된 현재스렙이 6 이하라면, 
			if (changedLevel <= 6) {
				for (var i = 0; i < numOfEnabledSkills; ++i) {
					var $currentSkillLevel = $($form.find('.current-skill-level')[i])
					var $targetSkillLevel = $($form.find('.target-skill-level')[i])
					
					var targetElite = Number($form.find('.target-elite').val())
					var currentSkillLevel = Number($currentSkillLevel.val())
					
					// 다른 모든 현재스렙을 새로이 변경된 스렙으로 바꾸고,
					$currentSkillLevel.val(changedLevel)
					
					/* 각 스킬에 대해 목표스렙의 유효성 검사 및 수정 */
					var inputObj = {}
					inputObj.targetElite = targetElite
					inputObj.currentSkillLevel = currentSkillLevel
					
					validateTargetSkillLevel(inputObj, $targetSkillLevel)
				}
			}
			// 새로이 변경된 현재스렙이 7 이상이라면,
			else {
				for (var i = 0; i < numOfEnabledSkills; ++i) {
					var $currentSkillLevel = $($form.find('.current-skill-level')[i])
					var $targetSkillLevel = $($form.find('.target-skill-level')[i])
					
					var targetElite = Number($form.find('.target-elite').val())
					var currentSkillLevel = Number($currentSkillLevel.val())
					
					// 다른 모든 현재스렙을 최소 7렙 이상이 되도록 바꾸고,
					if (Number($currentSkillLevel.val()) < 7) {
						$currentSkillLevel.val(7)
					}
					
					/* 각 스킬에 대해 목표스렙의 유효성 검사 및 수정 */
					var inputObj = {}
					inputObj.targetElite = targetElite
					inputObj.currentSkillLevel = currentSkillLevel
					
					validateTargetSkillLevel(inputObj, $targetSkillLevel)
				}
			}
			
			/* 새로운 현재스킬레벨을 로컬스토리지에 저장 */
			var key = 'optotal_' + opID + '_current-skill-level'
			var val = []
			var $csklv = $form.find('.current-skill-level')
			
			for (var i = 0; i < $csklv.length; ++i) {
				val.push(Number($csklv.eq(i).val()))
			}
			
			val = JSON.stringify(val)
			
			localStorage.setItem(key, val)
			
			$form.find('.target-skill-level').trigger('change')
			
			// 결과를 재계산
			showResult()
		})
		
		// 목표스킬레벨 변경시
		$newForm.find('select.target-skill-level').off('change').on('change', function () {
			// 이 요소가 비활성화되어 있다면 아무것도 하지 않음
			if ($(this).prop('disabled') === true) {
				return
			}
			
			var changedLevel = Number($(this).val())
			var $form = $(this).parent().parent()	// 이 요소는 폼의 2단계 아래에 있으므로
			var numOfEnabledSkills = $form.find('.target-skill-level:enabled').length
			var currentSkillCommonLevel = Number($form.find('.current-skill-level').eq(0).val())
			
			// 새로이 변경된 목표스렙이 6 이하라면, 
			if (changedLevel <= 6) {
				for (var i = 0; i < numOfEnabledSkills; ++i) {
					var $currentSkillLevel = $form.find('.current-skill-level').eq(i)
					var $targetSkillLevel = $form.find('.target-skill-level').eq(i)
					
					var targetElite = Number($form.find('.target-elite').val())
					var currentSkillLevel = Number($currentSkillLevel.val())
					
					// 특정한 현재 레벨이 현재 공통 레벨보다 낮으면 안되지만,
					// 예를 들어서 현재에선 비활성화 / 목표에선 활성화된 스킬의 경우에는 현재 스킬 레벨이 1로 잡힐 수 있으므로,
					// 그것에 대한 예외처리를 수행
					if (currentSkillLevel < currentSkillCommonLevel) {
						currentSkillLevel = currentSkillCommonLevel
					}
					
					// 다른 모든 목표스렙을 새로이 변경된 스렙으로 바꾸고,
					$targetSkillLevel.val(changedLevel)
					
					/* 각 스킬에 대해 목표스렙의 유효성 검사 및 수정 */
					var inputObj = {}
					inputObj.targetElite = targetElite
					inputObj.currentSkillLevel = currentSkillLevel
					
					validateTargetSkillLevel(inputObj, $targetSkillLevel)
				}
			}
			// 새로이 변경된 목표스렙이 7 이상이라면,
			else {
				for (var i = 0; i < numOfEnabledSkills; ++i) {
					var $currentSkillLevel = $($form.find('.current-skill-level')[i])
					var $targetSkillLevel = $($form.find('.target-skill-level')[i])
					
					var targetElite = Number($form.find('.target-elite').val())
					var currentSkillLevel = Number($currentSkillLevel.val())
					
					// 특정한 현재 레벨이 현재 공통 레벨보다 낮으면 안되지만,
					// 예를 들어서 현재에선 비활성화 / 목표에선 활성화된 스킬의 경우에는 현재 스킬 레벨이 1로 잡힐 수 있으므로,
					// 그것에 대한 예외처리를 수행
					if (currentSkillLevel < currentSkillCommonLevel) {
						currentSkillLevel = currentSkillCommonLevel
					}
					
					// 다른 모든 목표스렙을 최소 7렙 이상이 되도록 바꾸고,
					if (Number($targetSkillLevel.val()) < 7) {
						$targetSkillLevel.val(7)
					}
					
					/* 각 스킬에 대해 목표스렙의 유효성 검사 및 수정 */
					var inputObj = {}
					inputObj.targetElite = targetElite
					inputObj.currentSkillLevel = currentSkillLevel
					
					validateTargetSkillLevel(inputObj, $targetSkillLevel)
				}
			}
			
			/* 새로운 목표스킬레벨을 로컬스토리지에 저장 */
			var key = 'optotal_' + opID + '_target-skill-level'
			var val = []
			var $csklv = $form.find('.target-skill-level')
			
			for (var i = 0; i < $csklv.length; ++i) {
				val.push(Number($csklv.eq(i).val()))
			}
			
			val = JSON.stringify(val)
			
			localStorage.setItem(key, val)
			
			// 결과를 재계산
			showResult()
		})
		
		//////////
		// 트리거를 작동시켜서 바로 스킬레벨한도나 활성화스킬갯수 등 조정
		$newForm.find('.current-elite').trigger('change')
		
		// 선택안내문구가 표시되고 있었다면, 비표시 설정
		$('#selected-op-guide').css('display', 'none')
		
		if (showToast) {
			toastr.success(data.opData[opID].name.kr, '추가됨')
		}
	}
	// 이미 추가되어 있다면, 더이상 중복으로 추가하지 않음
	else {
		if (showToast) {
			toastr.error(data.opData[opID].name.kr, '이미 추가되어 있음')
		}
		console.log('이미 추가되어 있음', opID, data.opData[opID].name.kr)
	}
}

var searchingCondition = {
	name: '',
	rarityArray: [],
	tagCode: 0
}

const getTagCodeByKRTagName = function (name) {
	for (var i = 0; i < data.tagData.length; ++i) {
		if (data.tagData[i].name.kr == name) {
			return Number(data.tagData[i].tagCode)
		}
	}
}

const showSearchResult = function () {
	// 검색 조건 정렬
	searchingCondition.rarityArray.sort(function (a, b) {
		if (a > b) {
			return -1
		}
		else {
			return 1
		}
	})
	
	var result = searchOp(searchingCondition.name, searchingCondition.rarityArray, searchingCondition.tagCode)
	
	var opnameArray = {
		kr: [],
		en: [],
		id: []
	}
	
	for (var i = 0; i < result.length; ++i) {
		opnameArray.kr.push(result[i].name.kr)
		opnameArray.en.push(result[i].name.en)
		opnameArray.id.push(result[i].id)
	}
	
	var form = ''
	
	for (var i = 0; i < opnameArray.en.length; ++i) {
		form	+=	'<form class="search-result-op" name="' + 'op_' + opnameArray.id[i] + '">'
				+	'	<img src="./images/op/thumb/' + opnameArray.en[i].toLowerCase() + '.png">'
				+	'	<div>' + opnameArray.kr[i] + '</div>'
				+	'</form>'
				+	' '
	}
	
	if (form == '') {
		form = '<p style="font-size: 0.5em; text-align: center">검색 결과가 여기에 표시됩니다.</p>'
	}
	
	$('div.modal-footer>div.search-result').html(form)
	
	// 이벤트 리스너 추가
	$('form.search-result-op').off('click').on('click', function () {
		var opID = $(this).attr('name').split('_')[1]
		addOp(opID, true)
	})
}

/* 오퍼레이터 검색 */
/* 이름 배열, 레어도 배열, 클래스 태그코드 */
const searchOp = function (name, rarityArray, tagCode) {
	var searchPool = []
	var result = []
	
	// 깊은 복사
	searchPool = JSON.parse(JSON.stringify(data.opData))
	
	// 비어있거나 공백만 있는 이름을 받은 경우, 이름으로 검색하지 않음
	if (name.replace(/(\s*)/g, '').length <= 0) {
		name = false
	}
	
	// 입력받은 이름이 존재한다면, 이름 검색
	for (var i = 0; i < searchPool.length; ++i) {
		// 한, 영, 중, 일 이름에서 검색
		// 부분일치 이름이 있다면, 검색결과에 오퍼레이터를 넣고 continue
		if (searchPool[i].name.kr.indexOf(name) >= 0) {
			result.push(searchPool[i])
			searchPool.splice(i, 1)
			--i
			continue
		}
		if (searchPool[i].name.en.indexOf(name) >= 0) {
			result.push(searchPool[i])
			searchPool.splice(i, 1)
			--i
			continue
		}
		if (searchPool[i].name.cn.indexOf(name) >= 0) {
			result.push(searchPool[i])
			searchPool.splice(i, 1)
			--i
			continue
		}
		if (searchPool[i].name.jp.indexOf(name) >= 0) {
			result.push(searchPool[i])
			searchPool.splice(i, 1)
			--i
			continue
		}
	}
	
	// 레어도 검색
	if (rarityArray.length > 0) {
		// 입력받은 이름이 존재한다면, 기존 검색 결과 내에서 다시 검색
		if (name !== false) {
			// 깊은 복사로 검색풀 갱신하고, 결과배열은 초기화
			searchPool = JSON.parse(JSON.stringify(result))
			result = []
		}
		
		for (var i = 0; i < rarityArray.length; ++i) {
			for (var j = 0; j < searchPool.length; ++j) {
				if (rarityArray[i] == searchPool[j].rarity) {
					result.push(searchPool[j])
					searchPool.splice(j, 1)
					--j
					continue
				}
			}
		}
	}
	
	
	// 클래스 태그코드 검색. 일치하는 클래스가 하나라도 존재한다면 검색 결과에 넣음
	if (tagCode != 0) {
		
		// 입력된 이름이나 선택된 레어도가 존재한다면, 기존 검색 결과 내에서 다시 검색
		if ((name !== false) || (rarityArray.length > 0)) {
			// 깊은 복사로 검색풀 갱신하고, 결과배열은 초기화
			searchPool = JSON.parse(JSON.stringify(result))
			result = []
		}
		
		for (var i = 0; i < searchPool.length; ++i) {
			if (tagCode & searchPool[i].tagCode) {
				result.push(searchPool[i])
				searchPool.splice(i, 1)
				--i
				continue
			}
		}
	}
	
	// 검색 결과 반환
	return result
}