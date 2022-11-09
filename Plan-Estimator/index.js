function tog() {
  var checkBox = document.getElementById("toggle");
  if(checkBox.checked ==  false){
    calcDay();
    //document.getElementById("test").innerHTML = tisch[12];
  } else {
    calcNight();
    //document.getElementById("test").innerHTML = y23;
  }
}






function calcDay() {
  
  var vendor = document.getElementById('vGoal').value;
  var pallet = document.getElementById('pGoal').value;
  
 //set array for the x values in the graph 
  var xValues = ["07:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  var times = ["07:00", "08:00", "09:00", "10:00", "10:30", "11:30", "12:30", "01:30", "02:00", "03:00", "04:00", "05:00", "05:30"];
  timeArray = [],
    d = new Date(),
    h = 7,
    m = 00,
    meridiem = ['AM','PM'];
for (var i = h; i < 18; ++i) {
    for (var j = i==h ? (m/1) : 0; j < 60; ++j) { 
        timeArray.push(i%12 + ':' + (j<10?'0' + j*1 : j*1||'00') + ' ' + meridiem[i/12|0] + ' ');
        
    }
}

  // creates the arrays that are going to be used for the datasets
  //these are the arrays for the overall vendor goal
  let yValuesP1 = new Array(3);
  let yValuesP2 = new Array(3);
  let yValuesP3 = new Array(3);
  //these are the arrays for the PID/Dock
  let p1 = new Array();
  let p2 = new Array();
  let p3 = new Array();
  //these are the arrays for the pallet goal
  let pg1 =  new Array();
  let pg2 =  new Array();
  let pg3 = new Array();
  //these are the arrays for the data tables tisch is the vendor goal and tisch2 is the PID/Dock
  let tisch = new Array();
  let tisch2 = new Array();
  //variables to calculate the hourly goal and round the int
  phourlyGoal = Math.round(pallet/9.5);
  phourlyTemp = Math.round(phourlyGoal);
  hourlyGoal= Math.round(vendor/9.5);
  temp = Math.round(hourlyGoal);
  halfHour = Math.round(hourlyGoal)/2;

  // there are three sets of for loops that represent each period.  
  minGoal = hourlyGoal/60;

  
i = 0;
   let y23 = new Array();
   let newMinGoal = new Array();
   temp = 0;
   takeBreak = y23[0] * 30;
    while(i <= 630 ){
      if(i > 180 && i < 210 || i > 390 && i < 420){
        y23.push("NaN");
      }

      else{
        y23.push(minGoal + temp);
        temp = temp + minGoal;
         
      }
      i= i+1;
      
      
    }
    newTisch = 0;
    tisch.push(0);
    for (i = 0; i < times.length; i++){
      if( i == 3 || i ==7){
        tisch.push(tisch[i]);
        j=j+30;
      }
      if(i == 12){
        j=j-30;
        tisch.push(Math.round(y23[j]));
        
      }
      else{
        tisch.push(Math.round(y23[j]));
      j=j+60;
      }
      
      
      $('#addr'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>");
    
      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      //newTisch = (newTisch + hourlyGoal);
      
    }
   
   
    //document.getElementById("test").innerHTML = timeArray.toString();
  if (this.chart && this.chart != null) {
    this.chart.destroy()
  }
 this.chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: timeArray,
    datasets: [{
      label: 'Trend', 
      borderColor: "red",
      fill: true,
      data: y23,
      lineTension:0
    }, 
    ]
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
  $('#addr2'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch2[i]) +"</> </td>" + "<td>"+ (pg1[i]) +"</> </td>");

  $('#tab_logic2').append('<tr id="addr2'+(i+1)+'"></tr>');
  
}

//for (i = 0; i < times.length; i++){
  //$('#addr3'+i).html("<td>"+ (times[i]) +"</td><td>"+ (pg1[i]) +"</> </td>");

 // $('#tab_logic3').append('<tr id="addr3'+(i+1)+'"></tr>');
//}


 


}


function calcNight() {
  
  var vendor = document.getElementById('vGoal').value;
  var pallet = document.getElementById('pGoal').value;
  
 //set array for the x values in the graph 
  var xValues = ["18:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  var times = ["18:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  timeArray = [],
    d = new Date(),
    h = 18,
    m = 00,
    meridiem = ['PM','AM'];
for (var i = h; i < 30; ++i) {
    for (var j = i==h ? (m/1) : 0; j < 60; ++j) { 
        timeArray.push(i%12 + ':' + (j<10?'0' + j*1 : j*1||'00') + ' ' + meridiem[i/24|0] + ' ');
        
    }
}

  // creates the arrays that are going to be used for the datasets
  //these are the arrays for the overall vendor goal
  let yValuesP1 = new Array(3);
  let yValuesP2 = new Array(3);
  let yValuesP3 = new Array(3);
  //these are the arrays for the PID/Dock
  let p1 = new Array();
  let p2 = new Array();
  let p3 = new Array();
  //these are the arrays for the pallet goal
  let pg1 =  new Array();
  let pg2 =  new Array();
  let pg3 = new Array();
  //these are the arrays for the data tables tisch is the vendor goal and tisch2 is the PID/Dock
  let tisch = new Array();
  let tisch2 = new Array();
  //variables to calculate the hourly goal and round the int
  phourlyGoal = Math.round(pallet/9.5);
  phourlyTemp = Math.round(phourlyGoal);
  hourlyGoal= Math.round(vendor/9.5);
  temp = Math.round(hourlyGoal);
  halfHour = Math.round(hourlyGoal)/2;

  // there are three sets of for loops that represent each period.  

  for (let i = 0; i < 3; i++) {
    
    yValuesP1[i] = (temp);
    p1.push(temp/2);
    tisch.push(temp);
    tisch2.push(temp/2);
    temp = temp + hourlyGoal;
    pg1.push(phourlyTemp);
    phourlyTemp = (phourlyTemp + phourlyGoal);
  }
  
  p1.unshift(0);
  yValuesP1.unshift(0);
  tisch.push(temp-hourlyGoal);
  tisch2.push(temp/2 - halfHour);
  pg1.push(phourlyTemp - phourlyGoal);
  
  
  
  for (let i = 0; i < 4; i++) {
    
    
    yValuesP2[i] = (temp);
    p2.push(temp/2);
    tisch.push(temp);
    tisch2.push(temp/2);
    temp = temp + hourlyGoal;
    pg1.push(phourlyTemp);
    phourlyTemp = (phourlyTemp + phourlyGoal);
  }
  
  tisch.push(temp-hourlyGoal);
  tisch2.push(temp/2 - halfHour);
  p2.unshift(null,null,null,null,p1[3]);
  yValuesP2.unshift(null,null,null,null,yValuesP1[3]);
  pg1[7] = phourlyTemp - phourlyGoal - phourlyGoal/2;
  yValuesP2[8] = yValuesP2[8] - halfHour;
  //pg1.push(pg1[8]);
  phourlyTemp = pg1[7];
  //document.getElementById("test").innerHTML = phourlyTemp.toString();


  for (let i = 0; i < 4; i++) {
    p3.push(temp/2);
    yValuesP3[i] = (temp);
    tisch.push(temp);
    tisch2.push(temp/2);
    temp = temp + halfHour;
    pg1.push(phourlyTemp);
    phourlyTemp = (phourlyTemp + phourlyGoal);
    }

    p3.unshift(null,null,null,null,null,null,null,null,null,p2[8]);
  yValuesP3.unshift(null,null,null,null,null,null,null,null,null,yValuesP2[8]);
  yValuesP3[10] = yValuesP3[10] - halfHour;
  tisch.unshift(0);
  tisch2.unshift(0);
  pg1.unshift(0);
  pg1.push("Clean Up");
  
  minGoal = hourlyGoal/60;
i = 0;
   let y23 = new Array();
   let newMinGoal = new Array();
   temp = 0;
   takeBreak = y23[0] * 30;
    while(i <= 630 ){
      if(i > 180 && i < 210 || i > 390 && i < 420){
        y23.push("NaN");
      }

      else{
        y23.push(minGoal + temp);
        temp = temp + minGoal;
         
      }
      i= i+1;
      
      
    }
   
  document.getElementById("test").innerHTML = y23.toString();
  if (this.chart && this.chart != null) {
    this.chart.destroy()
  }
 this.chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: timeArray,
    datasets: [{
      label: 'Trend', 
      fill: true,
      data: y23,
      lineTension:0,
      borderColor: 'rgb(255,0,0)',
      segment: {
        borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0)'),
        borderDash: ctx => skipped(ctx, [6, 6]),
      },

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
  $('#addr2'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch2[i]) +"</> </td>" + "<td>"+ (pg1[i]) +"</> </td>");

  $('#tab_logic2').append('<tr id="addr2'+(i+1)+'"></tr>');
  
}

//for (i = 0; i < times.length; i++){
  //$('#addr3'+i).html("<td>"+ (times[i]) +"</td><td>"+ (pg1[i]) +"</> </td>");

 // $('#tab_logic3').append('<tr id="addr3'+(i+1)+'"></tr>');
//}


 


}

hourlyGoal = 1500;
minGoal = hourlyGoal/60;
i = 0;
   let y23 = new Array();
   let newMinGoal = new Array();
   temp = 0;
    while(i <= 570 ){
      
      y23.push(minGoal + temp);
      
      
      temp = temp + minGoal;
      i= i+1;
      
    }
     document.getElementById("test21").innerHTML = y23.toString();
