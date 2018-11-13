var Load = function(){
    
    var container = document.getElementsByClassName("container-canvas")[0];
    var canvas = document.createElement("canvas");
    var canvas1 = document.createElement("canvas");
    container.appendChild(canvas1);
    container.appendChild(canvas);
        
    var s = canvas.getContext('2d');
    var s1 = canvas1.getContext('2d');
    canvas.width = 486;
    canvas.height = 10
    canvas1.width = 486
    canvas1.height = 176;
    s1.fillStyle = "#000";
    s1.fillRect(0,0,200,176);
     var q = s.createLinearGradient(0,0,486,0);
        q.addColorStop(0, "rgb(255, 0, 0)");
        q.addColorStop(0.01, "rgb(255, 0, 0)");
    
        q.addColorStop(0.1, "rgb(255, 255, 0)");
        q.addColorStop(0.12, "rgb(255, 255, 0)");
    
        q.addColorStop(0.3, "rgb(0, 255, 0)");
        q.addColorStop(0.32, "rgb(0, 255, 0)");
    
        q.addColorStop(0.5, "rgb(0, 255, 255)");
        q.addColorStop(0.52, "rgb(0, 255, 255)");
    
        q.addColorStop(0.7, "rgb(0, 0, 255)");
        q.addColorStop(0.72, "rgb(0, 0, 255)");
    
        q.addColorStop(0.9, "rgb(255, 0, 255)");
        q.addColorStop(0.92, "rgb(255, 0, 255)");
        q.addColorStop(1, "rgb(255, 0, 0)");
        s.fillStyle = q;
        s.fillRect(0,0, 486, 10);
        
        var lf = 00,
            tp = 00;
        
        var lf1 = 480,
            tp1 = -50;
    var q1 = s1.createRadialGradient(lf, 0, 0, lf, tp, 200);
        q1.addColorStop(0, "#ffffff");
        q1.addColorStop(0.2, "#d0cece");
        q1.addColorStop(0.8, "rgb(23, 23, 23)");
        q1.addColorStop(1, "rgb(0, 0, 0)");
    var q1_1 = s1.createRadialGradient(lf1, tp1, 0, lf1, tp1, 400)
        q1_1.addColorStop(0, "rgb(201, 19, 19)");    
        q1_1.addColorStop(0.5, "rgba(255, 0, 0, 0.65)");    
        q1_1.addColorStop(1, "rgba(255, 0, 0, 0)");
    
    var linerG = s1.createLinearGradient(0,0,0,176);
        linerG.addColorStop(0, "#fff");
        linerG.addColorStop(0.4, "#9d9d9d");
        linerG.addColorStop(1, "#000");    
    
    
       // linerG1.addColorStop(0, "rgba(0, 0, 255, 1)");
        //linerG1.addColorStop(0.2, "rgba(0, 0, 255, 1)");
        //linerG1.addColorStop(0.4, "rgba(0, 0, 255, 0.9)");
       // linerG1.addColorStop(0.6, "rgba(0, 0, 255, 0.5)");
        //linerG1.addColorStop(1, "rgba(0, 0, 255,0)");
    
    var BLACK = s1.createLinearGradient(0,176,0,0);
        BLACK.addColorStop(0, "#000");
        BLACK.addColorStop(0.4, "rgba(0, 0, 0, 0.5)");
        BLACK.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    s1.fillStyle = linerG;
    s1.fillRect(0,0,486,176);
    
   // s1.fillStyle = linerG1;
    s1.fillRect(0,0,486,176);
    
    s1.fillStyle = BLACK;
    s1.fillRect(0,0,486,176);
    
    /*s1.fillStyle = q1;
    s1.beginPath();
    s1.arc(0, 0, 600, 0, Math.PI * 2, true);
    s1.fill();

    s1.fillStyle = q1_1;
    s1.beginPath();
    s1.arc(480, 0, 400, 0, Math.PI * 2, true);
    s1.fill();*/
    
    var dat = s.getImageData(50,61, 1, 1);
    console.log("rgba("+dat.data[0]+", "+dat.data[1]+", "+dat.data[2]+", "+dat.data[3]+")");
    console.log($(canvas).offset());
    var of = $(canvas).offset();
    var of1 = $(canvas1).offset();
    canvas.onmousemove = function(e){
        let dat = s.getImageData(e.pageX - of.left,e.pageY - of.top, 1, 1);
        console.log("rgba("+dat.data[0]+", "+dat.data[1]+", "+dat.data[2]+", "+dat.data[3]+")");
        console.log($(canvas).offset());
        
        s1.clearRect(0,0,486,176);
        s1.fillStyle = linerG;
        s1.fillRect(0, 0, 486, 176);
        let color = dat.data[0]+", "+dat.data[1]+", "+dat.data[2];
        let linerG1 = s1.createLinearGradient(460,0,0,0);
            linerG1.addColorStop(0, "rgba("+color+", 1)");
            linerG1.addColorStop(0.2, "rgba("+ color +", 1)");
            linerG1.addColorStop(1, "rgba("+ color +", 0)");
        
        s1.fillStyle = linerG1;
        s1.fillRect(0, 0, 486, 176);
        
        s1.fillStyle = BLACK;
        s1.fillRect(0, 0, 486, 176);
        
       
    }
    
    canvas1.onmousemove = function(e){
        var dat = s1.getImageData(e.pageX - of1.left,e.pageY - of1.top, 1, 1);
        console.log("rgba("+dat.data[0]+", "+dat.data[1]+", "+dat.data[2]+", "+dat.data[3]+")");
        console.log($(canvas).offset());
        Panel.style.backgroundColor = "rgba("+dat.data[0]+", "+dat.data[1]+", "+dat.data[2]+", "+dat.data[3]+")";
    }
    canvas1.onclick = function(){
        s1.clearRect(0,0,486,176);
    }
    
    
    }
    


window.addEventListener("load", Load);







function asdw(){
        
       console.log(s);
        var i = 255,
            j = 255,
            x = 0,
            y = 0,
            dif = 3;
        var Co = setInterval(function(){
            s.strokeStyle = "rgb("+ i +"," + j + "," + j + ")";
            s.beginPath();
            s.moveTo(x, y);
            //alert("done");
            //console.log(i);
           // console.log(s);
            s.lineTo(x+1, y);

            s.stroke();
            if(dif == 3)
                dif = 2;
            else dif = 2;
            j -= 3;
            x += 1
            if(x > 255){
               
                x = 0;
                y += s.lineWidth;
                i -= 5;
                 j = i;
                //alert("J = 255");
                if(y > 230  ){
                    clearInterval(Co);
                    alert("Close");
                }
            }
            
        }.bind(this),1);
        for(var i = 255, offset = 0, counter = 0, x = 0, y = 0; y <= 255;){
            
            for(var j = i; x <= canvas.width; ++x){
                s.strokeStyle = "rgba("+ j +"," + i + "," + j + ", 1)";
                s.beginPath();
                s.moveTo(x, y);
                s.lineTo(x + 1, y);
               // console.log("x = " + x + " : y = " + y);
                s.stroke();
                j-= 1;
            }
            ++counter;
            if(counter == 2){
                i -= 4;
                counter = 0;
            }
            else i -= 4;
            y += s.lineWidth - 3;
            x = 0;
        }
        s.strokeStyle = "rgb(0,255, 0)";
    }
       /* for(var i = 255, offset = 0, counter = 0, x = 0, y = 0; y <= 255;){
            
            for(var j = i; x <= canvas.width; ++x){
                s.strokeStyle = "rgba("+ i +"," + j + "," + 50 + ", 255)";
                s.beginPath();
                s.moveTo(x, y);
                s.lineTo(x + 1, y);
               // console.log("x = " + x + " : y = " + y);
                s.stroke();
                j-= 1;
            }
            ++counter;
            if(counter == 2){
                i -= 4;
                counter = 0;
            }
            else i -= 4;
            y += s.lineWidth - 3;
            x = 0;
        }*/
       /* var img = new Image();
        img.src = "CSS/Image.jpg";
        
        img.onload = function(){
            
            //s.drawImage(img, 0, 0);
        }.bind(this);*/