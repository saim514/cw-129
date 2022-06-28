song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup()
{
    canvas = createCanvas(600, 500);

    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Listen to anything but this");
}

function gotPoses(results)
{
  if (results.length > 0)
  {
    console.log(results);
    scoreleftwrist = results[0].pose.keypoints[9].score;
    console.log("Score of left wrist = " + scoreleftwrist);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristX = results[0].pose.leftWrist.x;
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;  
    
    console.log("LeftWristX = " + leftWristX + ", leftWristY = " + leftWristY);
    console.log("RightWristY = " + rightWristX  + ", rightWristY = " + rightWristY);
    }
}

function preload()
{
    song = loadSound("music.mp3");
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill('#000080');
    stroke('#000080');
    circle(leftWristX, leftWristY, 20);

    NumberleftwristY = Number(leftWristY);
    remove_decimals = floor(NumberleftwristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}