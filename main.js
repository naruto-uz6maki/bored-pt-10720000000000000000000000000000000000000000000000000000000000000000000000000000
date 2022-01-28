song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreleftwrist>0.2){
        innumber=Number(leftwristY);
        circle(leftwristX,leftwristY,20);
        remove=floor(innumber);
        volume=remove/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);

    }
    if(scorerightwrist>0.2){
        circle(rightwristX,rightwristY,20);
        if(rightwristY>0 && rightwristY<=100){
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
        else if(rightwristY>100 && rightwristY<=200){
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
        }
        else if(rightwristY>200 && rightwristY<=300){
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }
        else if(rightwristY>300 && rightwristY<=400){
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
        }
        else if(rightwristY>400){
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }
    }   
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('Posenet Is Initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX= results[0].pose.leftWrist.x;
        leftwristY= results[0].pose.leftWrist.y;
        rightwristX= results[0].pose.rightWrist.x;
        rightwristY= results[0].pose.rightWrist.y;
        console.log("leftwristX="+leftwristX+"leftwrristY="+leftwristY);
        console.log("rightwristX="+rightwristX+"rightwrristY="+rightwristY);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist="+scoreleftwrist+"scorerightwrist="+scorerightwrist);
    }
}