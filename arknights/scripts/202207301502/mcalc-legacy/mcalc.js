var itemOrder={keys:["\ud2b9\uc218\uc7ac\ub8cc","\uc77c\ubc18\uc7ac\ub8cc","\uc2a4\ud0ac\uac1c\ub860","\uce69\ub958"],"\ud2b9\uc218\uc7ac\ub8cc":[["\ubaa8\ub4c8 \ub370\uc774\ud130 \ube14\ub85d","D32\uac15","\ubc14\uc774\ud3f4\ub77c \ub098\ub178\ud50c\ub808\uc774\ud06c \uce69","\uc911\ud569\uc81c","\uacb0\uc815 \uc804\uc790 \uc7a5\uce58"],"RMA70-24;\ub9dd\uac04 \uc911\ud569\uccb4;\ud654\uc774\ud2b8 \ud638\uc2a4 \ucf5c;\uace0\uae09 \uc5f0\ub9c8\uc11d;\uc911\ud569\uc824;\uc5f4\ud569\uae08 \ud329;\uacb0\uc815 \ud68c\ub85c;\uc815\uc81c\ub41c \uc6a9\uc81c;\uc808\uc0ad\uc720 \uc6d0\uc561".split(";"),
"RMA70-12;\ub9dd\uac04 \uad11\uc11d;\ub85c\uc2dd \ucf5c;\uc5f0\ub9c8\uc11d;\uc824;\uc5f4\ud569\uae08;\uacb0\uc815 \ubd80\ud488;\ubc18\ud569\uc131 \uc6a9\uc81c;\uc911\ud569 \uc808\uc0ad\uc720".split(";")],"\uc77c\ubc18\uc7ac\ub8cc":["\ud3ec\ub3c4\ub2f9 \ud329;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ud329;\uac1c\ub7c9 \uc7a5\uce58;\uc815\uc81c \uc6d0\uc554;\uc544\ucf00\ud1a4 \ud329;\uc774\ucca0 \ud329".split(";"),"\ud3ec\ub3c4\ub2f9 \ubc88\ub4e4;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ubc88\ub4e4;\ub9ac\ub274\uc5bc \uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c \ubc88\ub4e4;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4 \ubc88\ub4e4;\uc774\ucca0 \ubc88\ub4e4".split(";"),
"\ud3ec\ub3c4\ub2f9;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974;\uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4;\uc774\ucca0".split(";"),"\ub300\uccb4\ub2f9;\uc5d0\uc2a4\ud14c\ub974 \uc6d0\ub8cc;\ud30c\uc190\ub41c \uc7a5\uce58;\uc6d0\uc554;\ub514\ucf00\ud1a4;\uc774\ucca0 \uc870\uac01".split(";")],"\uc2a4\ud0ac\uac1c\ub860":[["\uc2a4\ud0ac\uac1c\ub860 \uc81c3\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c2\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c1\uad8c"]],"\uce69\ub958":[["\uce69 \ucca8\uac00\uc81c",
"\uad6c\ub9e4\uc99d\uba85\uc11c"],"\ubc45\uac00\ub4dc \ub4c0\uc5bc \uce69;\uac00\ub4dc \ub4c0\uc5bc \uce69;\ub514\ud39c\ub354 \ub4c0\uc5bc \uce69;\uc2a4\ub098\uc774\ud37c \ub4c0\uc5bc \uce69;\uce90\uc2a4\ud130 \ub4c0\uc5bc \uce69;\uba54\ub515 \ub4c0\uc5bc \uce69;\uc11c\ud3ec\ud130 \ub4c0\uc5bc \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \ub4c0\uc5bc \uce69".split(";"),"\ubc45\uac00\ub4dc \uce69\uc14b;\uac00\ub4dc \uce69\uc14b;\ub514\ud39c\ub354 \uce69\uc14b;\uc2a4\ub098\uc774\ud37c \uce69\uc14b;\uce90\uc2a4\ud130 \uce69\uc14b;\uba54\ub515 \uce69\uc14b;\uc11c\ud3ec\ud130 \uce69\uc14b;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69\uc14b".split(";"),
"\ubc45\uac00\ub4dc \uce69;\uac00\ub4dc \uce69;\ub514\ud39c\ub354 \uce69;\uc2a4\ub098\uc774\ud37c \uce69;\uce90\uc2a4\ud130 \uce69;\uba54\ub515 \uce69;\uc11c\ud3ec\ud130 \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69".split(";")]};
const showItem=function(d){d="<hr>";for(var e=0;e<itemOrder.keys.length;++e){var k=itemOrder[itemOrder.keys[e]];d+='<div id="category_'+e+'">';for(var m=0;m<k.length;++m){for(var t=0;t<k[m].length;++t){var x=Number(k[m][t]),H=db.item[x].grade,u=getItem_have(x),v=getItem_need(x);u=null===u?"":u;v=null===v?"":v;u=0==u?"":u;v=0==v?"":v;d+='<div align="center" class="item grade_'+H+'" id="item_'+k[m][t]+'"><div class="item_thumb"><img src="./images/item/inv_2/';d+=db.item[x].name.kr;d+='.png"><span class="item_thumb_name">';
d+=db.item[x].name.kr;d+='</span><div class="item_thumb_quantity">0</div></div><div class="item_body"><div style="height:0.4rem"></div><div class="item_body_have">\ubcf4\uc720\ub7c9<br><input type="text" class="item_body_have_input" value="';d+=u;d+='"></div><div class="item_body_need">\ud544\uc694\ub7c9<br><input type="text" class="item_body_need_input" value="';d+=v;d+='"></div></div></div>'}d+="<div></div>"}d+="<hr>";d+="</div>"}$(".item-container").html(d);$(".item_body_have_input").off("change keyup").on("change keyup",
function(){saveInputToLocalStorage(this,"have")&&$(this).closest(".item").trigger("refresh");gtag("event","\uc18c\uc9c0\ub7c9 \ubcc0\uacbd",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 1.0"})});$(".item_body_need_input").off("change keyup").on("change keyup",function(){saveInputToLocalStorage(this,"need")&&$(this).closest(".item").trigger("refresh");gtag("event","\ud544\uc694\ub7c9 \ubcc0\uacbd",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 1.0"})});$(".item").off("refresh").on("refresh",function(){var b=
$(this),c=Number(b.attr("id").split("_")[1]),a=0>=db.item[c].craft.length?[]:db.item[c].craft[0];var g=Number(getItem_need(c));c=Number(getItem_have(c));var f=D(this);g+=f;f=g-c;f=0>f?0:f;var l=Object.keys(b.data());for(var h=0;h<l.length;++h)0===l[h].indexOf("availability_")&&b.removeData(l[h]);for(h=0;h<a.length;++h){l=Number(a[h][1]);var q=$("#item_"+a[h][0]);if(1===q.length){var p=q;var n=f*l;q=$(b);l=$(p);q=Number(q.attr("id").split("_")[1]);var w=Number(l.attr("id").split("_")[1]);n=Number(n);
if(isNaN(n))console.log("\uc624\ub958: \ub9e4\uac1c\ubcc0\uc218\ub97c \uc22b\uc790\ub85c \ubcc0\ud658\ud560 \uc218 \uc5c6\uc74c",n);else{l.data("craftDemand_"+q,n);n=Number(getItem_have(w));var y=Number(getItem_need(w)),r=B(p);D(p);n=n+r-y;p=E(p);y=[];for(r=0;r<p.length;++r){var z=$("#item_"+p[r]),A=l.data("craftDemand_"+p[r]),C=z.data("availability_"+w);C=void 0===C?0:C;n=0>n?0:n;n<A?(z.data("availability_"+w,n),n=0):(z.data("availability_"+w,A),n-=A);A=z.data("availability_"+w);C!=A&&p[r]!=q&&y.push(z)}for(r=
0;r<y.length;++r)y[r].trigger("refresh");l.trigger("refresh")}}}b=B(this);F(this,c+b-g);G(this)});const D=function(b){b=$(b);var c=0;tmp=Object.keys(b.data()).sort();for(var a=0;a<tmp.length;++a)0===tmp[a].indexOf("craftDemand_")&&(c+=b.data(tmp[a]));return c},E=function(b){var c=$(b);b=[];c=Object.keys(c.data()).sort();for(var a=0;a<c.length;++a)0===c[a].indexOf("craftDemand_")&&b.push(Number(c[a].split("_")[1]));return b},F=function(b,c){var a=$(b);b=a.find(".item_thumb");a=a.find(".item_thumb_quantity");
a.text(c);0>c?(a.addClass("minus").removeClass("plus"),b.addClass("minus")):(0<c?a.addClass("plus").removeClass("minus"):a.removeClass("plus").removeClass("minus"),b.removeClass("minus"))},B=function(b){b=$(b);var c=b.attr("id").split("_")[1];c=0>=db.item[c].craft.length?[]:db.item[c].craft[0];for(var a=!1,g=0;g<c.length;++g){var f=c[g][0],l=Number(c[g][1]),h=b.data("availability_"+f);if(void 0!==h){h=Number(h);if(isNaN(h)){console.log("\uac00\uc6a9\ub7c9 \ub370\uc774\ud130\uc758 \uac12\uc774 \ube44\uc815\uc0c1\uc801\uc784: ",
this,"\uc758 jquery data \uc18d\uc131: avail_"+f+": "+$this.data("avail_"+f));return}f=parseInt(h/l,10);a=!1===a?f:f<a?f:a}}return!1===a?0:a},G=function(b){var c=$(b),a=Number(c.attr("id").split("_")[1]),g=Number(getItem_have(a));var f=Number(getItem_need(a));var l=B(b);f=g+l-f;l=E(b);b=[];for(g=0;g<l.length;++g){var h=$("#item_"+l[g]),q=c.data("craftDemand_"+l[g]),p=h.data("availability_"+a);p=void 0===p?0:p;f=0>f?0:f;f<q?(h.data("availability_"+a,f),f=0):(h.data("availability_"+a,q),f-=q);q=h.data("availability_"+
a);p!=q&&b.push(h)}for(g=0;g<b.length;++g)a=b[g].attr("id").split("_")[1],c=Number(getItem_have(a))+B(b[g]),a=Number(getItem_need(a))+D(b[g]),F(b[g],c-a),G(b[g])};$(".item").trigger("refresh")},saveInputToLocalStorage=function(d,e){d=$(d);if("have"===e){e=d.closest(".item");e=Number(e.attr("id").split("_")[1]);var k=Number(d.val().replace(/[^0-9]/g,"")),m=Number(getItem_have(e));if(isNaN(k))return d.val(0===m?"":m),!1;setItem_have(e,k);d.val(0===k?"":k);return!0}if("need"===e){e=d.closest(".item");
e=Number(e.attr("id").split("_")[1]);k=Number(d.val());m=Number(getItem_need(e));if(isNaN(k))return d.val(m),!1;setItem_need(e,k);return!0}console.log("invalid inputType:",e);return!1};$(document).ready(function(){for(var d=0;d<itemOrder.keys.length;++d)for(var e=itemOrder[itemOrder.keys[d]],k=0;k<e.length;++k)for(var m=0;m<e[k].length;++m){a:{var t=void 0;for(t in db.item)if(db.item[t].name.kr===e[k][m])break a;t=-1}if(0>t){console.log(e[k][m],"error");return}e[k][m]=t}showItem();document.getElementById("content-body").classList.add("loaded")});