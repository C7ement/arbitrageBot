class OrderBook {
    constructor(pairName, rawOrderBook) {
        this.pairName = pairName;
        //rawOrderBook = [{'<lowest ask price>': '<lowest ask size>', '<next ask price>': '<next ask size>', ...},
        //                {'<highest bid price>': '<highest bid size>', '<next bid price>': '<next bid size>', ...}]
        let asks = this.formatOrderBook(rawOrderBook[0]);
        let bids = this.formatOrderBook(rawOrderBook[1]);
        this.asks = asks; this.bids = bids;
        this.xMin = bids[bids.length-1].price; //lowest bid
        this.xMax = asks[asks.length-1].price; //highest ask
        this.yMin = 0;
        this.yMax = Math.max(asks[asks.length-1].depth, bids[bids.length-1].depth); //max depth

        this.width = 300;
        this.height = 150;
        this.graph = new Graph(pairName, this.width, this.height);
        this.graph.setLabels(this.xMin, this.xMax, this.yMin, this.yMax);

        const scaleOrder = order => ({
            price: (order.price - this.xMin) / (this.xMax - this.xMin) * this.width,
            depth: order.depth * this.height / this.yMax });
        this.graph.setData(this.asks.map(scaleOrder), this.bids.map(scaleOrder), this.xMax, this.yMax);
    }

    //from [{"<price>": "<amount>"}] to [{price: <price>}, {amount: <amount>}, {depth: <depth>}]
    //where 'depth' is the cumulative order depth from: low to high for asks / high to low for bids
    formatOrderBook (rawOrderBook) {
        Time.reset();
        let priceArray = Object.keys(rawOrderBook);

        priceArray.splice(Math.trunc(priceArray.length*0.9));   //90% threshold to eliminate aberrant offers

        let formattedOrderBook = [];
        let sum = 0;
        priceArray.forEach(price => {
            let amount = Number(rawOrderBook[price]);
            sum += amount;
            formattedOrderBook.push({
                price: Number(price),
                amount: amount,
                depth: sum}); //cumulative order depth
        });

        return formattedOrderBook;
    };



}




