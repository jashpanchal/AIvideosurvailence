video = "";
status = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of objects detected are : " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#0000FF");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded(){
    console.log("ModelLoaded");
    status = true;
    video.speed(1);
    video.volume(0.2);
    video.loop();
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}