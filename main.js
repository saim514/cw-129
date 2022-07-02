song = "";
scoreleftwrist = 0;
scorerightwrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

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
    
    scorerightwrist = results[0].pose.keypoints[9].score;
    console.log("Score of right wrist = " + scorerightwrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;  
    
    console.log("LeftWristX = " + leftWristX + ", leftWristY = " + leftWristY);
    console.log("RightWristY = " + rightWristX  + ", rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill('#000080');
    stroke('#000080');
    if(scoreleftwrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    NumberleftwristY = Number(leftWristY);
    remove_decimals = floor(NumberleftwristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

    fill('#000080');
    stroke('#000080');
    circle(rightWristX, rightWristY, 20);
    if(scorerightwrist > 0.2)
    {
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5); 
        } else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if(rightWristX > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x WARNING: VERY FAST!!";
        }
    }
    
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}