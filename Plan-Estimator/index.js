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
  var trans = document.getElementById('tGoal').value;
  
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
  let tTisch = new Array();
  //variables to calculate the hourly goal and round the int
  phourlyGoal = Math.round(pallet/9.5);
  phourlyTemp = Math.round(phourlyGoal);
  hourlyGoal= (vendor/9.5);
  halfHour = Math.round(hourlyGoal)/2;

  // there are three sets of for loops that represent each period.  
  minGoal = hourlyGoal/60;

  
  i = 0;
   let y23 = new Array();
   temp = 0;
   takeBreak = y23[0] * 30;
    while(i <= 630){
      
      if(i > 180 && i < 209 || i > 390 && i < 420){
        y23.push("NaN");
      }
      else if(i == 180 || i == 210 || i == 390 || i == 420){
         y23.push(Math.floor(minGoal + temp));
        
      }

      else{
        temp = temp + minGoal;
        y23.push(temp);
        
         
      }
      i = i+1; 
    }

    thourlyGoal = (trans/9.5);
    tminGoal = thourlyGoal/60;
    i = 0;
   let y24 = new Array();
   tTemp = 0;
   takeBreak = y24[0] * 30;
    while(i <= 630){
      
      if(i > 180 && i < 209 || i > 390 && i < 420){
        y24.push("NaN");
      }
      else if(i == 180 || i == 210 || i == 390 || i == 420){
         y24.push(Math.floor(tminGoal + tTemp));
        
      }

      else{
        tTemp = tTemp + tminGoal;
        y24.push(tTemp);
        
         
      }
      i = i+1; 
    }

    newTisch = 0;
    tisch.push(0);
    tTisch.push(0);
    for (i = 0; i < times.length ; i++){
      if( i == 3 || i ==7){
        tisch.push(tisch[i]);
        tTisch.push(tTisch[i]);
        j=j+30;
        h=h+30;
      }
      else if (i == 11){
        tisch.push(Math.round(y23[630]));
        tTisch.push(Math.round(y24[630]));
        
      }
      else{
        tisch.push(Math.round(y23[j]));
        tTisch.push(Math.round(y24[j]));
        j=j+60;
        h=h+60;
      }
    
      
    
      
      
      $('#addr'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>" + "<td>"+ (tTisch[i]) +"</> </td>");
    
      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      //newTisch = (newTisch + hourlyGoal);
      
    }
   
   
    //document.getElementById("test").innerHTML = tTisch.toString();
  if (this.chart && this.chart != null) {
    this.chart.destroy()
  }
 this.chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: timeArray,
    datasets: [{
      label: 'Vendor Trend', 
      borderColor: "red",
      fill: true,
      data: y23,
      lineTension:0
    }, { 
      label: 'Tranship Trend',
      data: y24,
      borderColor: "blue",
      fill: false
    }
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
  $('#addr2'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>" + "<td>"+ (pg1[i]) +"</> </td>");

  $('#tab_logic2').append('<tr id="addr2'+(i+1)+'"></tr>');
  
}

//for (i = 0; i < times.length; i++){
  //$('#addr3'+i).html("<td>"+ (times[i]) +"</td><td>"+ (pg1[i]) +"</> </td>");

 // $('#tab_logic3').append('<tr id="addr3'+(i+1)+'"></tr>');
//}


 


}


function calcDay() {
  
  var vendor = document.getElementById('vGoal').value;
  var pallet = document.getElementById('pGoal').value;
  var trans = document.getElementById('tGoal').value;
  
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
  let tTisch = new Array();
  //variables to calculate the hourly goal and round the int
  phourlyGoal = Math.round(pallet/9.5);
  phourlyTemp = Math.round(phourlyGoal);
  hourlyGoal= (vendor/9.5);
  halfHour = Math.round(hourlyGoal)/2;

  // there are three sets of for loops that represent each period.  
  minGoal = hourlyGoal/60;

  
  i = 0;
   let y23 = new Array();
   temp = 0;
   takeBreak = y23[0] * 30;
    while(i <= 630){
      
      if(i > 180 && i < 209 || i > 390 && i < 420){
        y23.push("NaN");
      }
      else if(i == 180 || i == 210 || i == 390 || i == 420){
         y23.push(Math.floor(minGoal + temp));
        
      }

      else{
        temp = temp + minGoal;
        y23.push(temp);
        
         
      }
      i = i+1; 
    }

    thourlyGoal = (trans/9.5);
    tminGoal = thourlyGoal/60;
    i = 0;
   let y24 = new Array();
   tTemp = 0;
   takeBreak = y24[0] * 30;
    while(i <= 630){
      
      if(i > 180 && i < 209 || i > 390 && i < 420){
        y24.push("NaN");
      }
      else if(i == 180 || i == 210 || i == 390 || i == 420){
         y24.push(Math.floor(tminGoal + tTemp));
        
      }

      else{
        tTemp = tTemp + tminGoal;
        y24.push(tTemp);
        
         
      }
      i = i+1; 
    }

    newTisch = 0;
    tisch.push(0);
    tTisch.push(0);
    for (i = 0; i < times.length ; i++){
      if( i == 3 || i ==7){
        tisch.push(tisch[i]);
        tTisch.push(tTisch[i]);
        j=j+30;
        h=h+30;
      }
      else if (i == 11){
        tisch.push(Math.round(y23[630]));
        tTisch.push(Math.round(y24[630]));
        
      }
      else{
        tisch.push(Math.round(y23[j]));
        tTisch.push(Math.round(y24[j]));
        j=j+60;
        h=h+60;
      }
    
      
    
      
      
      $('#addr'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>" + "<td>"+ (tTisch[i]) +"</> </td>");
    
      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      //newTisch = (newTisch + hourlyGoal);
      
    }
   
   
    //document.getElementById("test").innerHTML = tTisch.toString();
  if (this.chart && this.chart != null) {
    this.chart.destroy()
  }
 this.chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: timeArray,
    datasets: [{
      label: 'Vendor Trend', 
      borderColor: "red",
      fill: true,
      data: y23,
      lineTension:0
    }, { 
      label: 'Tranship Trend',
      data: y24,
      borderColor: "blue",
      fill: false
    }
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
  $('#addr2'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>" + "<td>"+ (pg1[i]) +"</> </td>");

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
  var trans = document.getElementById('tGoal').value;
  
 //set array for the x values in the graph 
  var xValues = ["07:00", "19:00", "20:00", "21:00", "21:30", "22:30", "23:30", "00:00", "00:30", "01:00", "01:30", "02:30", "03:30", "04:30" ];
  var times = ["06:00", "07:00", "08:00", "09:00", "09:30", "10:30", "11:30", "12:30", "01:00", "02:00", "03:00", "04:00", "04:30"];
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
  let tTisch = new Array();
  //variables to calculate the hourly goal and round the int
  phourlyGoal = Math.round(pallet/9.5);
  phourlyTemp = Math.round(phourlyGoal);
  hourlyGoal= (vendor/9.5);
  halfHour = Math.round(hourlyGoal)/2;

  // there are three sets of for loops that represent each period.  
  minGoal = hourlyGoal/60;

  
  i = 0;
   let y23 = new Array();
   temp = 0;
   takeBreak = y23[0] * 30;
    while(i <= 630){
      
      if(i > 180 && i < 209 || i > 390 && i < 420){
        y23.push("NaN");
      }
      else if(i == 180 || i == 210 || i == 390 || i == 420){
         y23.push(Math.floor(minGoal + temp));
        
      }

      else{
        temp = temp + minGoal;
        y23.push(temp);
        
         
      }
      i = i+1; 
    }

    thourlyGoal = (trans/9.5);
    tminGoal = thourlyGoal/60;
    i = 0;
   let y24 = new Array();
   tTemp = 0;
   takeBreak = y24[0] * 30;
    while(i <= 630){
      
      if(i > 180 && i < 209 || i > 390 && i < 420){
        y24.push("NaN");
      }
      else if(i == 180 || i == 210 || i == 390 || i == 420){
         y24.push(Math.floor(tminGoal + tTemp));
        
      }

      else{
        tTemp = tTemp + tminGoal;
        y24.push(tTemp);
        
         
      }
      i = i+1; 
    }

    newTisch = 0;
    tisch.push(0);
    tTisch.push(0);
    for (i = 0; i < times.length ; i++){
      if( i == 3 || i ==7){
        tisch.push(tisch[i]);
        tTisch.push(tTisch[i]);
        j=j+30;
        h=h+30;
      }
      else if (i == 11){
        tisch.push(Math.round(y23[630]));
        tTisch.push(Math.round(y24[630]));
        
      }
      else{
        tisch.push(Math.round(y23[j]));
        tTisch.push(Math.round(y24[j]));
        j=j+60;
        h=h+60;
      }
    
      
    
      
      
      $('#addr'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>" + "<td>"+ (tTisch[i]) +"</> </td>");
    
      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      //newTisch = (newTisch + hourlyGoal);
      
    }
   
   
    //document.getElementById("test").innerHTML = tTisch.toString();
  if (this.chart && this.chart != null) {
    this.chart.destroy()
  }
 this.chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: timeArray,
    datasets: [{
      label: 'Vendor Trend', 
      borderColor: "red",
      fill: true,
      data: y23,
      lineTension:0
    }, { 
      label: 'Tranship Trend',
      data: y24,
      borderColor: "blue",
      fill: false
    }
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
  $('#addr2'+i).html("<td>"+ (times[i]) +"</td><td>"+ (tisch[i]) +"</> </td>" + "<td>"+ (pg1[i]) +"</> </td>");

  $('#tab_logic2').append('<tr id="addr2'+(i+1)+'"></tr>');
  
}

//for (i = 0; i < times.length; i++){
  //$('#addr3'+i).html("<td>"+ (times[i]) +"</td><td>"+ (pg1[i]) +"</> </td>");

 // $('#tab_logic3').append('<tr id="addr3'+(i+1)+'"></tr>');
//}


 


}

// hourlyGoal = 1500;
// minGoal = hourlyGoal/60;
// i = 0;
//    let y23 = new Array();
//    let newMinGoal = new Array();
//    temp = 0;
//     while(i <= 570 ){
      
//       y23.push(minGoal + temp);
      
      
//       temp = temp + minGoal;
//       i= i+1;
      
//     }
//      document.getElementById("test21").innerHTML = y23.toString();
