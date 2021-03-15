/*******************오류 보고서 송신*******************/
// glob:
//  namespace,
//  ga_event_category
// 오류 보고서를 송신할 함수는 window[glob.namespace] 객체에 저장.
// 오류 보고서 송신시, 카테고리는 서비스명으로 일괄 설정. 미설정시 '설정되지 않음'으로 전송.
// window[glob.namespace].main이라는 함수가 있다면 실행.

var getByteLength = function (s, limit){
	//assuming the String is UCS-2(aka UTF-16) encoded
    if (limit === undefined) limit = Infinity;
	var n=0,
        splits=[];
    
	for(var i=0,l=s.length,lim=limit; i<l; i++){
		var hi=s.charCodeAt(i);
		if(hi<0x0080){ //[0x0000, 0x007F]
			n+=1;
		}else if(hi<0x0800){ //[0x0080, 0x07FF]
			n+=2;
		}else if(hi<0xD800){ //[0x0800, 0xD7FF]
			n+=3;
		}else if(hi<0xDC00){ //[0xD800, 0xDBFF]
			var lo=s.charCodeAt(++i);
			if(i<l&&lo>=0xDC00&&lo<=0xDFFF){ //followed by [0xDC00, 0xDFFF]
				n+=4;
			}else{
				throw new Error("UCS-2 String malformed");
			}
		}else if(hi<0xE000){ //[0xDC00, 0xDFFF]
			throw new Error("UCS-2 String malformed");
		}else{ //[0xE000, 0xFFFF]
			n+=3;
		}
        if (n > lim) {
            lim += limit
            splits.push(i)
        }
	}
	return {'byteLength': n, 'splits': splits};
}

var sendGAEvent = function (param) {
    if (!param) param = {}
    if (!param.event) param.event = '설정되지 않음'
    if (!param.event_category) param.event_category = '설정되지 않음'
    if (!param.event_label) param.event_label = '설정되지 않음'
    if (!param.non_interaction) param.non_interaction = false
    
    let res = getByteLength(param.event_label, 500)
    if (res.splits[res.splits.length-1] !== param.event_label.length) res.splits.push(param.event_label.length)
    //console.log(res)
    //console.log(param)
    
    let t = Date.now()
    
    for (let i = 0; i < res.splits.length; ++i) {
        console.log(t + ':' + param.event_label.substring(res.splits[i-1] || 0, res.splits[i]))
        gtag('event', param.event, {
            'event_category': param.event_category,
            'event_label': param.event_label.substring(res.splits[i-1] || 0, res.splits[i]),
            'value': t++,
            'non_interaction': param.non_interaction
        })
    }
}

var reportError = function (err) {
    let msg = ''
    
    if (err.stack)
        msg = err.stack.toString()
    else if (err.lineNumber !== undefined || err.columnNumber !== undefined)
        msg = err.lineNumber + ':' + err.columnNumber + '@' + err.toString()
    else
        msg = err.toString()
    
    sendGAEvent({
        'event': 'ERROR',
        'event_category': glob.ga_event_category,
        'event_label': msg,
        'non_interation': true,
    })
    
    let data = {}
    let pushData = function (key) { data[key] = localStorage.getItem(key) }
    Object.keys(localStorage).filter(key => key.indexOf(glob.namespace + '_') >= 0).forEach(pushData)
    
    if (Object.keys(data).length > 0) {
        msg = JSON.stringify(data)
        sendGAEvent({
            'event': 'ERROR',
            'event_category': glob.ga_event_category,
            'event_label': msg,
            'non_interation': true,
        })
    }
    console.log(Object.keys(data).length)
}

var tcWrapper = function (f) {
    return function () {
        try {
            return f.apply(this, arguments)
        } catch (e) {
            if (e.message != "실행 함수에 에러 발생, 실행 중지") {
                reportError(e)
            }
            throw new Error("실행 함수에 에러 발생, 실행 중지")
        }
    }
}

/*************************************************/

for (let fname in window[glob.namespace]) {
    let f = window[glob.namespace][fname]
    /*if (typeof f === 'function') {
        window[fname] = tcWrapper(f)
    }
    else {*/
        window[fname] = f
    //}
}

window.errorCatcherExec = window.errorCatcherExec || []

for (let i = 0; i < window.errorCatcherExec.length; ++i) {
    let fname = window.errorCatcherExec[i]
    if (typeof window[fname] === 'function') {
        try {
            if (typeof $(document).ready === 'function') {
                $(document).ready(window[fname])
            }
        } catch (e) {
            window[fname]()
        }
    }
    else {
        console.error(fname, 'is not a function.')
    }
}