money = 400
happiness = 1
br_weight = 0.2
pa_weight = 0.1
we_weight = 0.3
di_weight = 0.1
dh_weight = 2
se_weight = 0.4
softener = 0.1

while True:
    ar = input("weight.distance.broken.packaged.sent.cost: ").split(".")
    weight = int(ar[0])
    distance = int(ar[1])
    broken = bool(ar[2])
    packaged = bool(ar[3])
    sent = bool(ar[4])
    c = int(ar[5])
    h = 1
    if not sent:
        c = 10
        h *= 1 - se_weight
    else:
        if broken:
            h *= 1 - br_weight
        else:
            h *= 1 + br_weight
        if packaged:
            h *= 1 + pa_weight
        else:
            h *= 1 - pa_weight
        c *= (weight / 40) * we_weight
        c *= (distance / 80) * di_weight
        h *= (80 / distance) * dh_weight
        c = int(c)
        print(h)
    money -= c
    happiness *= h
    happiness = max(min(happiness, 1), 0)
    print(money, happiness)
    
