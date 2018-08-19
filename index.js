
function Hand() {
    this.mouseDown = false;
    this.div = document.createElement("div");
    this.div.classList.add("hand"); 

    this.reset();
    this.friction = 0.9999;
}

Hand.prototype.step = function() {
    this.angle += this.angularVelocity;

    this.setTransform();

    if (this.angle >= 360) this.angle -= 360;

    if (this.mouseDown) {
        this.angularVelocity *= this.breakFriction;
    }
    else {
        this.angularVelocity *= this.friction;
    }
    
    return this.angularVelocity < 0.005; 
}

Hand.prototype.setTransform = function() {
    this.div.style.transform = "rotate(" + this.angle + "deg) translate(0px, -2.5px)";
}

Hand.prototype.reset = function() {
    this.angle = 0;
    this.angularVelocity = 10;
    this.breakFriction = 0.99;
    this.setTransform();
}

function Clock() {
    this.div = document.createElement("div");
    this.div.classList.add("clock");  
    this.hand = new Hand(this.mouseDown);

    let mark = document.createElement("div");
    mark.classList.add("mark");
    this.div.appendChild(mark);

    this.div.appendChild(this.hand.div);  
    
    this.div.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.div.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.div.addEventListener("mousemove", this.onMouseMove.bind(this));

    this.running = true;
    requestAnimationFrame(this.render.bind(this));
}

Clock.prototype.render = function() {
    if (this.hand.step()) {
        this.running = false;
        let difference = this.hand.angle;
        
        if (difference > 180) {
            difference = -1 * (360 - difference);
        }
                
        alert("stopped. Angle = " + difference);
    }
    else {
        requestAnimationFrame(this.render.bind(this));
    }
}
    

Clock.prototype.onMouseDown = function(e) {
    this.hand.mouseDown = true;

    if (!this.running) {
        this.hand.reset();
    }
}

Clock.prototype.onMouseUp = function(e) {
    this.hand.mouseDown = false;

    if (!this.running) {
        this.running = true;
        requestAnimationFrame(this.render.bind(this));
    }
}

Clock.prototype.onMouseMove = function(e) {
    if (this.hand.mouseDown) {
        // not sure if i like this...
        // let adjust = e.movementY / 1000;
        // let newFriction = this.hand.breakFriction + adjust;
        // if (newFriction > 1) {
        //     newFriction = 1;
        // }

        this.hand.breakFriction = newFriction;
    }
}

window.onload = () => {
    document.body.appendChild(new Clock().div);
}