
"use strict"

var NeedFunction = {
    ColorPlusOpacity: function(Color, Opacity){
        if(Color.indexOf("rgba") != -1){
            let result = Color.__GetValueColor();
            return result.__SetIn(", " + Opacity, result.__FindEntry(")"))
        } else{
            if(Color.indexOf("rgb") != -1){
                Color = Color.__SetIn("a", 3);
                return Color.__SetIn((", " + Opacity), Color.__FindEntry(")"));
            }
        }
    }
};
String.prototype.__FindEntry = function(word, EntryNumber){
    EntryNumber = EntryNumber || 1;
    let result = -1;
    let begin = 0;
    for(var i = 0; true;){
        result = this.indexOf(word, result + 1);
        if(result != -1){
            ++i;
            if(i == EntryNumber)
                return result;
        }else
            return result;
    }
}
String.prototype.__GetValueColor = function(){
    if(this.indexOf("rgba") != -1){
        return this.slice(0, this.__FindEntry(",", 3)) + ")";
    } else{
        if(this.indexOf("rgb") != -1){
            return this.slice(0, this.__FindEntry(")")) + ")";
        }
        return "NAC";
    }
}
String.prototype.__SetIn = function(whatSet, In){
    In = In || 0;
    if(0 < In && In < this.length){
        return this.slice(0, In) + whatSet + this.slice(In);
        
    } else{
        if(!In){
            return whatSet + this;
        } else{
            return this + whatSet;
        } 
    }
}
function Interface(_obj){
    var self = this;
    this.obj = _obj;
    this._style = getComputedStyle(this.obj);
    this.style = this.obj.style;
    Object.defineProperties(this, {
        display: {
            get: function(){return this.style.display;},
            set: function(dis){ this.style.display = dis;}
        },
        left: {
           get: function(){
               return parseInt(self.style.left);
           },
           
           set: function(offset){
              // console.log("left - offset: " + offset);
               self.obj.style.left = offset;   
           }
       },
        top: {
            get: function(){
                return parseInt(self.style.top);
            },
            set: function(offset){
             //   console.log("top - offset: " + offset);
                self.obj.style.top = offset;
            }
        },
        width: {
            get: function(){
                return parseInt(self.style.width);
            },
            set: function(newWidth){
              //  console.log("width - newWidth: " + newWidth);
                self.obj.style.width = newWidth;
            }
        },
        height: {
            get: function(){
                return parseInt(self.style.height);
            },
            set: function(newHeight){
              //  console.log("height - newHeight: " + newHeight);
                self.obj.style.height = newHeight;
            }
        },
        margin:{
            get: function(){return this.obj.style.margin},
            set: function(Margin){ this.obj.style.margin = Margin;}
        },
        background: {
            get: function(){return this.style.background},
            set: function(background){
                this.style.background = background;
            }
        },
        position: {
            get: function(){return this.style.position;},
            set: function(pos){
                this.style.position = pos;
            }
        },
        border: {
            get: function(){return this.style.border;},
            set: function(bor){ this.style.border = bor}
        },
        borderRadius: {
            get: function(){return this.style.borderRadius;},
            set: function(bR){ this.style.borderRadius = bR;}
        },
        cursor: {
            get: function(){return this.style.cursor;},
            set: function(cur){ this.style.cursor = cur;}
        },
        overflow: {
            get: function(){return this.style.overflow;},
            set: function(of){this.style.overflow = of;}
        },
        overflowX: {
            get: function(){return this.style.overflowX;},
            set: function(ofX){this.style.overflowX = ofX;}
        },
        overflowY: {
            get: function(){return this.style.overflowY;},
            set: function(ofY){this.style.overflowY = ofY;}
        },
        associationCube: {
            get: function(){
                return true;
            }
        }
    });
}

function Side(settings){
    Interface.call(this, document.createElement("div"));
    // CSS
    this.style.width = settings.width || "100%";
    this.style.height = settings.height || "100%";
    this.style.backgroundColor = settings.backgroundColor || "rgba(159, 18, 16, .5)";
    this.style.position = "absolute";
    this.style.border = settings.border || "5px solid rgb(255, 255, 255)";
    this.style.boxSizing = "border-box";
    this.top = "0";
    this.left= "0";
    this.style.transformOrigin = settings.transformOrigin || "50% 50% 0";
    this.obj.classList.add("side");
}

function Cube(_anchor, settings){
    if(_anchor){
        Interface.call(this, document.createElement("div"));
        settings = settings || {};
        
        this.sides = new Array();

        this._anchor = _anchor;
        
        this._rotateX = 0;
        this._rotateY = 0;
        this._differenceX = 0;
        this._differenceY = 0;
        this._switchRotation = false;

        this.style.width = settings.width || "100px";
        this.style.height = settings.height || "100px";
        this.style.transformStyle = "preserve-3d";
        this.style.transformOrigin = "50% 50% " + parseInt(this.style.width) / 2 + "px";
        this.style.border = settings.border || "";
        this.style.userSelect = "none";

        for(var i = 0; i < 6; ++i){
            this.sides[i] = new Side({
                backgroundColor: settings.backgroundColor || "rgba(170, 26, 26, 0.85)",
                transformOrigin: this.style.transformOrigin 
            });
            this.obj.appendChild(this.sides[i].obj);
        }
        // console.log(this.obj + " : transform");
        this.sides[1].obj.style.transform = "rotateX(90deg)";
        this.sides[2].obj.style.transform = "rotateX(-90deg)";
        this.sides[3].obj.style.transform = "rotateY(90deg)";
        this.sides[4].obj.style.transform = "rotateY(-90deg)";
        this.sides[5].obj.style.transform = "rotateX(180deg)";


        this.obj.onmousewheel = function(e){
            e.preventDefault();
            this.obj.style.width = parseInt(this.obj.style.width) + -e.deltaY/5 + "px";
            this.obj.style.height = parseInt(this.obj.style.height) + -e.deltaY/5 + "px";
            this.TransformOriginCorrection();
        }.bind(this);

        this.obj.classList.add("cube");


        if(!this._anchor.hasAttribute("data-anchor-width"))
            this._anchor.style.width = settings.anchorWidth || "100%";
        else
            this._anchor.style.width = this._anchor.dataset.anchorWidth;

        if(!this._anchor.hasAttribute("data-anchor-height"))
            this._anchor.style.height = settings.anchorHeight || "500px";
        else
            this._anchor.style.height = this._anchor.dataset.anchorHeight;
        this._anchor.style.perspectiveOrigin = "50% 50%";
        this._anchor.style.perspective = "1300px";

        this._anchor.appendChild(this.obj);

        this._anchor.onmousedown = function(e){
            this._switchRotation = true;
            this._differenceX = e.pageX;
            this._differenceY = e.pageY;
          //  console.log(switchRotation);
        }  .bind(this);      
        this._anchor.onmousemove = function (e){
            if(this._switchRotation){
                this.obj.style.transform = "rotateX(" + -(this._rotateY += e.pageY - this._differenceY)+ "deg) rotateY(" + (this._rotateX += e.pageX - this._differenceX) + "deg)";
                this._differenceX = e.pageX;
                this._differenceY = e.pageY;
              /*  console.log(differenceY);
                console.log(differenceX);*/
            }
        }.bind(this);        
        this._anchor.onmouseup = function(){
            this._switchRotation = false;
            this._differenceX = this._differenceY = 0;
        }.bind(this);
        
        
        
    }
    else{
        throw new Error("anchor is undefined");
    }
}
Cube.prototype.TransformOriginCorrection = function(){
    this.obj.style.transformOrigin = "50% 50% "+ (parseInt(this.sides[0]._style.width)/2)+"px";
    for(var i = 0; i < 6; ++i){
        this.sides[i].style.transformOrigin = "50% 50% "+ parseInt(this.sides[i]._style.width)/2+"px";
    }
}

function SettingsPanel(settings){
    Interface.call(this, document.createElement("div"));
    
    settings = settings || {};
    this._anchor = settings.anchor;
    this.type = ((settings.type || (this._anchor ? this._anchor.dataset.panelPosition : 0)) || "top").toLowerCase();
    this.tools = new Array();
    // CSS
    
        this.background = (settings.background || settings.backgroundColor) || "#eff1f1";        
        this.style.boxSizing = settings.boxSizing || "border-box";
        this.display = settings.display || "flex";
        this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
        this.overflowY = settings.overflowY || "visible";
        if(this._anchor || this.type == "other"){
            this.style.position = settings.position || "relative";           
        }
        else{
            this.style.position = "fixed";
           
        }
        
        if(this.type == "left" || this.type == "right"){
            this.style.flexFlow = settings.flexFlow || "column nowrap";
            this.style.paddingTop = settings.paddingTop || "0";
            this.style.height = "100%";
            this.style.width = (settings.width || (this._anchor ? this._anchor.dataset.panelWidth : 0)) || "100px";
            this.style.top = "0px";
            if(this.type == "left"){
                this.style.left = this.style.top;
            } else{
                this.style.right = this.style.top;
            }
            
        } else{
            if(this.type == "top" || this.type == "bottom"){
                this.style.flexFlow = settings.flexFlow || "row wrap";
                this.style.paddingLeft = settings.paddingLeft || "0";
                this.style.left = "0px";
                this.style.width = "100%";
                this.style.height = (settings.height || (this._anchor ? this._anchor.dataset.panelHeight : 0)) || "80px";
                
                if(this.type == "top"){
                    this.style.top = this.style.left;
                } else{
                    this.style.bottom = this.style.left;
                }
                
            } else{
                this.style.width = settings.width || "auto";
                this.style.height = settings.height || "auto";
                this.style.flexFlow = settings.flexFlow || "column nowrap";
            }
        }
    
        this.style.justifyContent = settings.justifyContent || "flex-start";
        this.style.alignItems = settings.alignSelf || "center";
        if(settings.alignSelf)
            this.style.alignSelf = settings.alignSelf
        
    // END CSS
    
    this.obj.classList.add("settings-panel");
    if(this._anchor){
        let styleAn = getComputedStyle(this._anchor);
        this._anchor.style.position = "relative";
        this._anchor.style.width = styleAn.width == "0px" ? "100%" : styleAn.width;
        this._anchor.style.height = styleAn.height == "0px" ? "100%" : styleAn.height;
        this._anchor.appendChild(this.obj);
    } else
        document.body.appendChild(this.obj);
}
SettingsPanel.prototype.Add = function(tool){
    if(tool.associationCube)
        this.obj.appendChild(tool.obj);
    else
        this.obj.appendChild(tool);
    this.tools[this.tools.length] = tool;
}

function Line(settings){
    Interface.call(this, document.createElement("div"));
    settings = settings || {};
    this.style.position = "relative";
    this.style.padding = 0;
    this.style.width = settings.width || "100px";
    this.style.height = settings.height || "5px";
    if(!settings.background)
        this.style.backgroundColor = settings.backgroundColor || "white";
    
        this.style.background = settings.background;
    this.style.boxShadow = settings.boxShadow || "0 0 5px 0 black";
    this.style.borderRadius = settings.borderRadius || "5px";
    
    for(var key in settings.other){
        console.log(key);
        this.style[key] = settings.other[key];
    }
}

function Circle(settings){
    Interface.call(this, document.createElement("div"));
    settings = settings || {};
    
    this.style.position = settings.position || "absolute";
    this.style.left = settings.left || "0";
    this.style.top = settings.top || "0";
    
    this.style.width = (settings.radius || settings.width) || "10px";
    this.style.height = (settings.radius || settings.height) || "10px";
    
    this.style.marginLeft = settings.marginLeft || "0px";
    this.style.marginTop = settings.marginTop || "0px";
    this.style.borderRadius = settings.borderRadius || this.width + "px";
    this.style.backgroundColor = settings.backgroundColor || "rgb(110, 34, 157)";   
    
    this.obj.onmousedown = settings.mouseDown;
    
    this.obj.onmousemove = settings.mouseMove;
    
    this.obj.onmouseup = settings.mouseUp;
    
    for(var key in settings.other){
        this.style[key] = settings.other[key];
    }
    
}

function Slider(settings){

    Interface.call(this, document.createElement("div"));
    settings = settings || {};
    this.type = settings.type || "horizontal";
    this.type = this.type.toLowerCase();
        
    this.style.userSelect = "none";
    this.style.cursor = "pointer"
    this.style.boxSizing = "border-box";
    this.style.width = settings.width || "150px";
    this.style.height = settings.height || "auto";
    this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
    this.style.boxShadow = settings.boxShadow || "";
    this.onchange = function(a){};
    this.getEndMove = function(){return endMove;};
    
    var DownHorizontal = function(e){
        switchMove = true;
        difference = e.pageX;
    }.bind(this);
    var DownVertical = function(e){
        switchMove = true;
        difference = e.pageY;
    }.bind(this);
    var MoveHorizontal = function(e){
        if(switchMove){
            PreviousValue = this.value;
            /*console.log("Circle.mousemove - left: " + this.left);
            console.log("Circle.mousemove - endMove: " + endMove);
            console.log("Circle.mousemove - if1: " + (0 < this.left && this.left < endMove));*/
            if(0 < this._circle.left && this._circle.left < endMove){
                this._circle.left = this._circle.left + e.pageX - difference + "px";

            } else{
                if(this._circle.left == 0 && e.pageX > difference){
                    this._circle.left = this._circle.left + e.pageX - difference + "px";
                } else{
                    if(this._circle.left == endMove && e.pageX < difference){
                        this._circle.left = this._circle.left + e.pageX - difference + "px";
                    } else{
                        if(this._circle.left < 0){
                            this._circle.left = "0";
                        } else{
                            if(this._circle.left > endMove)
                                this._circle.left = endMove + "px";
                        }
                    }
                }
            }   
            this.onchange(this.value);
            difference = e.pageX;
        }

    }.bind(this);
    var MoveVertical = function(e){
        if(switchMove){
            /*console.log("slider, vertical - mousemove, endMove: " + endMove );
            console.log("slider, vertical - mousemove, top: " + this._circle.top );
            console.log("slider, vertical - mousemove, height: " + this.height );*/
            if(0 < this._circle.top && this._circle.top < endMove){
                this._circle.top = this._circle.top + e.pageY - difference + "px";
            } else{
                if(this._circle.top == 0 && e.pageY > difference)
                    this._circle.top = this._circle.top + e.pageY - difference + "px";
                else{
                    if(this._circle.top == endMove && e.pageY < difference)
                        this._circle.top = this._circle.top + e.pageY - difference + "px";
                    else{
                        if(this._circle.top < 0) this._circle.top = 0;
                        if(this._circle.top > endMove) this._circle.top = endMove + "px";
                    }
                }
            }
            this.onchange(this.value);
            difference = e.pageY;
        }
    }.bind(this);
    var Up = function(){
        switchMove = false;
        difference = 0;

    }.bind(this) ;
    if(this.type == "horizontal"){        
        this._line = settings.line || new Line({width: this.style.width});
        this._circle = settings.circle || new Circle({
            marginLeft: "3px",
            marginTop: "-7px",
            radius: "20px",
            mouseDown: DownHorizontal,
            mouseMove: MoveHorizontal,
            mouseUp: Up            
        });
        var endMove = this.width - parseInt(this._circle.style.marginLeft)*2 - this._circle.width;
    } else{
        if(this.type == "vertical"){
            this._line = settings.line || new Line({height: "150px", width: "5px"})
            this._circle = settings.circle || new Circle({
                marginLeft: "-7px",
                marginTop: "3px",
                radius: "20px",
                mouseDown: DownVertical,
                mouseMove: MoveVertical,
                mouseUp: Up            
            }); 
            var endMove = this._line.height - parseInt(this._circle.style.marginTop)*2 - this._circle.height;
        }else{
            console.log("wrong type");
        }
    }
    

    var switchMove = false;
    var difference = 0;
    var PreviousValue = 0;
    this.obj.classList.add("container-slider");
    this._line.obj.classList.add("line");
    this._circle.obj.classList.add("slider-circle");

    this._line.obj.appendChild(this._circle.obj);
    this.obj.appendChild(this._line.obj);

    Object.defineProperties(this,{
        value: {
            get: function(){
                return this._circle.left/this.getEndMove() * 100;
            }
        },
        previousValue: {
            get: function(){
                return PreviousValue;
            }
        }
    });
    
}

function Switcher(settings){
    Interface.call(this, document.createElement("div"));
    
    settings = settings || {};
    this.style.position = "relative";
    this.style.width = settings.width || "50px";
    this.style.height = settings.height || "20px";
    this.style.marginLeft = settings.marginLeft || "0px";
    this.style.borderRadius = settings.borderRadius || "20px";
    this.style.boxShadow = settings.boxShadow || "inset 0 0 5px 0 black";
    this.style.backgroundColor = "rgb(255, 255, 255)";
    this.style.userSelect = "none";
    this.style.cursor = "pointer";
    this.obj.classList.add(settings.className || "switcher");
    

    this._circle = settings.circle || new Circle({radius: (parseInt(this.style.height) - 4 + "px"), marginLeft: "2px", marginTop: "2px"});

    var Sign = settings.switch || false;
    var endMove = this.width - this._circle.width - parseInt(this._circle.style.marginLeft)*2;
    if(Sign)
        this._circle.obj.style.left = endMove + "px";
    var Animation;
    this.onchange = function(a){};
    this.A = function(){return Animation;}
    this.obj.onclick = function(){      

        if(Animation > 0)
            clearInterval(Animation);
        if(this._circle.left == 0 || !Sign){
            Sign = true;
            Animation = setInterval(function(){    
                    this._circle.left = this._circle.left + 1 + "px";
                    if(this._circle.left == endMove){
                        clearInterval(Animation);
                        Animation = 0;
                    }
            }.bind(this),1);
        } 
        else{
            Sign = false;
            Animation = setInterval(function(){
                this._circle.left = this._circle.left - 1 + "px";
                if(this._circle.left == 0){
                    clearInterval(Animation);
                    Animation = 0;
                }
            }.bind(this), 1);
        }
        
        this.onchange(this.value);
    }.bind(this);
    Object.defineProperties(this,{
        value: {
            get: function(){return Sign;}
        }
    })
    this.obj.appendChild(this._circle.obj);
}

function SliderForColorPicker(settings){
    Interface.call(this, document.createElement("div"));
    settings = settings || {};
    var switchMove = false;
    var difference = 0;
    var Move = function(e){
        if(switchMove){
            if(beginMove < this._circle.left && this._circle.left < endMove)
                this._circle.left = this._circle.left + e.pageX - difference + "px";
            else{
                if(beginMove == this._circle.left && e.pageX > difference)
                    this._circle.left = this._circle.left + e.pageX - difference + "px";
                else{
                    if(endMove == this._circle.left && e.pageX < difference){
                        this._circle.left = this._circle.left + e.pageX - difference + "px";
                    }
                    else{
                        if(beginMove > this._circle.left) this._circle.left = beginMove + "px";
                        if(endMove < this._circle.left) this._circle.left = endMove + "px";
                    }
                }
            }
            let ImgRGBA = holst.getImageData(this._circle.left + this._circle.width/2, 6, 10, 10);
            this.spectrum.getContext('2d').fillRect(0,0,486,10);
            this._circle.style.backgroundColor = "rgb("+ ImgRGBA.data[0] + ", " + ImgRGBA.data[1] + ", " + ImgRGBA.data[2] +")"
            difference = e.pageX;
            this.onchange(this.value);
        }
    }.bind(this);
    var Up = function(){
        switchMove = false;
        difference = 0;
    }.bind(this);
    
    this.onchange = function(){};
    this.width = "auto";
    this.height="auto";
    this.style.marginLeft = settings.marginLeft || "0px";
    this.style.userSelect = "none";
    this.style.cursor = "pointer";
    this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
    this.style.boxShadow = settings.boxShadow || "";
    
    this._line = settings.line || new Line({
        width: settings.width ||"400px",
        height: settings.height || "10px"
    });
    this._circle = settings.circle || new Circle({
        radius: "24px",
        left: -24/2+"px",
        top: "-7px",
        backgroundColor: "red",
        mouseDown: function(e){
            switchMove = true;
            difference = e.pageX;
        }.bind(this),
        mouseMove: Move,
        mouseUp: Up 
    });
    var beginMove = -this._circle.width/2 ;
    var endMove = this._line.width- this._circle.width/2 - 1;
    
    this.spectrum = document.createElement("canvas");
    this.spectrum.width = this._line.width;
    this.spectrum.height = this._line.height;
    this.spectrum.style.position = "absolute";
    this.spectrum.style.left = 0;
    this.spectrum.style.borderRadius = this._line.style.borderRadius;
    var holst = this.spectrum.getContext('2d');

    var linearG = holst.createLinearGradient(0,0,this.spectrum.width, 0);
        linearG.addColorStop(0,"rgb(255,0,0)");
        linearG.addColorStop(0.01,"rgb(255,0,0)");

        linearG.addColorStop(0.1,"rgb(255,255,0)");
        linearG.addColorStop(0.11,"rgb(255,255,0)");

        linearG.addColorStop(0.3,"rgb(0, 255, 0)");
        linearG.addColorStop(0.31,"rgb(0, 255, 0)");

        linearG.addColorStop(0.5,"rgb(0, 255,255)");
        linearG.addColorStop(0.51,"rgb(0, 255,255)");

        linearG.addColorStop(0.7,"rgb(0, 0,255)");
        linearG.addColorStop(0.71,"rgb(0, 0,255)");
    
        linearG.addColorStop(0.9,"rgb(255, 0,255)");
        linearG.addColorStop(0.91,"rgb(255, 0,255)");
        linearG.addColorStop(1,"rgb(255, 0, 0)");
    
    holst.fillStyle= linearG;
    holst.fillRect(0,0, this.spectrum.width, this.spectrum.height);
    
    if(settings.anchor){
        console.log("Slider for color picker: " + settings.anchor);
        settings.anchor.addEventListener("mouseup",Up);
        settings.anchor.addEventListener("mousemove", Move);
        
    }
    
    for(var key in settings.other){
        this.style[key] = settings.other[key];
    }
    Object.defineProperty(this, "value", {
        get: function(){return this._circle.style.backgroundColor;}
    })
    this.obj.classList.add("spectrum-slider");
    this._line.obj.appendChild(this.spectrum);
    this._line.obj.appendChild(this._circle.obj);
    this.obj.appendChild(this._line.obj);
}
SliderForColorPicker.prototype.AdDaNchor = function(obj){
    if(obj.nodeType == 1){
        obj.onmousemove = this._circle.obj.onmousemove;
        obj.onmouseup = this._circle.obj.onmouseup;
    }
}
function HolstforColorSelection(settings){
    Interface.call(this, document.createElement("div"));
    settings = settings || {};
    
    this.style.position = "relative";
    this.width = settings.width || "486px";
    this.height = settings.height || "176px";
    this.style.userSelect = "none";
    this.style.cursor = "pointer";
    this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
    this.style.boxShadow = settings.boxShadow || "";
    var switcherMove = false;
    var differenceX = 0;
    var differenceY = 0;
    
    var MDown = function(e){
        switcherMove = true;
        differenceX = e.pageX;
        differenceY = e.pageY;
    }.bind(this);
    var MMove = function(e){
        if(switcherMove){
           /* console.log("HolstforColorSelection, MMove - beginMove: " + beginMove);
            console.log("HolstforColorSelection, MMove - endMoveX: " + endMoveX);
            console.log("HolstforColorSelection, MMove - endMoveY: " + endMoveY);
            console.log("HolstforColorSelection, MMove - left: " + this._circle.left);
            console.log("HolstforColorSelection, MMove - top: " + this._circle.top);
            console.log("HolstforColorSelection, IF: " + ( beginMove < this._circle.top && this._circle.top < endMoveY));*/
            
            if(beginMove < this._circle.left && this._circle.left < endMoveX)
                this._circle.left = this._circle.left + e.pageX - differenceX + "px";
            else{
                if(this._circle.left == beginMove && e.pageX > differenceX){
                    this._circle.left = this._circle.left + e.pageX - differenceX + "px";
                } else{
                    if(this._circle.left == endMoveX && e.pageX < differenceX)
                        this._circle.left = this._circle.left + e.pageX - differenceX + "px";
                    else{
                         if(this._circle.left < beginMove) this._circle.left = beginMove + "px";
                            else{
                                if(this._circle.left > endMoveX) this._circle.left = endMoveX + "px";
                            }
                    }
                }
            }
            if(beginMove < this._circle.top && this._circle.top < endMoveY){
                
                this._circle.top = this._circle.top + e.pageY - differenceY + "px";
            } else{
                if(this._circle.top == beginMove && e.pageY > differenceY){
                    this._circle.top = this._circle.top + e.pageY - differenceY + "px";
                } else{
                    if(this._circle.top == endMoveY && e.pageY < differenceY){
                        this._circle.top = this._circle.top + e.pageY - differenceY + "px";
                    } else{
                        if(this._circle.top < beginMove) this._circle.top = beginMove + "px";
                        else{ 
                            if(this._circle.top > endMoveY)
                                this._circle.top = endMoveY + "px";
                        }
                    }
                }
            }
            
            differenceX = e.pageX;
            differenceY = e.pageY;
            let dat = s.getImageData(this._circle.left + this._circle.width/2, this._circle.top + this._circle.height/2, 1, 1);
            
            this._circle.style.backgroundColor = "rgb("+ dat.data[0] +", "+ dat.data[1] +", "+ dat.data[2] +")";
            this.onchange(this.value);
            
        }
    }.bind(this);
    var MUp = function(){
        switcherMove = false;
        differenceX = 0;
        differenceY = 0;
    }.bind(this);
    this.onchange = function(a){};
    this.updata = function(color){
        
        let otherColor = s.createLinearGradient(Holst.width, 0, 0, 0);
            otherColor.addColorStop(0, color);
            otherColor.addColorStop(0.05, color);
            otherColor.addColorStop(0.2, NeedFunction.ColorPlusOpacity(color,0.85));
            otherColor.addColorStop(0.7, NeedFunction.ColorPlusOpacity(color,0.35));
            otherColor.addColorStop(1, NeedFunction.ColorPlusOpacity(color,0));
        
        s.fillStyle = WhiteToBlack;
        s.fillRect(0,0, Holst.width, Holst.height);

        s.fillStyle = otherColor;
        s.fillRect(0,0, Holst.width, Holst.height);

        s.fillStyle = BlackColor;
        s.fillRect(0,0, Holst.width, Holst.height);
        let RGBa = s.getImageData(this._circle.left + this._circle.width/2 -1, this._circle.top + this._circle.height/2, 1, 1);
        this._circle.style.backgroundColor = "rgba("+ RGBa.data[0] +", "+ RGBa.data[1] +", "+ RGBa.data[2] +", "+ RGBa.data[3] +")";
        this.onchange(this._circle.style.backgroundColor);
        
    }.bind(this);
    this.obj.onmousemove = MMove;
    this.obj.onmouseup = MUp;
    
    this._circle = new Circle({
        radius: "20px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        left: "-10px",
        top: "-10px",
        other:{border: "3px solid white"},
        mouseDown: MDown,
        mouseMove: MMove,
        mouseUp: MUp
    });
    var beginMove = -this._circle.width/2 + 1;
    var endMoveX = this.width - this._circle.width/2 - 1;
    var endMoveY = this.height - this._circle.height/2;
    
    var Holst = document.createElement("canvas");
        Holst.width = this.width;
        Holst.height = this.height;
        var s = Holst.getContext('2d');

        var WhiteToBlack = s.createLinearGradient(0, 0, 0, Holst.height);
            WhiteToBlack.addColorStop(0, "rgb(255,255,255)");
            WhiteToBlack.addColorStop(0.2, "rgb(255,255,255)");
            WhiteToBlack.addColorStop(0.5, "rgb(149, 148, 148)");
            WhiteToBlack.addColorStop(1, "rgb(0, 0, 0)");

        var RedColor = s.createLinearGradient(Holst.width, 0, 0, 0);
            RedColor.addColorStop(0, "rgb(255, 0, 0)");
            RedColor.addColorStop(0.05, "rgb(255, 0, 0)");
            RedColor.addColorStop(0.2, "rgba(252, 0, 0, 0.85)");
            RedColor.addColorStop(0.7, "rgba(252, 0, 0, 0.35)");
            RedColor.addColorStop(1, "rgba(252, 0, 0, 0.0)");

        var BlackColor = s.createLinearGradient(0, Holst.height, 0, 0);
            BlackColor.addColorStop(0, "rgba(0,0,0,1)");
            BlackColor.addColorStop(0.3, "rgba(0, 0, 0, 0.74)");
            BlackColor.addColorStop(1, "rgba(0, 0, 0, 0)");



        s.fillStyle = WhiteToBlack;
        s.fillRect(0,0, Holst.width, Holst.height);

        s.fillStyle = RedColor;
        s.fillRect(0,0, Holst.width, Holst.height);

        s.fillStyle = BlackColor;
        s.fillRect(0,0, Holst.width, Holst.height);
    
    if(settings.anchor){
        console.log("Holst for color picker: " + settings.anchor)
        settings.anchor.addEventListener("mouseup",MUp);
        settings.anchor.addEventListener("mousemove",MMove);
    }
    
    for(var key in settings.other){
        this.style[key] = settings.other[key];
    }

    Object.defineProperty(this, "value",{
        get: function(){return this._circle.style.backgroundColor}
    })
    this.obj.appendChild(Holst);
    this.obj.appendChild(this._circle.obj);
}
HolstforColorSelection.prototype = SliderForColorPicker.prototype;
HolstforColorSelection.prototype.constructor = HolstforColorSelection;

function ColorPicker(settings){
    Interface.call(this, document.createElement("div"));
    settings = settings || {};
    this.style.position = "absolute";
    this.left = settings.left || 0;
    this.top = settings.top || "0"
    this.width = settings.width || "486px";
    this.height = settings.height || "230px";
    this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
    this.style.display = "flex";
    this.style.flexFlow = "column nowrap";
    this.style.justifyContent = "flex-start";
    this.style.alignItems = "center";
    this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
    this.style.borderRadius = settings.borderRadius || "";
    this._slider = new SliderForColorPicker({width: this.width - 50 +"px", anchor: this.obj, marginTop: "20px"});
    this._holst = new HolstforColorSelection({width: this.width +"px", anchor: this.obj, boxShadow: "0px 4px 5px 1px rgba(0, 0, 0, 0.62)"});
    
    this._slider.onchange = function(Color){
        this._holst.updata(Color);
    }.bind(this);
    
    this._slider.AdDaNchor(this._holst.obj);
    this._holst.AdDaNchor(this._slider.obj);
    
   /* this.obj.ondblclick = function(){
        if(this.height > 5){
            this.style.overflow = "hidden";
            var An = setInterval(function(){
                console.log(this.height);
                this.height = this.height - 2 + "px";
                if(this.height < 5)
                    clearInterval(An);

            }.bind(this),1)
        } else{
            var An = setInterval(function(){
               this.height = this.height + 2 + "px";
                if(this.height == 240){
                    this.style.overflow = "visible";
                    clearInterval(An);
                }
            }.bind(this), 1);
        }
        
    }.bind(this);*/
    
    this.style.backgroundColor = settings.backgroundColor || "rgb(178, 234, 232)"
    
    Object.defineProperties(this, {
        color:{
        get: function(){return this._holst.value;}
        },
        onchange: {
            get: function(){return this._holst.onchange;},
            set: function(fun){
                this._holst.onchange = fun;
            }
        }
    })
    this.obj.classList.add("color-picker");
    this.obj.appendChild(this._holst.obj);
    this.obj.appendChild(this._slider.obj);
}

function ElementSwitch(anchor, settings){
    if(anchor){
        settings = settings || {};
        this.obj = settings.element || document.createElement("div")
        Interface.call(this, this.obj);
        if(!settings.element){
            this.display = settings.display || "flex";
            this.width = settings.width || "50px";
            this.height = settings.height || "50px";
            this.margin = (settings.marginTop || "0px") + " " + (settings.marginRight || "0px") + " " + (settings.marginBottom || "0px") + " " + (settings.marginLeft || "0px");
            this.background = (settings.background || settings.backgroundColor) || "rgb(183, 244, 244)";
            this.position = settings.position || "relative";
            this.left = settings.left || "0";
            this.top = settings.top || "50px";
            this.border = settings.border || "0";
            this.borderRadius = settings.borderRadius || this.width + "px";
            this.cursor = settings.cursor || "pointer";
            this.style.justifyContent = settings.justifyContent || "center";
            this.style.alignItems = settings.alignItems || "center";
            this.obj.appendChild(document.createTextNode(settings.message || "Word"));
        }
        
        var Actions;
        if(anchor.associationCube){
            Actions = {
                height: anchor.height,
                width: anchor.width,
                switch: settings.switch || false,
                An: 0,
                Top: function(){
                    if(Actions.switch){
                        Actions.switch = false;
                        Actions.An = setInterval(function(){
                            anchor.height = anchor.height - 1 + "px";
                            if(anchor.height == 0){
                                clearInterval(Actions.An);
                                Actions.An = 0;
                            }
                        }.bind(this),1);
                    } else{
                        Actions.switch = true;
                        Actions.An = setInterval(function(){
                            anchor.height = anchor.height + 1 + "px";
                            if(anchor.height == Actions.height){
                                clearInterval(Actions.An);
                                Actions.An = 0;
                            }
                        }.bind(this), 1);
                    }
                }.bind(this),
                Hide: function(){
                    if(anchor.style.opacity == 1){
                        console.log(anchor.height);
                        console.log(Actions.height);
                        Actions.switch = false;
                        Actions.An = setInterval(function(){
                            //console.log(anchor.style.opacity)
                            anchor.style.opacity = anchor._style.opacity - 0.01;
                            if(anchor.style.opacity <= 0){
                                clearInterval(Actions.An);
                                Actions.An = 0;
                                anchor.height = 0;
                        anchor.overflow = "hidden";
                            }
                        }.bind(this), 1);
                    } else{
                        Actions.switch = true;
                        console.log("anchor: "+anchor.height);
                        console.log(Actions.height);
                        Actions.An = setInterval(function(){
                            anchor.height = Actions.height + "px";
                            anchor.overflow = "visible";
                            anchor.style.opacity = +anchor._style.opacity + 0.01;
                            if(anchor.style.opacity >= 1){
                                clearInterval(Actions.An);
                                Actions.An = 0;                                
                            }
                        }.bind(this), 1);
                    }
                }.bind(this)
            };
            if(settings.parent)
                anchor.obj.appendChild(this.obj);
        } else{
            
            anchor.parentNode.appendChild(this.obj);
        }
        this.obj.onclick = function(){
            if(Actions.An == 0)
                Actions.Hide();
        }.bind(this);
        console.log(anchor.parentNode)
    } else throw new Error("costructor: ElementSwitch");
    
}