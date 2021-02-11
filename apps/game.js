class Game {

    maxChance = 10;
    hRange = 0.2;
    over = false;
    boxNames = ["chicken", "foodbarrel", "letterbox", "metalcargo", "eggs", "winston"];

    constructor(money, happiness) {
        this.requests = {};
        this.money = money;
        this.happiness = happiness;
        this.cost = 120;
        this.shuffle(this.boxNames);
    }
    // ECONOMY
    setHappiness(mult) {
        this.happiness += this.convertRange(mult, [0, 2], [-this.hRange, this.hRange]);
        this.happiness = Math.min(Math.max(this.happiness, 0), 1);
        var econ = document.getElementById('em');
        econ.innerHTML = parseInt(this.happiness * 100) + "%";
        this.reactIcon('ec');
    }
    setMoney(amt) {
        this.money += amt;
        document.getElementById('mm').innerHTML = "$" + this.money;
        this.reactIcon('mo');
    }
    setCost(amt) {
        this.cost = Math.min(Math.max(amt, 10), 300);
        this.setHappiness(this.convertRange(310 - this.cost, [10, 300], [0, 2]));
        return `Service cost set to $${this.cost}`
    }
    convertRange(value, r1, r2) { 
        return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }
    startLoop() {
        this.loop()
    }
    loop() {
        if (this.over) {return "Game quit"}
        var boxChance = this.convertRange(this.happiness, [0, 1], [4, this.maxChance]);
        if (Math.random() * 100 < boxChance) {
            const name = this.boxNames.shift();
            const distance = parseInt((Math.random() * 720) + 80);
            const weight = parseInt((Math.random() * 360) + 40);
            var packaged = false;
            var broken = false;
            if (Math.random() > 0.5) {packaged = true;}
            if (Math.random() > 0.5) {broken = true;}
            this.requests[name] = {
                "weight" : weight,
                "distance" : distance, 
                "broken" : broken, 
                "packaged" : packaged,
            };
            this.setMoney(this.cost);
            printDisplay(`<p class = 'green'>New package: </p><p class = 'dull'>${name}</p>`);
            setTimeout(() => {this.removeRequest(name);}, 20000);
        }
        setTimeout(() => {this.loop();}, 1000)
    }
    removeRequest(name) {
        if (this.requests[name] !== null) {
            this.setHappiness(0.5);
            this.setMoney(-80);
            delete this.requests[name];
        }
        this.boxNames.push(name);
    }
    reactIcon(name) {
        document.getElementById(name).style.transform = "scale(3, 3) rotate(16deg)";
        setTimeout(function() {document.getElementById(name).style.transform = "scale(2, 2) rotate(0deg)";}, 300);
    }
    endLoop() {
        this.over = true;
    }


}