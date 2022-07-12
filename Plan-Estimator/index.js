function calc() {
  
  var vendor = document.getElementById('vGoal').value;
  hourlyGoal= Math.round(vendor/9.5);
  
  var xValues = ["18:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  var times = ["18:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  let yValuesP1 = new Array(3);
  let yValuesP2 = new Array(3);
  let yValuesP3 = new Array(3);
  let p1 = new Array();
  let p2 = new Array();
  let p3 = new Array();
  let tisch = new Array();
  let tisch2 = new Array();
  temp = Math.round(hourlyGoal);
  halfHour = Math.round(hourlyGoal)/2;
  for (let i = 0; i < 3; i++) {
    
    yValuesP1[i] = (temp);
    p1.push(temp/2);
    tisch.push(temp);
    tisch2.push(temp/2);
    temp = temp + hourlyGoal;
  }
  
  p1.unshift(0);
  yValuesP1.unshift(0);
  tisch.push(temp-hourlyGoal);
  tisch2.push(temp/2);
  
  for (let i = 0; i < 4; i++) {
    
    
    yValuesP2[i] = (temp);
    p2.push(temp/2);
    tisch.push(temp);
    tisch2.push(temp/2);
    temp = temp + hourlyGoal;
  }
  
  tisch.push(temp-hourlyGoal);
  p2.unshift(null,null,null,null,p1[3]);
  yValuesP2.unshift(null,null,null,null,yValuesP1[3]);
  yValuesP2[8] = yValuesP2[8] - halfHour;

  for (let i = 0; i < 4; i++) {
    p3.push(temp/2);
    yValuesP3[i] = (temp);
    tisch.push(temp);
    tisch2.push(temp/2);
    temp = temp + halfHour;
    }
    document.getElementById("test").innerHTML = tisch2.toString();
    p3.unshift(null,null,null,null,null,null,null,null,null,p2[8]);
  yValuesP3.unshift(null,null,null,null,null,null,null,null,null,yValuesP2[8]);
  yValuesP3[10] = yValuesP3[10] - halfHour;
  tisch.unshift(0);
  tisch2.unshift(0);
  
  //document.getElementById("test").innerHTML = tisch.toString();


  if (this.chart && this.chart != null) {
    this.chart.destroy()
  }
 this.chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      label: 'P1', 
      borderColor: "red",
      fill: false,
      data: yValuesP1,
      lineTension:0
    }, { 
      label: 'P2',
      data: yValuesP2,
      borderColor: "green",
      fill: false
    }, { 
      label: 'P3',
      data: yValuesP3,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    tooltips:{
      mode: 'index',
      intersect: false
    },
    hover:{
      mode: 'index',
      intersect: false
    },
    legend: {display: true},
    scales: {
        yAxes:[{ticks: {min: 0, max: temp + 1000}}]
    }
  }
});

for (i = 0; i < times.length; i++){
  $('#addr'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>");

  $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
}




if (this.chart1 && this.chart1 != null) {
  this.chart1.destroy()
}
this.chart1 = new Chart("pdRate", {
type: "line",
data: {
  labels: xValues,
  datasets: [{
    label: 'P1', 
    borderColor: "red",
    fill: false,
    data: p1,
    lineTension:0
  }, { 
    label: 'P2',
    data: p2,
    borderColor: "green",
    fill: false
  }, { 
    label: 'P3',
    data: p3,
    borderColor: "blue",
    fill: false
  }]
},
options: {
  tooltips:{
    mode: 'index',
    intersect: false
  },
  hover:{
    mode: 'index',
    intersect: false
  },
  legend: {display: true},
  scales: {
      yAxes:[{ticks: {min: 0, max: temp + 1000}}]
  }
}
});

for (i = 0; i < times.length; i++){
  $('#addr2'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch2[i]) +"</> </td>");

  $('#tab_logic2').append('<tr id="addr2'+(i+1)+'"></tr>');
}


}
