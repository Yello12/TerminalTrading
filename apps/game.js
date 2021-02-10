class Game {
    constructor(money, happiness) {
        this.requests = {};
        this.money = money;
        this.happiness = happiness;
        this.boxNames = ["chicken", "foodbarrel", "letterbox", "metalcargo", "eggs", "winston"];
        this.names;
        this.request;
        this.removal;
        this.cost = 120;
        document.getElementById("stats").innerHTML = "<div id = 'lives' class = 'lives'>4 LIVES</div><div id = 'money' class = 'money'></div><div id = 'econ' class = 'econ'></div>";
    }


    // ECONOMY
    setHappiness(mult) {
        this.happiness *= mult;
        document.getElementById('econ').innerHTML = parseInt(this.happiness * 100) + "%";
    }
    setMoney(amt) {
        this.money += amt;
        document.getElementById('money').innerHTML = "$" + this.money;
    }
    setCost(amt) {
        this.cost = Math.min(Math.max(amt, 10), 300);
        this.setHappiness(this.convertRange())
    }
    convertRange(value, r1, r2) { 
        return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }    



    end() {
        clearTimeout(this.request);
        clearTimeout(this.removal);
        document.getElementById("stats").innerHTML = "<div class = 'placeholder'>START A GAME TO SEE STATS</div>"
    }
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }
    addRequest() {
        const name = this.names.shift();
        
        const distance = parseInt((Math.random() * 720) + 80);
        const weight = parseInt((Math.random() * 360) + 40);
        var packaged = false;
        var broken = false;
        if (Math.random() > 0.6) {
            packaged = true; 
        }
        if (Math.random() > 0.6) {
            broken = true;
        }
        this.requests[name] = {
            "weight" : weight,
            "distance" : distance, 
            "broken" : broken, 
            "packaged" : packaged,
        };
        this.setMoney(this.cost);
        printDisplay(`<p class = 'new'>New package: </p><p class = 'object'>${name}</p><p class = 'new'> +$${this.cost}</p>`);
        this.request = setTimeout(() => this.addRequest(), (Math.random() * 12000) + 18000);
        this.removal = setTimeout(() => {this.timeoutRequest(name);this.names.push(name);}, 30000);
    }
    removeRequest(name) {
        if (this.requests[name] !== null) {
            delete this.requests[name];
        }
    }
    timeoutRequest(name) {
        if (name in this.requests) {
            calculateImpact(name, false);
            this.removeRequest(name);
            printDisplay(`<p class = 'warning'>Shipping timed out: </p><p class = 'object'>${name}</p>`);
        }
    }
}