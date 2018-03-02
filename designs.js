//Global variables
const table = $("#pixelCanvas");
let pickedColor = "#009688";
let resetB = $("#reset");
let height;
let width;
const toast = $("#toast");
const danceB = $("#dance");
const secret = $("#secret");
const instruct = $("#instruct");
secret.hide();
instruct.hide();
var interval = null;

/*----------------------listening for events-----------------------*/
$("button").click(function() {
  console.log(this.id); // or alert($(this).attr('id'));
});

//taking Grid size
$("#sizePicker").submit(function(event) {
  event.preventDefault();
  makeGrid();
});

//picking Color
$("#colorPicker").on("change", function() {
  pickedColor = $(this).val();
});

//listening for box click
table.on("click", "td", function() {

  $(this).css("background-color", pickedColor);
});

//dblclick
$("body").on("dblclick", "td", function() {

  $(this).css("background-color", "#0000");
});

/* https://stackoverflow.com/questions/2349764/jquery-is-mousedown-on-mouseover  */

isMouseDown = false;
table.mousedown(function() {

    isMouseDown = true;

  })
  .mouseup(function() {
    isMouseDown = false;
  });

table.on("mouseenter", "td", function() {
  if (isMouseDown) {
    $(this).css("background-color", pickedColor);
  }
});

table.on("mouseenter", "td", function() {
  if (isMouseDown) {
    if (event.which == 3) {
      $(this).css("background-color", "#0000");
    }
  }
});
/*https://stackoverflow.com/questions/2349764/jquery-is-mousedown-on-mouseover*/

//reset button click listening
resetB.click(function(event) {
  event.preventDefault();
  clearGrid();
  //history.go(0);

});

//lets dance
danceB.click(function() {
  danceB.attr('disabled', 'disabled');
  interval = setInterval(function() {

    td();
  }, 500);


});


//show hide instructions
$("#instructB").click(function() {
  instruct.toggle();
});
/*----------------------listening for events ends-----------------------*/

/*----------------------functions starts-----------------------*/

//makeing Grid
function makeGrid() {
  console.log("i am called");
  table.empty();
  height = $("#inputHeight").val();

  width = $("#inputWeight").val();

  for (let row = 0; row < height; row++) {

    let tr = $("<tr></tr>");

    for (let cell = 0; cell < width; cell++) {
      tr.append("<td></td>");
    }

    table.append(tr);

  }

  secret.show();
  Toast();
}

//clearing Grid
function clearGrid() {
  $("td").each(function() {

    $(this).css("background-color", "#0000");
  });
  console.log("clearing");
  danceB.removeAttr('disabled');
  secret.hide();
  slider.value = 20;
  $("tr").css("height", 20);
  $("td").css("width", 20);

  if (interval) {
    clearInterval(interval);
  }

  Toast();
}

//where magic happens
//  Math.floor(Math.random() * 16777215).toString(16) taken from internet
function td() {
  if ($("td")) {
    $("td").each(function() {
      $(this).css("background-color", '#' + Math.floor(Math.random() * 16777215).toString(16));
    });
  }
}

//slider
let slider = document.getElementById("myRange");
slider.oninput = function getvalue(value) {
  value = this.value;
  $("tr").css("height", value);
  $("td").css("width", value);
}

//letting user know
function Toast() {
  toast.show();
  setTimeout(function() {
    toast.hide();
  }, 700);
}
/*----------------------functions-----------------------*/
