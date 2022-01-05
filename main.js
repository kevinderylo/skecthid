time_check="";
answer_holder="";
time_counter=0;
var class_result=[];
var class_error;
var shouldCount = false
var types=["Car", "Truck", "Plane", "house", "bridge", "sun", "rain", "rocket",];
var sketch="";
var points=0;
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function setup(){
    canvas=createCanvas(600, 600);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function press(){
    sketch = types[Math.floor(Math.random() *types.length)];
    console.log(sketch);
    document.getElementById("TS").innerHTML="You're sketch is "+ sketch;
}

function check_sketch(){
    time_counter++;
    document.getElementById("time").innerHTML="Time: "+time_counter;
    if(time_counter>1000){
        time_counter=0;
        time_check="completed"
    }
    if(time_check=="completed"||answer_holder=="set"){
        time_check="";
        answer_holder="";
        update_canvas();
        
        if (class_result.length > 0) {
            shouldCount = true
            gotresult()
        }
    }
}
function update_canvas(){
    background("white");
}
function draw(){
    check_sketch();
    strokeWeight(13);
    stroke("0");
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
 function clearcanvas(){
     background("white");
 }
 function classifyCanvas(){
     classifier.classify(canvas, gotresult);
 }
 function gotresult(error,results){
     if(error){
         console.error(error);
     }

     if (results) {
        console.log("Storing results...");
        class_result = results
        class_error = error
     } else {
         results = class_result  
     }

     console.log("Sketch is: "+ sketch);
     console.log(results);
     document.getElementById("label").innerHTML="Your sketches: "+ results[0].label;
     document.getElementById("confidence").innerHTML="CONFIDENCE: "+ Math.round(results[0].confidence*100)+"%";
     utter1=new SpeechSynthesisUtterance(results[0].label);
     synth.speak(utter1);
     res=results[0].label;
     console.log(results[0].label);
     if(results[0].label===sketch && shouldCount){
        console.log("pls");
        points++
        document.getElementById("score").innerHTML="Score: "+points;
        shouldCount = false
 }
    }