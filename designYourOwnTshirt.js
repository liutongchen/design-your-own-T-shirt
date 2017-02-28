window.onload = function() {
    var previewButton = document.getElementById("previewButton");
    previewButton.onclick = previewHandler;
};

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    drawTshirt(canvas, context);
    fillBackgroundColor(canvas, context);
    
    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;
    if (shape !== "none") {
        for (var i = 0; i < 20; i++) {
            drawShape(canvas, context, shape);
        }
    };
    
    drawText(canvas, context);
    drawPic(canvas, context);
}

function drawTshirt(canvas, context) {
    var selectObj = document.getElementById("tshirtColor");
    var index = selectObj.selectedIndex;
    var tshirtColor = selectObj[index].value;
    context.fillStyle = tshirtColor;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(450, 30);
    context.quadraticCurveTo(500, 100, canvas.width-450, 30);
    context.lineTo(canvas.width-200, 75);
    context.lineTo(canvas.width-100, 200);
    context.lineTo(canvas.width-175, 250);
    context.lineTo(canvas.width-200, 230);
    context.lineTo(canvas.width-200, canvas.height-30);
    context.lineTo(200, canvas.height-30);
    context.lineTo(200, 230);
    context.lineTo(175, 250);
    context.lineTo(100, 200);
    context.lineTo(200, 75);
    context.closePath();
    context.stroke();
    context.fill();
};

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;

    context.fillStyle = bgColor;
    context.fillRect(250, 175, canvas.width-500, 200);
    context.strokeStyle="black";
    context.strokeRect(250, 175, canvas.width-500, 200);
};

function drawShape(canvas, context, shape) {
    var isOutofCanvas = true;
    while (isOutofCanvas) {
        var shapeWidth = 30;
        var w = Math.floor(Math.random() * shapeWidth);
        var x = Math.floor(Math.random() * (canvas.width-500) + 250);
        var y = Math.floor(Math.random() * 200 + 175);
        isOutofCanvas = isBeyondCanvas(shapeWidth, x, y, canvas);
    }
    
    context.fillStyle = "lightblue";

    if (shape === "circles") {
        context.beginPath();
        context.arc(x, y, w, 0, degreeToRadians(360), true);
        context.fill();
    } else if (shape === "squares") {
        context.fillRect(x, y, w, w);
    }
};

function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;
    var selectText = document.getElementById("text");
    var index = selectText.selectedIndex;
    var text = selectText[index].value;
    
    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    if (text.length > 50) {
        var textArray = splitIntoLines(canvas, text);
        for (var i = 0; i < textArray.length; i++) {
            context.fillText(textArray[i], 280, 240+(i*25));        
        }
    } else {
        context.fillText(text, 280, 265);
    }
};

function drawPic(canvas, context) {
    var pic = new Image();
    pic.src = "http://vignette3.wikia.nocookie.net/southpark/images/9/9e/Eric_cartman.png/revision/latest?cb=20161207153635";
    pic.onload = function() {
        context.drawImage(pic, canvas.width-250-110, 300, 80, 70);
    }
};

/*TO USE QUOTES FROM THE WEBSITE, UNCOMMENT THIS
function updateText(textsArray) {
    var textSelection = document.getElementById("text");

    for (var i = 0; i < textsArray.length; i++) {
        var textObj = textsArray[i];
        var option = document.createElement("option");
        option.text = textObj.text;
        option.value = option.text.replace("\"", "'");
        textSelection.options.add(option);
    }

    textSelection.selectedIndex = 0;
}
*/

//helper functions
function degreeToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function isBeyondCanvas(shapeWidth, x, y, canvas) {
    if ((x-shapeWidth) > 250 && (x+shapeWidth) < (canvas.width-250)
        && (y-shapeWidth) > 175 && (y+shapeWidth) < 375) {
        return false;
    } else {
        return true;
    }
}

function splitIntoLines(canvas, text) {
    //split a text longer than 50 into an array. Mind the space.
    var textArray = [];
    var interval = 50;
    var space1 = text.indexOf(" ", interval);
    textArray[0] = text.substring(0, space1);
    if (text.substring(space1) > interval) {
        var space2 = text.indexOf(" ", interval);
        textArray[1] = text.substring(space1, space2);
        textArray[2] = text.substring(space2);
    } else {
        textArray[1] = text.substring(space1);
    }
    return textArray;
}