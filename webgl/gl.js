function shaderFromString(context, source, shadertype){
    var shader = context.createShader(shadertype);
    context.shaderSource(shader, source);
    context.compileShader(shader);
    var status = context.getShaderParameter(shader, context.COMPILE_STATUS);
    if ( !status ) {
	console.log("failed in compilation");
	console.log(
	    context.getShaderInfoLog(shader),
	    context.getShaderInfoLog(shader)
	);
    }else{
	//console.log("great success");
    }
    return shader
}
function redraw(){
    myUnitMatrix = new Float32Array([Math.cos(angle),Math.sin(angle),0,0,		    -Math.sin(angle),Math.cos(angle),0,0,		    0,0,1,0,		    0,0,0,1]);
    mvp_pos = context.getUniformLocation(program ,"u_modelViewProjMatrix");
    context.uniformMatrix4fv( mvp_pos, false, myUnitMatrix);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    context.drawArrays( context.TRIANGLE_STRIP, 0 ,3);
}
function stepfun(){ 
    angle =angle +Math.PI/36;
    //angle = 0.;
    myUnitMatrix = [Math.cos(angle),Math.sin(angle),0,0,		    -Math.sin(angle),Math.cos(angle),0,0,		    0,0,1,0,		    0,0,0,1];
    mvp_pos = context.getUniformLocation(program ,"u_modelViewProjMatrix");
    context.uniformMatrix4fv( mvp_pos, false, new Float32Array(myUnitMatrix));
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    context.drawArrays( context.TRIANGLE_STRIP, 0 ,3);
} 

function rotateTriangle( radians ){ 
    angle = radians;
    //angle = 0.;
    myUnitMatrix = [Math.cos(angle),Math.sin(angle),0,0,		    -Math.sin(angle),Math.cos(angle),0,0,		    0,0,1,0,		    0,0,0,1];
    mvp_pos = context.getUniformLocation(program ,"u_modelViewProjMatrix");
    context.uniformMatrix4fv( mvp_pos, false, new Float32Array(myUnitMatrix));
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    context.drawArrays( context.TRIANGLE_STRIP, 0 ,3);
} 


var context;
var canvas;
try {
    canvas = document.querySelector("#canvas");
    context = canvas.getContext("experimental-webgl")|| canvas.getContext("webgl");
}
catch(e){
    console.log("halp");
}
var program = context.createProgram();
var vshader_element = document.querySelector("#vshader");
var vshader_src = vshader_element.innerHTML;
//console.log(vshader_src);
var fshader_element = document.querySelector("#fshader");
var fshader_src = fshader_element.innerHTML;
//console.log(fshader_src);
vshader = shaderFromString(context,vshader_src, context.VERTEX_SHADER);
fshader = shaderFromString(context,fshader_src, context.FRAGMENT_SHADER);
context.attachShader(program, vshader);
context.attachShader(program, fshader);
context.linkProgram(program);
context.clearColor(0.5, 0.2, 0, 1);
context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
context.useProgram(program);
context.enableVertexAttribArray(0);
var vertex_pos = context.getAttribLocation(program ,"vPosition");
var coord_buffer = context.createBuffer();
function createCoords( angle, radius){
    var mycoords = [0,0,0, 0,0,0, 0,0,0];
    for (var i = 0 ; i < 3 ; i++){
	mycoords[i*3+0] = radius*Math.cos( angle+ Math.PI*i*2/3);
	mycoords[i*3+1] = radius*Math.sin( angle+ Math.PI*i*2/3);
    }
    return mycoords;
}
var angle = 0;
var mycoords = createCoords(angle, 1);//[ Math.cos(angle[0]) , Math.sin(angle[0]),0,  Math.cos(angle[1]) , Math.sin(angle[1]),0,   Math.cos(angle[2]) , Math.sin(angle[2]),0];
context.bindBuffer(context.ARRAY_BUFFER, coord_buffer);
context.bufferData( context.ARRAY_BUFFER, new Float32Array(mycoords ), context.STATIC_DRAW );

context.vertexAttribPointer( 0 , 3, context.FLOAT, context.FALSE, 0, 0 );
var myUnitMatrix = [1,0,0,0,		    0,1,0,0,		    0,0,1,0,		    0,0,0,1];
var mvp_pos = context.getUniformLocation(program ,"u_modelViewProjMatrix");
context.uniformMatrix4fv( mvp_pos, false, new Float32Array(myUnitMatrix));
context.drawArrays( context.TRIANGLE_STRIP, 0 ,3);
//var button = document.querySelector("#step");
//button.setAttribute( "onclick", "stepfun()"); 

window.setInterval(redraw, 250);
halp="try the function rotateTriangle( radians) or just change the variable angle directly\n1 radian is almost 60 degrees, approximately 57.3 degrees\nrotations are done anticlockwise"
console.log("Welcome, ", halp );
