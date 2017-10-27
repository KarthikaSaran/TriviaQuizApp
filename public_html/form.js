/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global URL */
var j=0;
let headers = new Headers();
   headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:8383');
 var data;  
 var category='9';
 var level='easy';

    var ans ="";
    var score =0;
    var sec = 60;
    var inter ="";
    var firstname,lastname,mailid,phone;
function myfunc(res){
   data = res;
   
    firstname = document.getElementById("fn").value;
    lastname = document.getElementById("ln").value;
    mailid = document.getElementById("mi").value;
    phone = document.getElementById("pn").value;
     
    
    
   
    document.getElementById("details").style.position="absolute";
    document.getElementById("details").style.left="-999999px";
    
     document.title = "Trivia Quiz";
     document.getElementById("ques").style.visibility="visible";
    
     setQues(j);
     timer();
 
 
    
  
    }
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setQues(j){
    
   var res = data[j];
     var correct = res["correct_answer"];
     ans = correct;
     var incorrect = res["incorrect_answers"]
     var options = incorrect.concat(correct);
     options = shuffleArray(options);
     document.getElementById("ques1").innerHTML =res["question"];
     for(i=1;i<=4;i++){
     document.getElementById("o"+i.toString()).value =options[i-1];
     document.getElementById("o"+i.toString()).innerHTML =options[i-1];
     document.getElementById("lo"+i.toString()).innerHTML =options[i-1];
     document.getElementById("o"+i.toString()).checked =false;
 } 
}

function next()
{
    
    for (var i = 1; i <=4; i++) {
              if (document.getElementById("o"+i.toString()).checked){
                  val = document.getElementById("o"+i.toString()).value;
                 if(val===ans)
                     score = score+1;
              }
          }
    console.log(score);
    j=j+1;
    if(j<10)
        setQues(j);
    if(j===10){
        clearInterval(inter);
         var msg = "<div style='align:left'><h2 style='color:white'> Trivia Quiz Results </h2><h3 style='color:red'>Congratulations <span style='color:blue'>"+firstname+" " +lastname+"!!!</span></h3><span style='color:#4B0082'> Your score is "+score+"/10</span></div>";
         document.getElementById("ques").innerHTML=msg;
        
    }

}

function timer()
{
    
        inter = setInterval(function() {
            
		sec = sec- 1;
		if (sec <= 0) {
                    clearInterval(inter);
                    var msg = "<div style='align:left;color:green;'> <h2 style='color:white'>Trivia Quiz Results </h2> Time Up !<hr><h3 style='color:red'>Congratulations <span style='color:blue'>"+firstname+" " +lastname+"!!!</span></h3><hr><span style='color:#4B0082'> Your score is "+score+"/10</span><hr></div>";
			document.getElementById("ques").innerHTML=msg;
                       
            }
                else
                    document.getElementById("counter").innerHTML = sec;
                
	}, 1000);
   
}



function fetchurl(){
   
    for (var i = 1; i <=4; i++) {
              if (document.getElementById("sel"+i.toString()).selected)
                  category = document.getElementById("sel"+i.toString()).value;}
    for (var i = 1; i <=3; i++) {         
           if (document.getElementById("l"+i.toString()).selected)
                  level = document.getElementById("l"+i.toString()).value;}
              
    var url = 'https://opentdb.com/api.php?amount=20&category='+category+'&difficulty='+level+'&type=multiple';
 
        fetch(url).then(function(response) {
	var resp =  response.json();
        var str1 = resp.toString();
        var res;
        resp.then(function(data){ res = data["results"]; myfunc(res);});
   
}).catch(function(err) {
    console.log(err);
});

}

  