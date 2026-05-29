var deadline = new Date("oct 23, 2025 23:59:59").getTime();
var x = setInterval(function(){
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor (t /(1000*60*60*24));
    var hours = Math.floor ((t %(1000*60*60*24)/(1000*60*60)));
    var minutes = Math.floor ((t %(1000*60*60)/(1000*60)));
    var seconds = Math.floor ((t %(1000*60)/(1000)));
    document.getElementById("day").innerHTML = days;
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    if (t <0) {
        clearInterval (x);
        document.getElementById("demo").innerHTML = "TIMES UP";
        document.getElementById("day").innerHTML = '0';
        document.getElementById("hour").innerHTML = '0';
        document.getElementById("minutes").innerHTML = '0';
        document.getElementById("seconds").innerHTML = '0';
    }
},1000)