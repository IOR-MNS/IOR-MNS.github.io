var types=parseQueryString(location.href),eventType=Number(types.eventType),playType=Number(types.playType),i=0;1==eventType&&(document.getElementById("currentItem").value="180",document.getElementById("eventConsumption").innerHTML+='<option value="4">4\ubc30\uc218</option>');2==eventType&&(document.getElementById("currentItem").value="1",document.getElementById("eventConsumption").innerHTML+='<option value="3">3\ubc30\uc218</option>');1==playType&&(document.getElementById("targetPoint").value="30000",document.getElementById("liveConsumptionLabel").innerHTML+="\uc77c\ubc18\uace1 \ubc30\uc218 \uc120\ud0dd",document.getElementById("liveConsumption").innerHTML+='<option value="30" selected>1\ubc30\uc218</option>',document.getElementById("liveConsumption").innerHTML+='<option value="60">2\ubc30\uc218</option>');if(2==playType)if(document.getElementById("targetPoint").value="200000",2!=eventType){document.getElementById("liveConsumptionLabel").innerHTML+="\ud2f0\ucf13 \uc0ac\uc6a9 \ubc30\uc218 \uc120\ud0dd";for(i=3;10>i;i++)document.getElementById("liveConsumption").innerHTML+='<option value="'+30*i+'">'+i+"\ubc30\uc218</option>";document.getElementById("liveConsumption").innerHTML+='<option value="300" selected>10\ubc30\uc218</option>'}else document.getElementById("liveConsumptionLabel").style.display="none",document.getElementById("liveConsumption").style.display="none";var elements;!1===types&&alert("\uc62c\ubc14\ub978 \uacbd\ub85c\ub85c \uc811\uadfc\ud574\uc8fc\uc138\uc694.");if(1==eventType)for(document.getElementById("subtitle").innerHTML+="PSTheater & ",elements=document.getElementsByClassName("tour"),i=0;i<elements.length;i++)elements[i].style.display="none";if(2==eventType)for(document.getElementById("subtitle").innerHTML+="PSTour & ",elements=document.getElementsByClassName("theater"),i=0;i<elements.length;i++)elements[i].style.display="none";if(1==playType)for(document.getElementById("subtitle").innerHTML+="\ub77c\uc774\ube0c\ub7f0",elements=document.getElementsByClassName("work"),i=0;i<elements.length;i++)elements[i].style.display="none";if(2==playType)for(document.getElementById("subtitle").innerHTML+="\uc601\uc5c5\ub7f0",elements=document.getElementsByClassName("live"),i=0;i<elements.length;i++)elements[i].style.display="none";var buttonClicked=function(a,b){getResult(eventType,playType,a,b)};