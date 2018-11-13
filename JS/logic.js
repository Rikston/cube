var cube;
var cube1;
var Panel;
var Panel1;

window.onload = function(e){
    var containers = document.getElementsByClassName("container");
    cube = new Cube($(".container:eq(0)").get(0), { 
        width: "30px",
        height: "30px",
        backgroundColor: "rgba(19, 64, 185, 0)"});
    cube1 = new Cube($(".container:eq(1)").get(0), {
        width: "300px",
        height: "300px",
        backgroundColor: "rgba(69, 39, 39, 0.5)"
    });
    Panel = new SettingsPanel({anchor: $(".container:eq(2)").get(0)});
    Panel1 = new SettingsPanel({height: "300px", type: "other", backgroundColor_:"rgba(0,0,0,0)", alignSelf: "flex-start", overflowY: "hidden"});
    Panel.Add(new Slider({marginLeft: "10px"}));
    Panel.Add(new Slider({marginLeft: "50px"}));
    Panel.Add(new Slider({marginLeft: "30px"}));
    Panel.Add(new Switcher({marginLeft: "20px"}));
    Panel1.Add(new ColorPicker({
        width: "486px",
        //marginTop: "280px",
        height: "240px",
        backgroundColor:"rgb(75, 75, 75)",
        borderRadius: "2px"
    }));
    Panel.Add(Panel1);
    Panel1.Add(new Slider({marginTop: "50px", marginBottom:"20px"}));
    //Panel.Add(new Slider({type:"vertical", marginTop: "150px"}));
   // Panel.Add(new SliderForColorPicker({anchor: Panel.obj}));
    //Panel.Add(new HolstforColorSelection({anchor: document.body}));
   // Panel.Add();
    Panel.tools[0].onvaluechange = function(){
        //console.log(anchor.ForChanging.sides[0]._style.backgroundColor);
        //console.log(NeedFunction.ColorPlusOpacity(anchor.ForChanging.sides[0]._style.backgroundColor.__GetValueColor(), this.left/endMove));
        for(var i = 0; i < cube.sides.length; ++i){
           cube.sides[i].style.backgroundColor = NeedFunction.ColorPlusOpacity(cube.sides[i]._style.backgroundColor.__GetValueColor(), this.value/100); 
        }
    }
    
    Panel.tools[1].onvaluechange = function(){
        for(var i = 0; i < cube1.sides.length; ++i){
            cube1.sides[i].style.backgroundColor = NeedFunction.ColorPlusOpacity(cube1.sides[i]._style.backgroundColor.__GetValueColor(), this.value/100); 
        }
    }
   
    Panel.tools[2].onvaluechange = function(){
        console.log("PreviousValue: " + this.previousValue + ", Now value: " + this.value);  
    }
    
   
    Panel.tools[3].onvaluechange = function(a){
        console.log(this.value);
    }
  /*  Panel.tools[4].onchange = function(color){
        for(var i = 0; i < cube.sides.length; ++i){
            cube.sides[i].style.backgroundColor = NeedFunction.ColorPlusOpacity(color,Panel.tools[0].value/100);
        }
    }*/
}
