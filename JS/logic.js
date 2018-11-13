var cube;
var cube1;
var Panel;
var Panel1;
var cube = new Cube(document.getElementsByClassName("container")[0]);
var Panel = new SettingsPanel();
var Opacity = new Slider({ type: "horizontal", marginLeft: "20px" });
var BFV = new Switcher({ marginLeft: "20px", switch: true });
var CP = new ColorPicker({ marginLeft: "0", left: "80px", top: "80px" });
CP.style.opacity = 0;
window.onload = function() {
  Opacity._circle.left = "124px";
  Opacity.onchange = function(value) {
    console.log(value);
    console.log(cube.sides.length);
    console.log(
      NeedFunction.ColorPlusOpacity(
        cube.sides[0].style.backgroundColor,
        value / 100
      )
    );
    for (var i = 0; i < cube.sides.length; ++i) {
      cube.sides[i].style.backgroundColor = NeedFunction.ColorPlusOpacity(
        cube.sides[i].style.backgroundColor,
        value / 100
      );
    }
  };
  BFV.onchange = function(value) {
    for (var i = 0; i < cube.sides.length; ++i) {
      if (value) cube.sides[i].style.backfaceVisibility = "visible";
      else cube.sides[i].style.backfaceVisibility = "hidden";
    }
  };

  CP.onchange = function(value) {
    for (var i = 0; i < cube.sides.length; ++i) {
      cube.sides[i].style.backgroundColor = NeedFunction.ColorPlusOpacity(
        value,
        Opacity.value / 100
      );
    }
  };

  // document.body.appendChild(CP1.obj);

  var EL = new ElementSwitch(CP, {
    type: "Top",
    switch: true,
    left: 0,
    top: "0",
    backgroundColor: "#a73434",
    width: "140px",
    height: "70px",
    borderRadius: "150px 150px 10px 10px"
  });
  Panel.Add(Opacity);
  Panel.Add(BFV);
  Panel.Add(EL);
  Panel.Add(CP);
};
