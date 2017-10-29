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
var category="";
var level="";
var ans ="";
var score =0;
var sec = 60;
var inter ="";
var data,firstname,lastname,mailid,phone;

function myfunc(res)
{
    data = res;
    document.getElementById("details").style.position="absolute";
    document.getElementById("details").style.left="-999999px";
    document.title = "Trivia Quiz";
    document.getElementById("ques").style.visibility="visible";
    setQues(j);
    timer();
}
    
function shuffleArray(array) 
{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setQues(j)
{
    document.getElementById("num").innerHTML = (j+1).toString();
    var res = data[j];
    var correct = res["correct_answer"];
    ans = correct;
    var incorrect = res["incorrect_answers"]
    var options = incorrect.concat(correct);
    options = shuffleArray(options);
    document.getElementById("ques1").innerHTML =res["question"];
    for(i=1;i<=4;i++)
    {
    document.getElementById("o"+i.toString()).value =options[i-1];
    document.getElementById("o"+i.toString()).innerHTML =options[i-1];
    document.getElementById("lo"+i.toString()).innerHTML =options[i-1];
    document.getElementById("o"+i.toString()).checked =false;
    } 
}

function next()
{   
    for (var i = 1; i <=4; i++) 
    {
        if (document.getElementById("o"+i.toString()).checked)
          {
            val = document.getElementById("o"+i.toString()).value;
           if(val===ans)
               score = score+1;
          }
    }
    j=j+1;
    if(j<20)
        setQues(j);
    if(j===20)
    {
        clearInterval(inter);
        var msg = "<div style='align:center;color:green;'><h2 style='color:white;'> Trivia Quiz Results </h2><h4>Congratulations \n <span style='color:blue'>"+firstname+" " +lastname+"</span></h4><hr><span style='color:#4B0082;'> Your score is "+score+"/20</span><hr>Thank You for taking the quiz<hr><img src='ty.gif' width=200 height=200/></div>";
        document.getElementById("ques").innerHTML=msg;    
    }
    
}

function timer()
{
    inter = setInterval(function() {
    sec = sec- 1;
    if (sec <= 0) 
    {
        clearInterval(inter);
        var msg = "<div style='align:left;color:green;'> <h2 style='color:white'>Trivia Quiz Results </h2> Time Up !<hr><h4>Congratulations !!! \n <span style='color:blue'>"+firstname+" " +lastname+"</span></h4><hr><span style='color:#4B0082'> Your score is "+score+"/20</span><hr>Thank You for taking the quiz<hr><img src='ty.gif' width=200 height=200/></div>";
        document.getElementById("ques").innerHTML=msg;       
    }
    else
        document.getElementById("counter").innerHTML = sec;

    }, 1000);
}

function fetchurl()
{  
    firstname = document.getElementById("fn").value;
    lastname = document.getElementById("ln").value;
    mailid = document.getElementById("mi").value;
    phone = document.getElementById("pn").value;
    if(firstname ==="" | lastname===""|mailid===""|phone===""){ alert("Personal Details cannot be empty");return;}
    if (!/^\d{10}$/.test(phone)) { alert("Phone Number should have 10 digits");return;}
    if(!mailid.includes("@")|!mailid.includes(".")) { alert("Enter a valid mail id");return;}
    for (var i = 1; i <=4; i++) {
        if (document.getElementById("sel"+i.toString()).selected)
            category = document.getElementById("sel"+i.toString()).value;}
    for (var i = 1; i <=3; i++) {         
        if (document.getElementById("l"+i.toString()).selected)
               level = document.getElementById("l"+i.toString()).value;}  
    if(category===""){ alert("Choose the quiz category");return;}
    if(level===""){ alert("Choose the quiz level ");return;}
    var url = 'https://opentdb.com/api.php?amount=20&category='+category+'&difficulty='+level+'&type=multiple';
    try{
        fetch(url).then(function(response) 
        {
        var resp =  response.json();
        var res;
        resp.then(function(data){ res = data["results"]; myfunc(res);});
   
        }).catch(function(err) {console.log(err);});
        }catch(error){console.log(error);}
}

