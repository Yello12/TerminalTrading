class Game {

    maxChance = 10;
    hRange = 0.2;
    over = false;
    boxNames = ["chicken", "foodbarrel", "letterbox", "metalcargo", "eggs", "winston"];
    timers = []

    constructor(money, happiness) {
        this.requests = {};
        this.money = money;
        this.happiness = happiness;
        this.cost = 120;
        this.closed = true;
        Helper.shuffle(this.boxNames);
    }
    // ECONOMY
    setHappiness(mult) {
        this.happiness += Helper.convertRange(mult, [0, 2], [-this.hRange, this.hRange]);
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
        this.setHappiness(Helper.convertRange(310 - this.cost, [10, 300], [0, 2]));
        return `Service cost set to $${this.cost} 
        <p class = 'orange'>(Lower = higher demand, Higher = lower demand)</p>`
    }
    setClosed(value) {
        this.closed = value;
    }
    startLoop() {
        this.loop()
    }
    endLoop() {
        this.over = true;
        for (var i = 0; i < this.timers.length; i++) {
            clearTimeout(this.timers[i]);
        }
    }
    loop() {
        if (this.over || this.closed) {return}
        var boxChance = Helper.convertRange(this.happiness, [0, 1], [5, this.maxChance]);
        console.log(`Box chance: ${boxChance}`);
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
            printDisplay(`<p class = 'green'>New package: </p><p class = 'dull'> ${name}</p>`);
            this.timers.push(setTimeout(() => {this.removeRequest(name);}, 20000));
        }
        setTimeout(() => {this.loop();}, 1000)
    }
    removeRequest(name) {
        if (this.requests[name] !== null) {
            this.setHappiness(0.5);
            this.setMoney(-140);
            printDisplay(`<p class = 'yellow'>Package timed out:</p><p class = 'dull'> ${name}</p>`);
            delete this.requests[name];
        }
        this.boxNames.push(name);
    }
    sendRequest(name) {
        return
    }
    dismissRequest(name) {
        return 
    }
    reactIcon(name) {
        document.getElementById(name).style.transform = "scale(3, 3) rotate(16deg)";
        setTimeout(function() {document.getElementById(name).style.transform = "scale(2, 2) rotate(0deg)";}, 300);
    }
}