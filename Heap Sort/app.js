var table = document.getElementById("tab")
var table1 = document.getElementById("tab1")
table1.style.display = "none"
var arr = [];
var res = []


var i, j; // variables for sorting algorithm
var width = 1108;

var ind;
var m;

var j = 0
var last;

var s1 = false;
var s2 = false;
var s3 = false;
var s4 = false;

var sorting = false;

var maxKey = 1;

var startTimer;
var milSec;

var canv = document.getElementById("paint");
var ctx = canv.getContext("2d");
ctx.font = "bold 20px Serif";

var iIndex = new index(1);
var iiIndex = new index(2);


// regular key object with key value as parameter.
// setKey function should be used to change key's value for visual effects.
// graphics function draws rectangle with height according to the key's value.
function key(key) {
    this.key = key;

    this.x = 600;
    this.y = 100;
    this.radius = 15;
    this.bottom = 500;
    this.insetX;
    this.insetY = 6;
    this.gap;

    this.sorted = false;

    this.father;
    this.leftson;
    this.rightson;

    this.edge;

    this.setKey = setKey;
    this.graphics = graphics;

    this.setKey(this.key);

    function setKey(value) {
        this.key = value;
        if (this.key > 9) {
            if (this.key > 99) {
                this.key = 99;
            }
            this.insetX = 9;
        }
        else {
            if (this.key < 1) {
                this.key = 1;
            }
            this.insetX = 4;
        }
    }

    function graphics() {


        var myGradient = ctx.createLinearGradient(this.x - this.radius, this.x - this.radius, this.x + this.radius, this.x - this.radius);
        myGradient.addColorStop(0, "#BA0000");
        myGradient.addColorStop(1, "#560000");
        ctx.fillStyle = myGradient;

        if (!this.sorted) {
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            ctx.fillStyle = "black";
        }
        else {
            ctx.fillStyle = "red";
        }
        ctx.fillText(this.key, this.x - this.insetX, this.y + this.insetY);
    }
}

// index to show what exactly the algorithm is currently doing
// graphics function draws the name at the given location, 
// however, not when user selected fast sorting.
function index(type) {
    this.type = type;
    this.y = 50;
    this.x = 0;
    this.size = 30;
    this.visible = false;

    this.graphics = graphics;

    function graphics() {
        if (this.visible && this.type != 0) {

            if (this.type == 1) {
                ctx.strokeStyle = "blue";
            }
            else if (this.type == 2) {
                ctx.strokeStyle = "red";
            }

            ctx.strokeRect(this.x - 15, this.y - 15, this.size, this.size);

        }
    }
}

function edge(a) {
    this.a = a;
    this.x1;
    this.x2;
    this.x3;
    this.x4;
    this.y1;
    this.y2;
    this.y3;
    this.y4;

    this.updateEdge = updateEdge;
    this.graphics = graphics;

    this.updateEdge();

    function updateEdge() {
        if (this.a.leftson != undefined) {
            this.x1 = this.a.x;
            this.y1 = this.a.y + this.a.radius;
            this.x2 = this.a.leftson.x;
            this.y2 = this.a.leftson.y - this.a.radius;
        }
        if (this.a.rightson != undefined) {
            this.x3 = this.a.x;
            this.y3 = this.a.y + this.a.radius;
            this.x4 = this.a.rightson.x;
            this.y4 = this.a.rightson.y - this.a.radius;
        }

    }

    function graphics() {
        ctx.strokeStyle = "gray";
        if (a.leftson != undefined && !a.leftson.sorted) {
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.stroke();
        }
        if (a.rightson != undefined && !a.rightson.sorted) {
            ctx.beginPath();
            ctx.moveTo(this.x3, this.y3);
            ctx.lineTo(this.x4, this.y4);
            ctx.stroke();
        }

    }
}

// adds a new key to the array with a value of the input field.
function add() {
    if (arr.length < 63) {
        var t = Math.floor(Number(document.getElementById("inputField").value));
        t = t || 1;

        var x = new key(t);

        arr[arr.length] = x;
        updateLocation(20);
    }
    document.getElementById("inputField").value = "";
}

// adds 10 keys with a random value to the array.
function addRandom() {
    var start = arr.length;
    var end = start + 10;
    if (end > 63) {
        end = 63;
    }
    if (start < 63) {
        for (var index = start; index < end; index++) {
            var x = new key(Math.ceil(Math.random() * 99));

            arr[index] = x;
            updateLocation(20);
        }
    }
}

function setup(mil) {
    i = Math.round((arr.length - 1) / 2) - 1;
    milSec = mil;

    s1 = true;
    s2 = false;
    s3 = true;
    s4 = true;

    iIndex.visible = true;
    iiIndex.visible = true;
}

//Called when new key is added.
//Sets x-cord and y-cord according to position in arr.
function updateLocation(width) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].x = 100 + i * width * 2;
        if (i >= 50) {
            arr[i].x = 100 + (i - 50) * width * 2;
            arr[i].y = 200;
        }
        else if (i >= 25) {
            arr[i].x = 100 + (i - 25) * width * 2;
            arr[i].y = 150;
        }
    }
    paintAllComponents();
}

// paints all components.
function paintAllComponents() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    for (var index = 0; index < arr.length; index++) {
        arr[index].graphics();
        if (arr[index].edge != undefined) {
            arr[index].edge.graphics();
        }
    }

    if (sorting) {
        iIndex.graphics();
        iiIndex.graphics();
    }
}

//initiates the execution of the sorting algorithm.
function initSort() {
    table1.style.display = "block"
    table1.style.margin = "auto"
    for (let i = 0; i < 6; i++) {
        var t = Number(table.rows[0].cells[i].children[0].value);
        t = t || 1;

        var x = new key(t);

        arr[i] = x
        // x.rows[0].cells[i].children[0].disabled = true;
    }
    console.log(arr);
    let n = arr.length;
    if (arr.length > 1) {
        try {

            setup(500);

            setRelations();

            //  changeButtonVisibility();
            sorting = true;

            last = arr[arr.length - 1].y;
            // timer that calls the heapSort function every 500 milSec. 
            startTimer = setInterval(function () { heapSort(); }, milSec);

        } catch (error) {
            alert(error + "\n" + error.stack);
        }
    }
}

//Sets the gaps and all relations (father, left son, right son) for every key of array arr. 
//The gap is important for their x-cords. A father's gap is always 
//twice as high as his children's gaps. 
function setRelations() {
    arr[0].gap = Math.round(width / 2);
    for (var i = 0; i < arr.length; i++) {
        if ((i * 2 + 1) < arr.length)
            arr[i].leftson = arr[i * 2 + 1];
        if ((i * 2 + 2) < arr.length)
            arr[i].rightson = arr[i * 2 + 2];
        if (i > 0)
            arr[i].father = arr[Math.ceil(i / 2) - 1];
        else
            arr[0].father = arr[0];
        arr[i].gap = arr[i].father.gap / 2;
    }
    displayHeap();
}

//Sets x-cords, y-cords and edges for every key of array arr. 
//Y-cord starts at 200 at root and increases by 50 for every level.
//The x-cord of a key is father's x-cord minus father's gap for left son and
//father's x-cord plus father's gap for right son.
function displayHeap() {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].father == arr[i]) {
            arr[i].x = width / 2;
            arr[i].y = 100;
        }
        else {
            if (arr[i] == arr[i].father.leftson)
                arr[i].x = arr[i].father.x - arr[i].father.gap;
            else if (arr[i] == arr[i].father.rightson)
                arr[i].x = arr[i].father.x + arr[i].father.gap;

            arr[i].y = arr[i].father.y + 50;
        }
    }

    for (var ii = 0; ii < arr.length; ii++)
        arr[ii].edge = new edge(arr[ii]);
}

function heapSort() {
    if (s1) { // first for loop
        if (i >= 0) {	// condition in first for loop
            if (s3) { // initialize parameters 
                ind = i;
                m = arr.length - 1;
                iIndex.x = arr[i].x;
                iIndex.y = arr[i].y;
                iiIndex.x = arr[ind].x;
                iiIndex.y = arr[ind].y;
                paintAllComponents();
                s3 = false;
            }
            else if (2 * ind + 1 <= m) { // start heapify
                j = 2 * ind + 1;
                if (j < m) {
                    if (arr[j].key < arr[j + 1].key) {
                        j++;
                    }
                }
                if (arr[ind].key < arr[j].key) {
                    swapKeys(arr[ind], arr[j]);
                    ind = j;
                    iiIndex.x = arr[ind].x;
                    iiIndex.y = arr[ind].y;
                    paintAllComponents();
                }
                else {
                    ind = m;
                } // end heapify
            }
            else { // one iteration is done
                i--;
                s3 = true;
            }
        }
        else { // loop is done
            i = arr.length - 1;
            iIndex.x = arr[0].x;
            iIndex.y = arr[0].y;
            paintAllComponents();
            s1 = false;
            s2 = true;
            s4 = true;
        }
    }
    else if (s2) { // second for loop
        if (i >= 0) { // condition in second for loop
            if (s4) { // swap keys, remove the sorted key and initialize parameters 
                swapKeys(arr[i], arr[0]);
                arr[i].sorted = true;
                removeSortedKey(i, arr.length - 1, last);
                console.log(res);
                ind = 0;
                m = i - 1;
                iiIndex.x = arr[ind].x;
                iiIndex.y = arr[ind].y;
                paintAllComponents();
                s4 = false;
            }
            else if (2 * ind + 1 <= m) { // start heapify
                j = 2 * ind + 1;
                if (j < m) {
                    if (arr[j].key < arr[j + 1].key) {
                        j++;
                    }
                }
                if (arr[ind].key < arr[j].key) {
                    swapKeys(arr[ind], arr[j]);
                    ind = j;
                    iiIndex.x = arr[ind].x;
                    iiIndex.y = arr[ind].y;
                    paintAllComponents();
                }
                else {
                    ind = m;
                } // end heapify
            }
            else { // one iteration is done
                i--;
                s4 = true;
            }
        }
        else { // second loop done and sorted
            clearInterval(startTimer);
            //  makeAllButtonsInvisible();
            setTimeout(function () { stopAndClear(); }, 3000);
        }
    }
    console.log(res);
    for (let p = 0; p < res.length; p++) {
        table1.rows[0].cells[p].children[0].value = res[p]
    }
}
// Doesn't actually remove a key from heap, just changes display of heap. 
// Sorted Key is aligned to the right bottom corner.
// 25 keys per row.
function removeSortedKey(i, n, last) {
    res.push(arr[i].key)
    if (n - i < 25) {
        arr[i].x = 100 + (25 - (n - i)) * 40;
        arr[i].y = last + 50;
    }
    else if (n - i < 50) {
        arr[i].x = 100 + (25 - (n - i - 25)) * 40;
        arr[i].y = last;
    }
    else {
        arr[i].x = 100 + (25 - (n - i - 50)) * 40;
        arr[i].y = last - 50;
    }
}

function swapKeys(a, b) {
    var tempKey = a.key;
    a.setKey(b.key);
    b.setKey(tempKey);
}



// pauses the algorithm or continues it. 
function pausePlay() {
    if (sorting) {
        clearInterval(startTimer);
        sorting = false;
    }
    else {
        sorting = true;
        startTimer = setInterval(function () { heapSort(); }, milSec);
    }

}

// resets everything. 
function stopButton() {
    sorting = true;
    stopAndClear();
}

// stops the timer and resets all variables to their initial settings. 
function stopAndClear() {
    clearInterval(startTimer);
    ctx.clearRect(0, 0, canv.width, canv.height);

    i = 0;
    maxKey = 1;
    arr.splice(0, arr.length);

    s1 = true;
    s2 = false;
    s3 = true;
    s4 = true;

    iIndex.visible = false;
    iiIndex.visible = false;

    sorting = false;
}

//function heapSort() {
//	var last = arr[arr.length-1].y;
//	for (var i = Math.floor(arr.length/2); i >= 0; i--){	
//		heapify(i, arr.length-1);	
//	}
//	for (var i = arr.length-1; i >= 0; i--) { 		
//		swapKeys(arr[i], arr[0]);
//		arr[i].sorted = true;
//		removeSortedKey(i, arr.length-1, last);
//		heapify(0, i - 1);
//	}
//	paintAllComponents();
//}
//function heapify(i, m) {
//	var j;
//	while (2*i+1 <= m) {
//			j = 2*i+1; 
//		if (j < m) { 
//			if (arr[j].key < arr[j+1].key)
//				j++; 
//		}
//		if (arr[i].key < arr[j].key) {
//			swapKeys(arr[i], arr[j]);
//			paintAllComponents();
//			i = j;
//		} else
//			i = m;
//	}
//}

var snowStorm = (function (window, document) {
    this.autoStart = true;
    this.excludeMobile = true;
    this.flakesMax = 128;
    this.flakesMaxActive = 64;
    this.animationInterval = 50;
    this.useGPU = true;
    this.className = null;
    this.excludeMobile = true;
    this.flakeBottom = null;
    this.followMouse = false;
    this.snowColor = "#fff";
    this.snowCharacter = "&bull;";
    this.snowStick = true;
    this.targetElement = null;
    this.useMeltEffect = true;
    this.useTwinkleEffect = false;
    this.usePositionFixed = false;
    this.usePixelPosition = false;
    this.freezeOnBlur = true;
    this.flakeLeftOffset = 0;
    this.flakeRightOffset = 0;
    this.flakeWidth = 8;
    this.flakeHeight = 8;
    this.vMaxX = 5;
    this.vMaxY = 4;
    this.zIndex = 0;
    var storm = this,
        features,
        isIE = navigator.userAgent.match(/msie/i),
        isIE6 = navigator.userAgent.match(/msie 6/i),
        isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
        isBackCompatIE = isIE && document.compatMode === "BackCompat",
        noFixed = isBackCompatIE || isIE6,
        screenX = null,
        screenX2 = null,
        screenY = null,
        scrollY = null,
        docHeight = null,
        vRndX = null,
        vRndY = null,
        windOffset = 1,
        windMultiplier = 2,
        flakeTypes = 6,
        fixedForEverything = false,
        targetElementIsRelative = false,
        opacitySupported = (function () {
            try {
                document.createElement("div").style.opacity = "0.5";
            } catch (e) {
                return false;
            }
            return true;
        })(),
        didInit = false,
        docFrag = document.createDocumentFragment();
    features = (function () {
        var getAnimationFrame;
        function timeoutShim(callback) {
            window.setTimeout(callback, 1000 / (storm.animationInterval || 20));
        }
        var _animationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            timeoutShim;
        getAnimationFrame = _animationFrame
            ? function () {
                return _animationFrame.apply(window, arguments);
            }
            : null;
        var testDiv;
        testDiv = document.createElement("div");
        function has(prop) {
            var result = testDiv.style[prop];
            return result !== undefined ? prop : null;
        }
        var localFeatures = {
            transform: {
                ie: has("-ms-transform"),
                moz: has("MozTransform"),
                opera: has("OTransform"),
                webkit: has("webkitTransform"),
                w3: has("transform"),
                prop: null,
            },
            getAnimationFrame: getAnimationFrame,
        };
        localFeatures.transform.prop =
            localFeatures.transform.w3 ||
            localFeatures.transform.moz ||
            localFeatures.transform.webkit ||
            localFeatures.transform.ie ||
            localFeatures.transform.opera;
        testDiv = null;
        return localFeatures;
    })();
    this.timer = null;
    this.flakes = [];
    this.disabled = false;
    this.active = false;
    this.meltFrameCount = 20;
    this.meltFrames = [];
    this.setXY = function (o, x, y) {
        if (!o) {
            return false;
        }
        if (storm.usePixelPosition || targetElementIsRelative) {
            o.style.left = x - storm.flakeWidth + "px";
            o.style.top = y - storm.flakeHeight + "px";
        } else if (noFixed) {
            o.style.right = 100 - (x / screenX) * 100 + "%";
            o.style.top = Math.min(y, docHeight - storm.flakeHeight) + "px";
        } else {
            if (!storm.flakeBottom) {
                o.style.right = 100 - (x / screenX) * 100 + "%";
                o.style.bottom = 100 - (y / screenY) * 100 + "%";
            } else {
                o.style.right = 100 - (x / screenX) * 100 + "%";
                o.style.top = Math.min(y, docHeight - storm.flakeHeight) + "px";
            }
        }
    };
    this.events = (function () {
        var old = !window.addEventListener && window.attachEvent,
            slice = Array.prototype.slice,
            evt = {
                add: old ? "attachEvent" : "addEventListener",
                remove: old ? "detachEvent" : "removeEventListener",
            };
        function getArgs(oArgs) {
            var args = slice.call(oArgs),
                len = args.length;
            if (old) {
                args[1] = "on" + args[1]; // prefix
                if (len > 3) {
                    args.pop(); // no capture
                }
            } else if (len === 3) {
                args.push(false);
            }
            return args;
        }
        function apply(args, sType) {
            var element = args.shift(),
                method = [evt[sType]];
            if (old) {
                element[method](args[0], args[1]);
            } else {
                element[method].apply(element, args);
            }
        }
        function addEvent() {
            apply(getArgs(arguments), "add");
        }
        function removeEvent() {
            apply(getArgs(arguments), "remove");
        }
        return {
            add: addEvent,
            remove: removeEvent,
        };
    })();
    function rnd(n, min) {
        if (isNaN(min)) {
            min = 0;
        }
        return Math.random() * n + min;
    }
    function plusMinus(n) {
        return parseInt(rnd(2), 10) === 1 ? n * -1 : n;
    }
    this.randomizeWind = function () {
        var i;
        vRndX = plusMinus(rnd(storm.vMaxX, 0.2));
        vRndY = rnd(storm.vMaxY, 0.2);
        if (this.flakes) {
            for (i = 0; i < this.flakes.length; i++) {
                if (this.flakes[i].active) {
                    this.flakes[i].setVelocities();
                }
            }
        }
    };
    this.scrollHandler = function () {
        var i;
        scrollY = storm.flakeBottom
            ? 0
            : parseInt(
                window.scrollY ||
                document.documentElement.scrollTop ||
                (noFixed ? document.body.scrollTop : 0),
                10
            );
        if (isNaN(scrollY)) {
            scrollY = 0;
        }
        if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
            for (i = 0; i < storm.flakes.length; i++) {
                if (storm.flakes[i].active === 0) {
                    storm.flakes[i].stick();
                }
            }
        }
    };
    this.resizeHandler = function () {
        if (window.innerWidth || window.innerHeight) {
            screenX = window.innerWidth - 16 - storm.flakeRightOffset;
            screenY = storm.flakeBottom || window.innerHeight;
        } else {
            screenX =
                (document.documentElement.clientWidth ||
                    document.body.clientWidth ||
                    document.body.scrollWidth) -
                (!isIE ? 8 : 0) -
                storm.flakeRightOffset;
            screenY =
                storm.flakeBottom ||
                document.documentElement.clientHeight ||
                document.body.clientHeight ||
                document.body.scrollHeight;
        }
        docHeight = document.body.offsetHeight;
        screenX2 = parseInt(screenX / 2, 10);
    };
    this.resizeHandlerAlt = function () {
        screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
        screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
        screenX2 = parseInt(screenX / 2, 10);
        docHeight = document.body.offsetHeight;
    };
    this.freeze = function () {
        if (!storm.disabled) {
            storm.disabled = 1;
        } else {
            return false;
        }
        storm.timer = null;
    };
    this.resume = function () {
        if (storm.disabled) {
            storm.disabled = 0;
        } else {
            return false;
        }
        storm.timerInit();
    };
    this.toggleSnow = function () {
        if (!storm.flakes.length) {
            storm.start();
        } else {
            storm.active = !storm.active;
            if (storm.active) {
                storm.show();
                storm.resume();
            } else {
                storm.stop();
                storm.freeze();
            }
        }
    };
    this.stop = function () {
        var i;
        this.freeze();
        for (i = 0; i < this.flakes.length; i++) {
            this.flakes[i].o.style.display = "none";
        }
        storm.events.remove(window, "scroll", storm.scrollHandler);
        storm.events.remove(window, "resize", storm.resizeHandler);
        if (storm.freezeOnBlur) {
            if (isIE) {
                storm.events.remove(document, "focusout", storm.freeze);
                storm.events.remove(document, "focusin", storm.resume);
            } else {
                storm.events.remove(window, "blur", storm.freeze);
                storm.events.remove(window, "focus", storm.resume);
            }
        }
    };
    this.show = function () {
        var i;
        for (i = 0; i < this.flakes.length; i++) {
            this.flakes[i].o.style.display = "block";
        }
    };
    this.SnowFlake = function (type, x, y) {
        var s = this;
        this.type = type;
        this.x = x || parseInt(rnd(screenX - 20), 10);
        this.y = !isNaN(y) ? y : -rnd(screenY) - 12;
        this.vX = null;
        this.vY = null;
        this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8];
        this.vAmp = this.vAmpTypes[this.type] || 1;
        this.melting = false;
        this.meltFrameCount = storm.meltFrameCount;
        this.meltFrames = storm.meltFrames;
        this.meltFrame = 0;
        this.twinkleFrame = 0;
        this.active = 1;
        this.fontSize = 10 + (this.type / 5) * 10;
        this.o = document.createElement("div");
        this.o.innerHTML = storm.snowCharacter;
        if (storm.className) {
            this.o.setAttribute("class", storm.className);
        }
        this.o.style.color = storm.snowColor;
        this.o.style.position = fixedForEverything ? "fixed" : "absolute";
        if (storm.useGPU && features.transform.prop) {
            this.o.style[features.transform.prop] = "translate3d(0px, 0px, 0px)";
        }
        this.o.style.width = storm.flakeWidth + "px";
        this.o.style.height = storm.flakeHeight + "px";
        this.o.style.fontFamily = "arial,verdana";
        this.o.style.cursor = "default";
        this.o.style.overflow = "hidden";
        this.o.style.fontWeight = "normal";
        this.o.style.zIndex = storm.zIndex;
        docFrag.appendChild(this.o);
        this.refresh = function () {
            if (isNaN(s.x) || isNaN(s.y)) {
                return false;
            }
            storm.setXY(s.o, s.x, s.y);
        };
        this.stick = function () {
            if (
                noFixed ||
                (storm.targetElement !== document.documentElement &&
                    storm.targetElement !== document.body)
            ) {
                s.o.style.top = screenY + scrollY - storm.flakeHeight + "px";
            } else if (storm.flakeBottom) {
                s.o.style.top = storm.flakeBottom + "px";
            } else {
                s.o.style.display = "none";
                s.o.style.bottom = "0%";
                s.o.style.position = "fixed";
                s.o.style.display = "block";
            }
        };
        this.vCheck = function () {
            if (s.vX >= 0 && s.vX < 0.2) {
                s.vX = 0.2;
            } else if (s.vX < 0 && s.vX > -0.2) {
                s.vX = -0.2;
            }
            if (s.vY >= 0 && s.vY < 0.2) {
                s.vY = 0.2;
            }
        };
        this.move = function () {
            var vX = s.vX * windOffset,
                yDiff;
            s.x += vX;
            s.y += s.vY * s.vAmp;
            if (s.x >= screenX || screenX - s.x < storm.flakeWidth) {
                s.x = 0;
            } else if (vX < 0 && s.x - storm.flakeLeftOffset < -storm.flakeWidth) {
                s.x = screenX - storm.flakeWidth - 1;
            }
            s.refresh();
            yDiff = screenY + scrollY - s.y + storm.flakeHeight;
            if (yDiff < storm.flakeHeight) {
                s.active = 0;
                if (storm.snowStick) {
                    s.stick();
                } else {
                    s.recycle();
                }
            } else {
                if (
                    storm.useMeltEffect &&
                    s.active &&
                    s.type < 3 &&
                    !s.melting &&
                    Math.random() > 0.998
                ) {
                    s.melting = true;
                    s.melt();
                }
                if (storm.useTwinkleEffect) {
                    if (s.twinkleFrame < 0) {
                        if (Math.random() > 0.97) {
                            s.twinkleFrame = parseInt(Math.random() * 8, 10);
                        }
                    } else {
                        s.twinkleFrame--;
                        if (!opacitySupported) {
                            s.o.style.visibility =
                                s.twinkleFrame && s.twinkleFrame % 2 === 0
                                    ? "hidden"
                                    : "visible";
                        } else {
                            s.o.style.opacity =
                                s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1;
                        }
                    }
                }
            }
        };
        this.animate = function () {
            s.move();
        };
        this.setVelocities = function () {
            s.vX = vRndX + rnd(storm.vMaxX * 0.12, 0.1);
            s.vY = vRndY + rnd(storm.vMaxY * 0.12, 0.1);
        };
        this.setOpacity = function (o, opacity) {
            if (!opacitySupported) {
                return false;
            }
            o.style.opacity = opacity;
        };
        this.melt = function () {
            if (!storm.useMeltEffect || !s.melting) {
                s.recycle();
            } else {
                if (s.meltFrame < s.meltFrameCount) {
                    s.setOpacity(s.o, s.meltFrames[s.meltFrame]);
                    s.o.style.fontSize =
                        s.fontSize - s.fontSize * (s.meltFrame / s.meltFrameCount) + "px";
                    s.o.style.lineHeight =
                        storm.flakeHeight +
                        2 +
                        storm.flakeHeight * 0.75 * (s.meltFrame / s.meltFrameCount) +
                        "px";
                    s.meltFrame++;
                } else {
                    s.recycle();
                }
            }
        };
        this.recycle = function () {
            s.o.style.display = "none";
            s.o.style.position = fixedForEverything ? "fixed" : "absolute";
            s.o.style.bottom = "auto";
            s.setVelocities();
            s.vCheck();
            s.meltFrame = 0;
            s.melting = false;
            s.setOpacity(s.o, 1);
            s.o.style.padding = "0px";
            s.o.style.margin = "0px";
            s.o.style.fontSize = s.fontSize + "px";
            s.o.style.lineHeight = storm.flakeHeight + 2 + "px";
            s.o.style.textAlign = "center";
            s.o.style.verticalAlign = "baseline";
            s.x = parseInt(rnd(screenX - storm.flakeWidth - 20), 10);
            s.y = parseInt(rnd(screenY) * -1, 10) - storm.flakeHeight;
            s.refresh();
            s.o.style.display = "block";
            s.active = 1;
        };
        this.recycle();
        this.refresh();
    };
    this.snow = function () {
        var active = 0,
            flake = null,
            i,
            j;
        for (i = 0, j = storm.flakes.length; i < j; i++) {
            if (storm.flakes[i].active === 1) {
                storm.flakes[i].move();
                active++;
            }
            if (storm.flakes[i].melting) {
                storm.flakes[i].melt();
            }
        }
        if (active < storm.flakesMaxActive) {
            flake = storm.flakes[parseInt(rnd(storm.flakes.length), 10)];
            if (flake.active === 0) {
                flake.melting = true;
            }
        }
        if (storm.timer) {
            features.getAnimationFrame(storm.snow);
        }
    };
    this.mouseMove = function (e) {
        if (!storm.followMouse) {
            return true;
        }
        var x = parseInt(e.clientX, 10);
        if (x < screenX2) {
            windOffset = -windMultiplier + (x / screenX2) * windMultiplier;
        } else {
            x -= screenX2;
            windOffset = (x / screenX2) * windMultiplier;
        }
    };
    this.createSnow = function (limit, allowInactive) {
        var i;
        for (i = 0; i < limit; i++) {
            storm.flakes[storm.flakes.length] = new storm.SnowFlake(
                parseInt(rnd(flakeTypes), 10)
            );
            if (allowInactive || i > storm.flakesMaxActive) {
                storm.flakes[storm.flakes.length - 1].active = -1;
            }
        }
        storm.targetElement.appendChild(docFrag);
    };
    this.timerInit = function () {
        storm.timer = true;
        storm.snow();
    };
    this.init = function () {
        var i;
        for (i = 0; i < storm.meltFrameCount; i++) {
            storm.meltFrames.push(1 - i / storm.meltFrameCount);
        }
        storm.randomizeWind();
        storm.createSnow(storm.flakesMax);
        storm.events.add(window, "resize", storm.resizeHandler);
        storm.events.add(window, "scroll", storm.scrollHandler);
        if (storm.freezeOnBlur) {
            if (isIE) {
                storm.events.add(document, "focusout", storm.freeze);
                storm.events.add(document, "focusin", storm.resume);
            } else {
                storm.events.add(window, "blur", storm.freeze);
                storm.events.add(window, "focus", storm.resume);
            }
        }
        storm.resizeHandler();
        storm.scrollHandler();
        if (storm.followMouse) {
            storm.events.add(isIE ? document : window, "mousemove", storm.mouseMove);
        }
        storm.animationInterval = Math.max(20, storm.animationInterval);
        storm.timerInit();
    };
    this.start = function (bFromOnLoad) {
        if (!didInit) {
            didInit = true;
        } else if (bFromOnLoad) {
            // already loaded and running
            return true;
        }
        if (typeof storm.targetElement === "string") {
            var targetID = storm.targetElement;
            storm.targetElement = document.getElementById(targetID);
            if (!storm.targetElement) {
                throw new Error(
                    'Snowstorm: Unable to get targetElement "' + targetID + '"'
                );
            }
        }
        if (!storm.targetElement) {
            storm.targetElement = document.body || document.documentElement;
        }
        if (
            storm.targetElement !== document.documentElement &&
            storm.targetElement !== document.body
        ) {
            storm.resizeHandler = storm.resizeHandlerAlt;
            storm.usePixelPosition = true;
        }
        storm.resizeHandler();
        storm.usePositionFixed =
            storm.usePositionFixed && !noFixed && !storm.flakeBottom;
        if (window.getComputedStyle) {
            try {
                targetElementIsRelative =
                    window
                        .getComputedStyle(storm.targetElement, null)
                        .getPropertyValue("position") === "relative";
            } catch (e) {
                targetElementIsRelative = false;
            }
        }
        fixedForEverything = storm.usePositionFixed;
        if (screenX && screenY && !storm.disabled) {
            storm.init();
            storm.active = true;
        }
    };
    function doDelayedStart() {
        window.setTimeout(function () {
            storm.start(true);
        }, 20);
        storm.events.remove(isIE ? document : window, "mousemove", doDelayedStart);
    }
    function doStart() {
        if (!storm.excludeMobile || !isMobile) {
            doDelayedStart();
        }
        storm.events.remove(window, "load", doStart);
    }
    if (storm.autoStart) {
        storm.events.add(window, "load", doStart, false);
    }
    return this;
})(window, document);
