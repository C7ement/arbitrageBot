class OrderBookChasles {

    constructor(ab, bc, ca) { //order book with invert attribute

        let a_b = ab.name.split('_');
        this.currencies = a_b[0] + ' ' + a_b[1] +' ';
        let b_c = bc.name.split('_');
        this.currencies += bc.invert ? b_c[0] : b_c[1];

        let asks_ab, bids_ab;
        let asks_bc, bids_bc;
        let asks_ac, bids_ac;

        let asks_ca, bids_ca;
        let asks_aa, bids_aa;

        asks_ab = ab.orderBook.asks;
        bids_ab = ab.orderBook.bids;

        if (bc.invert===false) {
            asks_bc = bc.orderBook.asks;
            bids_bc = bc.orderBook.bids;
        } else {
            const invert = (order) => ({price: 1/order.price, amount: order.amount/order.price});
            asks_bc = bc.orderBook.bids.map(invert);
            bids_bc = bc.orderBook.asks.map(invert);
        }

        asks_ac = this.merge_books(asks_ab, asks_bc);
        bids_ac = this.merge_books(bids_ab, bids_bc);


        if (ca.invert===false) {
            asks_ca = ca.orderBook.asks;
            bids_ca = ca.orderBook.bids;
        } else { //invert bid/ask, change amount unit
            const copyAndInvert = (order) => ({price: 1/order.price, amount: order.amount/order.price});
            asks_ca = ca.orderBook.bids.map(copyAndInvert, []);
            bids_ca = ca.orderBook.asks.map(copyAndInvert, []);
        }

        asks_aa = this.merge_books(asks_ca, asks_ac);
        bids_aa = this.merge_books(bids_ca, bids_ac);

        let last = asks_aa.findIndex(order => order.price >= 1.01);
        asks_aa.splice(last);
        last = bids_aa.findIndex(order => order.price <= 0.99);
        if (last<2) {
            console.log(ab.name +': '+ab.orderBook.bids.length);
            console.log(bc.name +': '+bc.orderBook.bids.length);
            console.log(ca.name +': '+ca.orderBook.bids.length);
        }
        bids_aa.splice(last);

        const addDepth = (sum, order) => {
            sum += order.amount;
            order.depth = sum; //cumulative order depth
            return sum;
        };
        asks_aa.reduce(addDepth, 0);
        bids_aa.reduce(addDepth, 0);


        this.asks = asks_aa; this.bids = bids_aa;
        this.xMin = bids_aa[bids_aa.length-1].price; //lowest bid
        this.xMax = asks_aa[asks_aa.length-1].price; //highest ask
        this.yMin = 0;
        this.yMax = Math.max(asks_aa[asks_aa.length-1].depth, bids_aa[bids_aa.length-1].depth); //max depth

        this.width = 300;
        this.height = 150;
        this.graph = new Graph(this.currencies, this.width, this.height);
        this.graph.setLabels(this.xMin, this.xMax, this.yMin, this.yMax);

        const scaleOrder = order => ({
            price: (order.price - this.xMin) / (this.xMax - this.xMin) * this.width,
            depth: order.depth * this.height / this.yMax });
        this.graph.setData(this.asks.map(scaleOrder), this.bids.map(scaleOrder), this.xMax, this.yMax);
    }

    merge_books(ab, bc) {
        let it1 = new Iterable(ab), it2 = new Iterable(bc);
        let arr = [];

        while (!it1.end() && !it2.end()) {

            let amount_c;
            let price_ac =it1.price*it2.price;
            let amt1 = it1.amount, amt2 = it2.amount/it2.price;

            if (amt1 < amt2) {
                amount_c = it1.amount*it2.price;
                it2.amount = it2.amount - it1.amount*it2.price;
                it1.next();
            } else if (amt1 > amt2) {
                amount_c = it2.amount;
                it1.amount = it1.amount - it2.amount/it2.price;
                it2.next();
            } else {
                amount_c = it2.amount;
                it1.next();
                it2.next();
            }

            arr.push({price: price_ac, amount: amount_c});
        }
        return arr;
    }
}




