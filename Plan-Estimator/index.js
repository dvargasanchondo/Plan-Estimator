function calc() {
  
  var vendor = document.getElementById('vGoal').value;
  hourlyGoal= Math.round(vendor/9.5);
  
  var xValues = ["18:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  var times = ["18:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  let yValuesP1 = new Array(3);
  let yValuesP2 = new Array(3);
  let yValuesP3 = new Array(3);
  let tisch = new Array();
  temp = Math.round(hourlyGoal);
  halfHour = Math.round(hourlyGoal)/2;
  for (let i = 0; i < 3; i++) {
    
    
    yValuesP1[i] = (temp);
    tisch.push(temp);
    temp = temp + hourlyGoal;
  }
  tisch.push(temp);
  yValuesP1.unshift(0);
  
  for (let i = 0; i < 4; i++) {
    
    
    yValuesP2[i] = (temp);
    tisch.push(temp);
    temp = temp + hourlyGoal;
  }
  tisch.push(temp);
  yValuesP2.unshift(null,null,null,null,yValuesP1[3]);
  yValuesP2[8] = yValuesP2[8] - halfHour;

  for (let i = 0; i < 4; i++) {
    yValuesP3[i] = (temp);
    tisch.push(temp);
    temp = temp + halfHour;
    }

  yValuesP3.unshift(null,null,null,null,null,null,null,null,null,yValuesP2[8]);
  yValuesP3[10] = yValuesP3[10] - halfHour;
  tisch.unshift(0);
  
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

}
