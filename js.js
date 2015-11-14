var a = ["&gt;&gt; ", "a = [ 1 2 3 4 5 5 6 7 8 9]<br>","ans = <br>&nbsp;&nbsp;&nbsp;&nbsp;1 2 3 4 5 5 6 7 8 9<br>" , "&gt;&gt; ", "a+1<br>", "ans = <br>&nbsp;&nbsp;&nbsp;&nbsp;2 3 4 5 5 6 7 8 9 10<br>", "&gt;&gt; "]
var count = 0;

function cycle(){
    count++;
    count %= a.length;
    var commandparagraph = document.querySelector("#iowindow");
    var str = "";
    console.log(count);
    console.log(a.length);
    for ( var i = 0 ; i <= count ; i++){
	str += a[i] ;
	commandparagraph.innerHTML = str;
    }
}

var cb = setInterval(cycle, 1000);
