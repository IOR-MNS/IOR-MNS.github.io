var configSelectionPanel = function () {
    var types = ['qualification', 'range', 'class', 'property']
    var tagIDs = Object.keys(db.tag)

    var filterIDsByType = function (IDs, type) {
        return IDs.filter(ID => db.tag[ID].type === type)
    }

    var region = userConfig.locale.region.value
    var i = 0, j = 0, IDs = [], domstr = ''
    for (i = 0; i < types.length; ++i) {
        IDs = filterIDsByType(tagIDs, types[i])
        domstr = ''
        
        for (j = 0; j < IDs.length; ++j) {
            if (region !== 'en') {
                if (j > 0 && (types[i] === 'class') && (j % 4 === 0)) {
                    domstr += '<br>'
                }
                else if (j > 0 && (types[i] === 'property') && (j % 5 === 0)) {
                    domstr += '<br>'
                }
            }
            
            domstr += `<input onclick="tagClicked(this)" type="checkbox" id="tag_${IDs[j]}" class="checkboxButton"><label class="tag tag-tag" for="tag_${IDs[j]}" data-tag-id="${IDs[j]}">${db.tag[IDs[j]].name[region]}</label>`
        }
        
        document.getElementById('selection-panel-' + types[i]).innerHTML = domstr
    }
    
    document.getElementById('tag-top').dataset.lang = region
    
    if (clearSelection) {
        clearSelection(false, true)
    }
}

configSelectionPanel()
