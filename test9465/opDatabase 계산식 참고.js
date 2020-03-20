(window.RLQ = window.RLQ || []).push(function () {
  var r = "4";
  var hp = ["590", "843", "1096", "1443"].filter(function (v) {
    return v !== "";
  });
  var atk = ["266", "370", "475", "573"].filter(function (v) {
    return v !== "";
  });
  var def = ["47", "72", "99", "119"].filter(function (v) {
    return v !== "";
  });
  var res = ["10", "10", "15", "20"].filter(function (v) {
    return v !== "";
  });
  var data = [hp, atk, def];
  var td = ["0", "75", "0", ""].map(function (v) {
    return v === "" ? 0 : parseInt(v);
  });
  var rare = {
    "5": [50, 80, 90],
    "4": [50, 70, 80],
    "3": [45, 60, 70],
    "2": [40, 55],
    "1": [30],
    "0": [30]
  };
  var ll = rare[r];
  var elite = $("#calc #elite");
  var level = $("#calc #level");
  var trust = $("#calc #trust");
  var result = $("#calc #result");
  function calc(e){
   var ve = parseInt(elite.val());
   var vl = parseInt(level.val());
   var vt = parseInt(trust.val());
   if (ve >= ll.length || ve < 0) {
     elite.val(elite.data('val'));
     return;
   }
   if (vt > 100 || vt < 0) {
     trust.val(trust.data('val'));
     return;
   }
   if (vl < 1 && ve === 0 || vl > ll[ll.length - 1]) {
     level.val(level.data('val'));
     return;
   }
   if (vl < 1 && ve !== 0) {
     --ve;
     vl = ll[ve];
     elite.val(ve);
     level.val(vl);
   }
   if (ll.length > ve && vl > ll[ve]) {
     ++ve;
     vl=1;
     level.val(1);
     elite.val(ve);
   }
   var rd = data.map(function (v) {
     return Math.round(parseInt(v[ve]) + (vl - 1) * (v[ve + 1] - v[ve]) / (ll[ve] - 1));
   });
   var rt = td.map(function (v) {
     return parseInt(v * vt / 100);
   });
   result.html(rd.map(function (v, i) {
     if (rt[i] !== 0) {
       return "<td colspan='3'>" + (v + rt[i]) + "(" + rt[i] + ")</td>";
     } else {
       return "<td colspan='3'>" + v + "</td>";
     }
   }).join("")+"<td colspan='3'>"+res[ve+1]+"</td>");
   elite.data('val', ve);
   level.data('val', vl);
   trust.data('val', vt);
  }
$("#calc").on('input', function (e) {
  calc(e);
});
calc();
});