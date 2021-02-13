class Game {

    maxChance = 80;
    minChance = 10;
    packageTimeout = 40;
    hRange = 0.2;
    over = false;
    boxNames = ["chicken", 
                "foodbarrel", 
                "letterbox", 
                "metalcargo", 
                "eggs", 
                "winston",
                "bananacrate",
                "gregbomb",
                "programmingpouch",
                "chemicalbottles",
                "woodbarrel",
                "musicalnote",
                "encryption",
                "moneyshipment",
                "laundrybasket",
                "skateboards",
                "gold",
                "maps"];
    timers = []
    time = 0;

    constructor(money, happiness) {
        this.requests = {};
        this.money = money;
        this.happiness = happiness;
        this.cost = 120;
        this.closed = false;
        Helper.shuffle(this.boxNames);
    }
    // ECONOMY
    setHappiness(mult) {
        var add = Helper.convertRange(mult, [0, 2], [-this.hRange, this.hRange]);
        this.happiness += add;
        this.happiness = Math.min(Math.max(this.happiness, 0), 1);
        var econ = document.getElementById('em');
        econ.innerHTML = parseInt(this.happiness * 100) + "%";
        this.reactIcon('ec');
        var update = document.getElementById("update_ec");
        if (add >= 0) {update.innerHTML = `+${parseInt(add * 100)}%`}
        else {update.innerHTML = `-${Math.abs(parseInt(add * 100))}%`}
    }
    setMoney(amt) {
        this.money += amt;
        this.money = parseInt(this.money);
        document.getElementById('mm').innerHTML = "$" + this.money;
        this.reactIcon('mo');
        var update = document.getElementById("update_mo");
        if (amt >= 0) {update.innerHTML = `+$${parseInt(amt)}`}
        else {update.innerHTML = `-$${Math.abs(parseInt(amt))}`}
    }
    setCost(amt) {
        var previousCost = this.cost;
        this.cost = Math.min(Math.max(amt, 10), 300);
        this.setHappiness(Helper.convertRange((previousCost - this.cost), [-100, 100], [0, 2]));
        return `Service cost set to $${this.cost} 
        <p class = 'orange'>(Lower = higher demand)</p>`
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
        if (this.over) {return}
        if (this.closed) {
            this.time = 0;
            this.setHappiness(1.1);
            this.setMoney(-5);
            setTimeout(() => {this.loop();}, 1000);
            return
        }
        this.time += 1;
        var boxChance = parseInt(this.maxChance + this.minChance
         - Helper.convertRange(this.happiness, [0, 1], [this.minChance, this.maxChance]));
        if (this.time >= boxChance) {
            this.time = 0;
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
            this.timers.push(setTimeout(() => {this.removeRequest(name);}, this.packageTimeout * 1000));
        }
        setTimeout(() => {this.loop();}, 1000);
    }
    removeRequest(name) {
        if (this.requests[name] !== undefined) {
            this.setHappiness(0);
            this.setMoney(-220);
            printDisplay(`<p class = 'yellow'>Package timed out: </p><p class = 'dull'>${name}</p>`);
            delete this.requests[name];
        }
        this.boxNames.push(name);
    }
    sendRequest(name) {
        var weight = this.requests[name].weight
        var distance = this.requests[name].distance
        var broken = this.requests[name].broken
        var packaged = this.requests[name].packaged
        var cost = 40;
        var happiness = 1;
        var broken_factor = 1;
        var packaged_factor = 1;
        var weight_factor = Helper.convertRange(weight, [40, 400], [0.5, 2]);
        var distance_factor = Helper.convertRange(distance, [80, 800], [0.6, 2]);
        if (broken === true) {broken_factor = 0.6;} else {broken_factor = 1.4;}
        if (packaged === true) {packaged_factor = 1.2;} else {packaged_factor = 0.8;}
        cost *= weight_factor * distance_factor;
        happiness = broken_factor * packaged_factor;
        this.setMoney(-cost);
        this.setHappiness(happiness);
        delete this.requests[name];
        return `Request sent: <p class = 'dull'>${name}</p>`
    }
    dismissRequest(name) {
        this.setHappiness(0.5);
        this.setMoney(-10);
        delete this.requests[name];
        return `Request dismissed: <p class = 'dull'>${name}</p>`
    }
    reactIcon(name) {
        document.getElementById(name).style.transform = "scale(3, 3) rotate(16deg)";
        setTimeout(function() {document.getElementById(name).style.transform = "scale(2, 2) rotate(0deg)";}, 300);
    }
}