// need function
var Tool = {
    GetValueColor: function(_color){
        
        if(_color.indexOf("rgba") != -1){
            return _color.slice(0, this.Find(_color, ",", 3) + 1);
            
        } else{
            return _color.slice(0, this.Find(_color, ")", 1)) + ",";
        }
        
    },
    Find: function(word, searchWord, EntryNumber){
        let begin = 0;
        let result = "" ;
        for(let i = 0; true;) {
            result = word.indexOf(searchWord, begin)
            if(result != -1){
                if(i == (EntryNumber - 1))
                    return result;
                else{
                    ++i;
                    begin = result + 1;
                }
            } else
                return result;
        }
    },
    SetInString: function(word, whatSet, index){
        let result = "";
        if(index < 0 || index > word.length)
            return -1;
        else{
            if(index == 0){
                result += whatSet + word;
            } else {
                if(index == word.length){
                    result += word + whatSet;
                } else{
                    result += word.slice(0, index) + whatSet + word.slice(index);
                }
            }
        }
        return result;
    },
    RGBColorPlusOpacity(color, opacity){
       if(color.indexOf("rgba") != -1){
           return this.GetValueColor(color) + " " + opacity + ")";
       } else{
           return this.SetInString(this.GetValueColor(color), "a", 3) + " " + opacity + ")";
       }
    }
}


//cube : object
var cube = {
    switchRotation: false,
    obj: null,
    side: null,
    rotateX: 0,
    rotateY: 0,
    differenceX: 0,
    differenceY: 0,
    sideOpacity: 1,
    anchor: {
        obj: null,
        mouseDown: function(e){
            cube.switchRotation = true;
            cube.differenceY = e.pageY;
            cube.differenceX = e.pageX;
        },
        mouseMove: function(e){
            if(cube.switchRotation){
                cube.jq().css({
                    transform: "rotateX("+ -(cube.rotateY += e.pageY - cube.differenceY) +"deg) rotateY("+ (cube.rotateX += e.pageX - cube.differenceX) +"deg)"
                })
                cube.differenceY = e.pageY;
                cube.differenceX = e.pageX;
            }  
        },
        mouseUp: function(){
            cube.switchRotation = false;
        },
        mouseWheel: function(e){
            console.log("e.pageY: " + -e.pageY/5);
            if(cube.switchRotation){
                cube.jq().css({
                    width: "+=" + -e.deltaY/5,
                    height: "+=" + -e.deltaY/5  
                });
                cube.OriginCorrection();
            }
        },
        initialization: function(_html){
            this.obj = _html;
            this.obj.onmousedown = this.mouseDown;
            this.obj.onmousemove = this.mouseMove;
            this.obj.onmouseup = this.mouseUp;
            this.obj.onmousewheel = this.mouseWheel;
        }
    },
    initialization: function(_obj, _anchore){
        this.obj = _obj;
        this.side = _obj.children; 
        this.anchor.initialization(_anchore);
        this.sideOpacity = +this.obj.dataset.bgOp;
       $(cube.side).css("background-color", "rgba(159, 17, 17, "+ cube.sideOpacity + ")");
        console.log(this.sideOpacity + ": opacity");
    },
    OriginCorrection: function(){
        this.jq().css("transform-origin", "50% 50% "+ -parseInt(this.jq().css("width")) / 2 + "px");
        $(this.side).css("transform-origin", "50% 50% "+ -parseInt(this.jq().css("width")) / 2 + "px")
    },
    jq: function(){return $(this.obj)}
    
}

//Setting parameters
//opacity slider
var slider = {
    obj: null,
    endMove: null,
    width: function(){return parseInt(this.jq().css("width"))},
    mouseDown: function(e){
        slider.circle.differenceX = e.pageX - parseInt(slider.jq().css("margin-left")) - slider.circle.left() - slider.circle.width()/2;
        slider.circle.jq().css("left", slider.circle.differenceX + "px");
        slider.circle.switchMove = true;
        //slider.circle.obj.focus();
    },
    circle: {
        obj: null,
        switchMove: false,
        differenceX: 0,
        width: function(){return parseInt(this.jq().css("width"))},
        left: function(_left){
            
            if(_left != undefined){
                this.jq().css("left", _left + "px");
                console.log("circle.left: " + _left);
            }
            return parseInt(this.jq().css("left"));
        },
        top: function(){return parseInt(this.jq().css("top"));},
        mouseDown: function(e){
        slider.circle.switchMove = true;
        slider.circle.differenceX = e.pageX - parseInt(slider.jq().css("margin-left")) - slider.circle.left();
        console.log(slider.circle.switchMove);
        },
        mouseMove: function(e){
        
            var move = e.pageX - parseInt(slider.jq().css("margin-left")) - slider.circle.differenceX;
           /* console.log("mouseMove: e.pageX: " + e.pageX);
            console.log("mouseMove: circle.left: " + slider.circle.left());
            console.log("mouseMove: slider.width: " + slider.width());
            console.log("mouseMove: move: " + move);
            console.log("mouseMove: endMove: " + slider.endMove);*/
            if(slider.circle.switchMove){
                if((slider.circle.left() > 0) && (slider.circle.left() < slider.endMove)){
                   /* console.log(e.pageX);   
                    console.log(e.pageX - parseInt(slider.jq().css("margin-left")) - slider.circle.differenceX + "px");*/
                    slider.circle.jq().css("left", move + "px");
                } else{
                    if(slider.circle.left() == 0 && move > 0){
                        slider.circle.jq().css("left", move + "px");
                    } else{
                        if(slider.circle.left() == slider.endMove && slider.circle.left() > move){
                            slider.circle.jq().css("left", move + "px");
                        } else {
                            if(0 > slider.circle.left()){
                                slider.circle.left(0)
                            } else {
                                if(slider.circle.left() > slider.endMove){
                                    slider.circle.left(slider.endMove)
                                }
                            }
                        }
                    }
                }
                cube.sideOpacity = slider.circle.left()/slider.endMove;
                //console.log("mouseMove: opacity: " + ((slider.circle.left()) / slider.endMove).toFixed(3));
                $(cube.side).css("background-color",  Tool.RGBColorPlusOpacity($(cube.side).css("background-color"), cube.sideOpacity));
            }
            
           
        },
        mouseUp: function(){
        slider.circle.switchMove = false;
        slider.circle.differenceX = 0;
        },
        intialization: function(_circle){
            this.obj = _circle;
            this.obj.onmousedown = this.mouseDown;
            this.obj.onmousemove = this.mouseMove;
            this.obj.onmouseup = this.mouseUp;
        },
        jq: function(){return $(this.obj);}
    },
    initialization: function(_slider){
        this.obj = _slider;
        this.circle.intialization(_slider.children[0]);
        this.endMove = slider.width() - slider.circle.width() - 5;     
        this.circle.left(cube.sideOpacity * slider.endMove);
        this.circle.jq().css("left", slider.endMove * cube.obj.dataset.sideBgopacity + "px");
        //this.obj.onmousedown = this.mouseDown;
    },
    jq: function(){return $(this.obj);}
}

//backface-visibility
var switcher = {
    obj: null,
    checked: function(){return this.obj.checked},
    change: function(){
        console.log(switcher.checked());
        if(switcher.checked()){
            $(cube.side).css("backface-visibility", "hidden");
        } else{
            $(cube.side).css("backface-visibility", "visible");
        }
    },
    initialization: function(object){
        this.obj = object;
        this.obj.onchange = this.change;
    },
    jq: function(){return $(this.obj);}
}

//color-box
var colorBox = {
    obj: null,
    heigh: function(){return parseInt(this.jq().css("height"))},
    anchor: null,
    colors: null,
    colorMouseDown: function(){
        $(cube.side).css("background-color", this.dataset.color)
        .css("background-color", Tool.RGBColorPlusOpacity($(cube.side).css("background-color"), slider.circle.left()/slider.endMove));
    },
    anchorMouseDown: function(){
        if(colorBox.heigh() == 0){
            
            colorBox.jq()
                .css("box-shadow", "0 4px 4px 0 black")
                .animate({height: "250px"});
        } else{
            colorBox.jq().animate({height: "0px"});
        }
    },
    initialization: function(_colorBox, _anchor){
        this.obj = _colorBox;
        this.colors = _colorBox.children;
        this.anchor = _anchor;
        this.anchor.onmousedown = this.anchorMouseDown;
        for(let i = 0; i < this.colors.length; ++i){
            $(this.colors[i]).css("background-color", this.colors[i].dataset.color);
            this.colors[i].onmousedown = this.colorMouseDown;
        }
    },
    jq: function(){return $(this.obj);}
}

$(document).ready(function(){
    cube.initialization($(".cube").get(0), $(".container:first").get(0));
    slider.initialization($(".slider:first").get(0));
    switcher.initialization($(".chebox").get(0));
    colorBox.initialization($(".color-box").get(0), $("#logo-color").get(0));
});