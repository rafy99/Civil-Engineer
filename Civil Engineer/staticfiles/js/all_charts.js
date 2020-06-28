
  var xlabels = [];    // x-axies
  var ydata = [];      // planned data y-axies
  var yactual=[];      // actual data y-axies
  var workerdata = [];
  var leveldata = [] ;






    async function getData() {
      const response = await fetch(api_url);
      const data = await response.json();
      const sortedData_deadline = data.slice().sort(function (a, b) {
  // '2014-03-01/'.split('-')
  // gives ["2014", "03", "1"]
  a = a.deadline.split('-');
  b = b.deadline.split('-');
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2] ;
});



  const sortedData_finished = data.slice().sort(function (a, b) {
  // '2014-03-01/'.split('-')
  // gives ["2014", "03", "1"]
  if(a.finished == null || b.finished == null)
  {
    if(a.finished == null && b.finished != null)
    {
        b = b.finished.split('-');
      return 0-b[0] || 0-b[1] || 0-b[2];
    }
    else if(a.finished != null && b.finished == null)
    {
      a = a.finished.split('-');
      return a[0]-0 || a[1]-0 || a[2]-0;
    }
    else {
      return 0-0;
    }
  }
  else{
  a = a.finished.split('-');
  b = b.finished.split('-');
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2] ;
  }
});


const sortedData_level = data.slice().sort(function (a, b) {
// '2014-03-01/'.split('-')
// gives ["2014", "03", "1"]
a = a.level;
b = b.level;
return a - b  ;
});

      //----------------------------------------------------------------
      //console.log(sortedData_deadline);
      //console.log(sortedData_finished);
      //console.log(sortedData_level);
      //console.log(data);

      //----------------------------------------------------------------



      var month_years = [];
      var months = [];
      var months_duplicate = [];
      var years = [] ;
      var year_temp = false;
      var years_duplicate = [];
      var count_deadline_length = sortedData_deadline.length;      // y- axies this will change after time
      var count_finished_length = sortedData_finished.length;
      var level_duplicate ;
      var count = 1;
      var month_checker = [];                                           // to make (n) duplicate
      //***************************************************************************************************************************
      //***************************************** END **********************************************************
      //*************************************************************************************************************************** -
      //------------------------sortedData_deadline ---------------------------------

      for(var i=0 ;i<sortedData_deadline.length;i++){
        const cols_deadline = sortedData_deadline[i].deadline.split('-');
        years =cols_deadline[0];
        month = cols_deadline[1];
        month_checker  = cols_deadline[1];
        if( month_checker.split('0')!=null) // probability there is 1 0 or 0 3
        {
          month_checker = month_checker.split('0');
          if(month_checker[0] === "")
          {
              month = month_checker[1];
          }
          else {
            month = month ;
          }
        }
        month_years = month+"/"+years ;
        // -------push 0 in x- axies  and number of operation in y - axies if i == 0 --------


        if (i == 0)
        {
          xlabels.push(0);
          ydata.push(parseFloat(sortedData_deadline.length));
          for(var ix = 1 ; ix< parseFloat(month);ix++)
          {
            xlabels.push(ix +"/"+years);
            ydata.push(parseFloat(sortedData_deadline.length));
          }

        }
        //-----------------------check for month deplicate-----------------------------------
        var j = i + 1 ;
        if (j < sortedData_deadline.length) {
          const cols_deadline2 = sortedData_deadline[j].deadline.split('-');
          months_duplicate = cols_deadline2[1];
          years_duplicate = cols_deadline2[0];

          {
            if(parseFloat(years) === parseFloat(years_duplicate))
            {
              if (parseFloat(month) === parseFloat(months_duplicate)){
                count = count + 1;
                console.log(count);
               }
              year_temp = true;
              if(parseFloat(month) == parseFloat(months_duplicate) -1)
              {
                xlabels.push(month_years);
                ydata.push(parseFloat(count_deadline_length = count_deadline_length - count)); //cannot subtract must stored in varaiable let count_deadline.length sortedData_deadline.length
                count = 1;
              }
              else{
                // for i = 5 < 7
                for(var i_3 = parseFloat(month) ; i_3< parseFloat(months_duplicate);i_3++)
                {
                  if(i_3 == parseFloat(month))
                  {
                    xlabels.push(month_years);
                    ydata.push(parseFloat(count_deadline_length = count_deadline_length - count));
                  }
                  else{
                    xlabels.push(i_3+"/"+years);
                    ydata.push(parseFloat(count_deadline_length));
                    count = 1;
                  }
                }
              }
            }
            else{ // if years are not equal
              year_temp = false;
              for(var i_3 = parseFloat(month) ; i_3< parseFloat(13) ;i_3++)
              {
                if(i_3 == parseFloat(month))
                {
                  xlabels.push(month_years);
                  ydata.push(parseFloat(count_deadline_length = count_deadline_length - count));

                }
                else{
                  xlabels.push(i_3+"/"+years);
                  ydata.push(parseFloat(count_deadline_length));
                  count = 1;
                }
              }
              for(var i_3 = 1 ; i_3< parseFloat(months_duplicate) ;i_3++)
              {
                  xlabels.push(i_3+"/"+(parseFloat(years)+1));
                  ydata.push(parseFloat(count_deadline_length));
                  count = 1;
              }


            }
          }
        }
                //console.log(parseFloat(cols_deadline[1]));
      }
      //----------------to push last element in x- axies and y - axies(planned)----------------------------------
      xlabels.push(month_years);
      ydata.push(parseFloat(count_deadline_length = count_deadline_length - count)); //cannot subtract must stored in varaiable let count_deadline.length sortedData_deadline.length
      count = 1;
      //***************************************************************************************************************************
      //***************************************** END **********************************************************
      //***************************************************************************************************************************

      //-----------------show xlabel and  y-axies (planned) data in console -------------------------------------------
      console.log(xlabels);
      console.log(ydata);
      console.log("---------------------------------------------------------------------");
    //  console.log(xlabels);
      //***************************************************************************************************************************
      //***************************************** END **********************************************************
      //***************************************************************************************************************************
    //------------------------sortedData_finished (yactual)---------------------------------
    var count_finished_length = sortedData_finished.length;
    var x_loop = 0 ;

    for(var i=0 ;i<sortedData_finished.length;i++){
      // -------push number of operation in y - axies if i == 0 --------
      /*if (i == 0)
      {
          yactual.push(parseFloat(sortedData_finished.length))
      }*/
      if(sortedData_finished[i].finished == null)
      {
        continue;
      }

      else {
        const cols_finished = sortedData_finished[i].finished.split('-');
        month = cols_finished[1];
        years =cols_finished[0];

        while(x_loop < xlabels.length)
        {
          if(x_loop == 0)
          {
            yactual.push(parseFloat(sortedData_finished.length))
            x_loop++ ;
            continue ;
          }
          else {
            mm_yy = xlabels[x_loop].split("/");
            if(years == mm_yy[1])
            {
                if(parseFloat(mm_yy[0]) < parseFloat(month))
                {
                  yactual.push(parseFloat(count_finished_length));
                  x_loop++;
                }
                else if (parseFloat(mm_yy[0]) === parseFloat(month)){
                  break;
                }
            }
            else {
              break;
            }
          }
        }
        //-----------------------check for month deplicate-----------------------------------
        var month_2 ;
        var j = i + 1 ;
        if (j < sortedData_finished.length) {
          const cols_deadline2 = sortedData_finished[j].finished.split('-');
          months_duplicate = cols_deadline2[1];
          years_duplicate = cols_deadline2[0];

           {
            if(years === years_duplicate)
            {
              if (parseFloat(month) === parseFloat(months_duplicate)){
                count = count + 1;
                console.log(count);
               }
              if(parseFloat(month) == parseFloat(months_duplicate) -1)
              {
                yactual.push(parseFloat(count_finished_length = count_finished_length - count)); //cannot subtract must stored in varaiable let count_deadline.length sortedData_deadline.length
                x_loop++;
                count = 1;
              }
              else{
                // for i = 5 < 7
                for(var i_3 = parseFloat(month) ; i_3< parseFloat(months_duplicate);i_3++)
                {
                  if(i_3 == parseFloat(month))
                  {
                    yactual.push(parseFloat(count_finished_length = count_finished_length - count));
                    x_loop++;
                  }
                  else{
                    yactual.push(parseFloat(count_finished_length));
                    x_loop++;
                    count = 1;
                  }
                }
              }
            }
            else{ // if years are not equal

              for(var i_3 = parseFloat(month) ; i_3< parseFloat(13) ;i_3++)
              {
                if(i_3 == parseFloat(month))
                {
                  yactual.push(parseFloat(count_finished_length = count_finished_length - count));
                  if(x_loop == xlabels.length-1)
                  {
                    const colss = xlabels[x_loop].split('/');
                    const new_month = (parseFloat(colss[0])+1);
                    xlabels.push("0"+new_month+"/"+parseFloat(years_duplicate));
                  }
                  x_loop++;

                }
                else{
                  yactual.push(parseFloat(count_finished_length));
                  if(x_loop == xlabels.length-1)
                  {
                    const colss = xlabels[x_loop].split('/');
                    const new_month = (parseFloat(colss[0])+1);
                    xlabels.push("0"+new_month+"/"+parseFloat(years_duplicate));
                  }
                  x_loop++;
                  count = 1;
                }
              }
              for(var i_3 = 1 ; i_3< parseFloat(months_duplicate) ;i_3++)
              {
                  yactual.push(parseFloat(count_finished_length));
                  if(x_loop == xlabels.length-1)
                  {
                    const colss = xlabels[x_loop].split('/');
                    const new_month = (parseFloat(colss[0])+1);
                    xlabels.push("0"+new_month+"/"+parseFloat(years_duplicate));
                  }
                  x_loop++;
                  count = 1;
              }
              /*yactual.push(parseFloat(count_finished_length = count_finished_length - count)); //cannot subtract must stored in varaiable let count_deadline.length sortedData_deadline.length
              count = 1;*/

            }
          }
        }
      }
              //console.log(parseFloat(cols_deadline[1]));
    }
    yactual.push(parseFloat(count_finished_length = count_finished_length - count)); //cannot subtract must stored in varaiable let count_deadline.length sortedData_deadline.length
    count = 1;
    x_loop++;
    console.log(yactual)

    //***************************************************************************************************************************
    //***************************************** END **********************************************************
    //***************************************************************************************************************************

    var count_null = 0;

      for(var i=0 ;i<sortedData_level.length;i++){
        const cols_level = sortedData_level[i].level;
        currentlevel = cols_level;
        //-----------------------check for level deplicate-----------------------------------
        var j = i + 1;

        if (j < sortedData_level.length) {
          const cols_level2 = sortedData_level[j].level;
          level_duplicate = cols_level2;

         if (currentlevel === level_duplicate){
           count = count + 1;
           if(sortedData_level[i].finished == null)
           {
             count_null = count_null + 1 ;
           }
           console.log(count);
          }
          else {

              if(parseFloat(currentlevel) == parseFloat(level_duplicate) -1)
              {
                if(sortedData_level[i].finished == null)
                {
                  count_null = count_null + 1 ;
                }
                //  leveldata        =              [l1,l2,l3,l4,.....,l9]
                leveldata[currentlevel-1] =parseFloat(((count - count_null)/count)*100);
                count = 1;
                count_null = 0 ;
              }
              else{

                if(sortedData_level[i].finished == null)
                {
                  count_null = count_null + 1 ;
                }
                //  leveldata        =              [l1,l2,l3,l4,.....,l9]
                leveldata[currentlevel-1] =parseFloat(((count - count_null)/count)*100);
                count = 1;
                count_null = 0 ;
              }



          }
        }
                //console.log(parseFloat(cols_deadline[1]));
      }
      //----------------to push last element in x- axies and y - axies(planned)----------------------------------
        if(sortedData_level[sortedData_level.length-1].finished == null)
        {
          count_null = count_null + 1 ;
        }
        leveldata[currentlevel-1] =parseFloat(((count - count_null)/count)*100); //cannot subtract must stored in varaiable let count_deadline.length sortedData_deadline.length
        count = 1;
        count_null = 0 ;

        //***************************************************************************************************************************
        //***************************************** END **********************************************************
        //***************************************************************************************************************************
      var Type1 = 0,Type2=0,Type3 =0 ;
      var op ;
      i_point = (yactual.length-1);
      j_point= i_point - 1;

      if(parseFloat(yactual[j_point])-parseFloat(yactual[i_point])===0)
      {
        workerdata = [0,0,0];
      }
      else{
        op = parseFloat(yactual[j_point])-parseFloat(yactual[i_point]);
        const cols = xlabels[i_point].split('/');
        //cols[0]= month cols[1]= year
        for(var i=0 ;i<sortedData_finished.length;i++){
          if(sortedData_finished[i].finished==null)
          {
            continue;
          }
          else{
            const cols_deadline2 = sortedData_finished[i].finished.split('-');
            months_duplicate = cols_deadline2[1];
            years_duplicate = cols_deadline2[0];
            if(parseFloat(cols[1]) === parseFloat(years_duplicate)){
              if(parseFloat(cols[0])===parseFloat(months_duplicate))
              {

                const type_check = sortedData_finished[i].worker_type;
                if(type_check == "plumber")

                {
                  Type1++;
                }
                else if (type_check == "painter")
                {
                  Type2++;
                }else if(type_check == "cleaner")
                {
                  Type3++;
                }
              }

            }
          }
        }
      }
      workerdata = [Type1,Type2,Type3];
      Type1 = 0;
      Type2 = 0;
      Type3 = 0;
      //----------------------------------------------------------------
      console.log(yactual);
      //console.log(sortedData_deadline);
      //console.log(sortedData_finished);
      //console.log(sortedData_level);
      //console.log(data);

      //----------------------------------------------------------------

      //***************************************************************************************************************************
      //***************************************** END **********************************************************
      //***************************************************************************************************************************


}


    var chart1 ;


    async function chart(){
      await getData();
        var ctx = document.getElementById('myChart').getContext('2d');
        Chart.defaults.global.defaultFontFamily='lato';
        Chart.defaults.global.defaultFontSize=18;
        Chart.defaults.global.defaultFontColor='#777';
        var myChart1 = new Chart(ctx, {
            type: 'line',
            data: {
                labels:xlabels,
                datasets: [{
                    label: 'Planned',
                    data: ydata,
                    fill :false,
                    backgroundColor:'gradientFill',
                    borderColor: ['rgba(255, 99, 132, 1)'], // red
                    borderWidth: 2,
                    pointBackgroundColor: "red"

                },{
                    label: 'Actual',
                    data: yactual,
                    fill :false,
                    backgroundColor:'gradientFill',
                    borderColor: ['#1d8cf8'],
                    borderWidth: 2,
                    pointBackgroundColor: "#1d8cf8"

                  }]
            },
            options: {

              legend: {
                display:true,
                position:'right',
                  labels: {
                      fontColor: "white",
                      fontSize: 18,

                  }
                },
                title: {
                  display:true,
                  text:'Performance',
                  fontColor: "white",
                  fontSize:25
                },
                scales: {
                    yAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'Number of operations'
                      },
                        ticks: {
                          fontColor: "white",
                            fontSize: 14,
                            //stepSize: 10,         //--- need modifyication
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'month / year'
                      },
                      ticks: {
                          fontColor: "white",
                          fontSize: 14,
                          stepSize: 1,
                          beginAtZero: true
                      }
                    }]
                }
            }
          });

          chart1 = myChart1 ;


          var ctx3 = document.getElementById('myBarChart').getContext('2d');
          Chart.defaults.global.defaultFontFamily='lato';
          Chart.defaults.global.defaultFontSize=18;
          Chart.defaults.global.defaultFontColor='#777';
          var gradient = ctx.createLinearGradient(900,0,0,0);
          gradient.addColorStop(1, "rgb(89.4, 0, 20)");
          gradient.addColorStop(0.7, 'red');
          gradient.addColorStop(0.6, 'red');
          gradient.addColorStop(0.4,"rgb(255, 99, 132)");
          gradient.addColorStop(0.3,"rgb(255, 99, 132)");
          gradient.addColorStop(0.2,"rgb(255, 99, 132)");
          gradient.addColorStop(0.1,"rgb(255, 99, 132)");
          gradient.addColorStop(0.0, 'green');

          var myChart3 = new Chart(ctx3, {
              type: 'horizontalBar',
              data: {
                //labels:["level_1","level_2","level_3","level_4"],
                  labels:["level_1","level_2","level_3","level_4","level_5","level_6","level_7","level_8","level_9","level_10"],
                  datasets: [{
                      label: 'level progress',
                      data: leveldata,
                      fill :true,
                      backgroundColor: gradient,
                      borderColor: gradient
                      //backgroundColor: ["#0000FF","#e6e6fa","#ff0000","#101010","#FFFF00","#00FFFF","#800000","#00FF00","#660066",]


                      ,borderWidth: 2,

                  }]
              },
              options: {

                legend: {
                  display:false,
                  position:'right',
                    labels: {
                        fontColor: "white",
                        fontSize: 18,

                    }
                  },
                  title: {
                    display:true,
                    text:'Levels Progress',
                    fontColor: "white",
                    fontSize:25
                  },
                  scales: {
                      yAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Levels'
                        },
                          ticks: {
                            fontColor: "white",
                              fontSize: 14
                          }
                      }],
                      xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Percentage'
                        },
                        ticks: {
                            fontColor: "white",
                            fontSize: 14,
                            callback: function(tick)
                            {
                                return tick.toString() + '%';
                              },
                            beginAtZero: true
                        }
                      }]
                  }
              }
            });






          var ctx2 = document.getElementById('myChart2').getContext('2d');      //--- need modifyication
          Chart.defaults.global.defaultFontFamily='lato';
          Chart.defaults.global.defaultFontSize=18;
          Chart.defaults.global.defaultFontColor='#777';
          var myChart2 = new Chart(ctx2, {
              type: 'doughnut',
              data: {
                  labels:["Plumber","Painter","Cleaner"],
                  datasets: [{
                      label: 'Work of workers',
                      data: workerdata,
                      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                      //backgroundColor: ["#0000FF","#e6e6fa","#ff0000","#101010","#FFFF00","#00FFFF","#800000","#00FF00","#660066",]
                    }]
              },
              options: {


                legend: {
                  display:true,
                  position:'right',
                    labels: {
                        fontColor: "white",
                        fontSize: 18,

                    }
                  },
                  title: {
                    display:true,
                    text:'Last Month Work',
                    fontColor: "white",
                    fontSize:25
                  },

              }
            });

      }
      chart();
      function setValues(){
        chart1.data.labels.shift();
        chart1.data.datasets[0].data.shift();
        chart1.data.datasets[1].data.shift();
        console.log("updatefunction working");
        chart1.update();
      }
