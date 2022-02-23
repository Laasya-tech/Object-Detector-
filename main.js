
status = "";
objects = [];




function setup()
{
    canvas = createCanvas(480, 380);
    canvas.position(550, 400);

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide()
   
}

function draw() {
    image(video, 0, 0, 380, 380);
        if(status != "")
        {
            
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
           // document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;//
   
            fill("purple");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label==object_name)
            {
              video.stop()
              objectDetector.detect(gotResult);
              synth= window.speechSynthesis
              utterThis = new SpeechSynthesisUtterance(object_name + "found")
              document.getElementById("number_of_objects").innerHTML = object_name + "Found"
            }
            else{
                document.getElementById("number_of_objects").innerHTML = object_name + " Not Found"
            }
          }
        }
  }
  
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
  }
  
  function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }

  function start()
  {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
   object_name = document.getElementById("input").value 
   

  }

