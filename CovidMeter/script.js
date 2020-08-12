alert('Stay Healthy,Stay Safe');
fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "a5b36d7f59msh8179324405e09dbp126f6bjsn9c0de00ea8f7"
	}
})
.then(response => {
	return response.json();
}).then(
    function(data){
       // console.log(data.countries_stat.length);
        console.log(data);
        showGraph(data);// calling graph function
        showTables(data);//calling tables function
        maxCases(data);
        maxDeaths(data);
    }
)
.catch(err => {
	console.log(err);
});
let large=0;

function maxCases(data){// calculates max-data
    let index;
    for(let i=0;i<data.countries_stat.length;i++){
        let newcases=convert(data.countries_stat[i].new_cases);
        large=Math.max(large,newcases);
        if(large===newcases){
           index=i;
        }
    }
   // console.log(index);
   // console.log(large);
   var elparent=document.querySelector('nav');
   var el=document.createElement('p');
   el.innerHTML='<h3>Countries With Highest no of Covid Cases Today is '+data.countries_stat[index].country_name+" with a spike of "+data.countries_stat[index].new_cases+' cases Today';
   //el.addClass('warning');
   el.classList.add('warning');
   elparent.appendChild(el);
  
}
large=0;

function maxDeaths(data){
    let index=0;
    for(let i=0;i<data.countries_stat.length;i++){
        let newDeaths=convert(data.countries_stat[i].new_deaths);
        large=Math.max(large,newDeaths);
        if(large===newDeaths){
            index=i;
        }
    }
 
    console.log(index);
    var elparent=document.querySelector('nav');
    var el=document.createElement('p');
    el.innerHTML='<h3>Countries With Highest no of Deaths Today is '+data.countries_stat[index].country_name+" with a death of "+data.countries_stat[index].new_deaths+' people Today';
    el.classList.add('warning');
    elparent.appendChild(el);
}
$('#world-btn').hide();//hiding the world button
$('#table').hide();//hiding the table
$('.btn-success').hide();
$('#hide').hide();//hiding the hide button
$('#data').on('click',function(){
    $('#data').fadeOut();
    $('table').fadeIn();
    $('#world-btn').fadeIn();
    $('.btn-success').fadeIn();
    $('#hide').fadeIn();//show hide button
    
});
$('#hide').on('click',function(){//if hide is clicked
    $('.table').fadeOut();
    $('#data').fadeIn();
    $('#hide').fadeOut();
    $('#world-btn').fadeOut();
    $('.btn-success').fadeOut();//back to top button should be removed
})

function showGraph(data){//plotting chart
    //console.log(data);
var ctx = document.getElementById('myChart').getContext('2d');//bar graph for worst affected 3 countires
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [data.countries_stat[0].country_name,data.countries_stat[1].country_name,data.countries_stat[2].country_name],//countriesName
        datasets: [{
            label: 'Covid-19 cases',
            data: [convert(data.countries_stat[0].cases),convert(data.countries_stat[1].cases), convert(data.countries_stat[2].cases)],//No of cases
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                //'rgba(75, 192, 192, 0.2)',
                //'rgba(153, 102, 255, 0.2)',
                //'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                //'rgba(75, 192, 192, 1)',
                //'rgba(153, 102, 255, 1)',
                //'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var ctx1 = document.getElementById('pieChart').getContext('2d');//recovery chart for 5 countries
var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: [data.countries_stat[0].country_name,data.countries_stat[1].country_name,data.countries_stat[2].country_name,data.countries_stat[3].country_name, data.countries_stat[4].country_name],
        datasets: [{
            label: 'Recovery Rates(in Percentage)',
            data: [recovery(data,0),recovery(data,1),recovery(data,2),recovery(data,3),recovery(data,4)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                //'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                //'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
};
function showTables(data){//inserting tablefunction to plot table
 var parent=document.getElementById('body');
 let i;
 let head='';//developing head of table
 
 head+='<th>Country</th>';
 head+='<th>Cases</th>';
 head+='<th>Deaths</th>';
 head+='<th>Recovered</th>';//first commit till here
 head+='<th>New Cases</th>';
 head+='<th>Active Cases</th>';
 head+='<th>New Deaths</th>';
 head+='<th>Tests/1M</th>';
 head+='<th>Cases/1M</th>';

 document.getElementById('heading').innerHTML=head;
//parent.innerHTML=head;
 let newRow='';//developing body of table
 for(i=0;i<data.countries_stat.length;i++)
 {
     newRow+='<tr>';
     newRow+='<td>';
     newRow+=data.countries_stat[i].country_name;
     newRow+='</td>';
     newRow+='<td>';
     newRow+=data.countries_stat[i].cases;
     newRow+='</td>';
     newRow+='<td>';
     newRow+=data.countries_stat[i].deaths;
     newRow+='</td>';
     newRow+='<td>';
     newRow+=data.countries_stat[i].total_recovered;
     newRow+='</td>';    
     newRow+='<td>';
     newRow+=data.countries_stat[i].new_cases;
     newRow+='</td>';    
     newRow+='<td>';
     newRow+=data.countries_stat[i].active_cases;
     newRow+='</td>';    
     newRow+='<td>';
     newRow+=data.countries_stat[i].new_deaths;
     newRow+='</td>';    
     newRow+='<td>';
     newRow+=data.countries_stat[i].tests_per_1m_population;
     newRow+='</td>';    
     newRow+='<td>';
     newRow+=data.countries_stat[i].total_cases_per_1m_population;
     newRow+='</td>';        
     newRow+='</tr>';
    parent.innerHTML=newRow;
 }
 newRow='';//developing footer
  newRow+='<tr>'
  newRow+='<td>';
  newRow+='TOTAL';
  newRow+='</td>';   
  newRow+='<td>';
  newRow+=data.world_total.total_cases;
  newRow+='</td>'; 
  newRow+='<td>';
  newRow+=data.world_total.total_deaths;
  newRow+='</td>'; 
  newRow+='<td>';
  newRow+=data.world_total.total_recovered;
  newRow+='</td>'; 
  newRow+='<td>';
  newRow+=data.world_total.new_cases;
  newRow+='</td>'; 
  newRow+='<td>';
  newRow+=data.world_total.active_cases;
  newRow+='</td>'; 
  newRow+='<td>';
  newRow+=data.world_total.new_deaths;
  newRow+='</td>'; 
  document.getElementById('world').innerHTML=newRow;

}
function convert(val){// function to convert string to int
    let ans;
    let i;
    for(i=0;i<val.length;i++)
    {
        if(val[i]===',')
        {
            continue;
        }
        else
        {
            if(ans===undefined)
            {
                ans=val[i];
            }
            else
            {
                ans+=val[i];
            }
        }
    }
    return parseInt(ans);
}
function recovery(data,i){ //function to calculate percentage
    var a=parseInt(convert(data.countries_stat[i].cases));//total cases
    var b=parseInt(convert(data.countries_stat[i].total_recovered));//total recovered
    console.log((b/a*100).toFixed(2));
    return ((b/a*100).toFixed(2));

}