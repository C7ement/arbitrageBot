const config = require('./config.json');
const Polo = require('poloniex-orderbook');
const polo = new Polo().connect({
    headers: ''
});

const PoloRest = require('./api/poloniex')
const polorest = new PoloRest(config.poloniex.API_key, config.poloniex.secret)

polo.on('err', err => console.log('Err Polotrade polo.on',err));
polo.on('error', err => console.log('Error Polotrade polo.on',err));

PoloTrade = {

    pairs:[],
    orderbook:{},

    initPairs:function(pairsArray){
        this.pairs = pairsArray;
        for(let pair of pairsArray){
            this.orderbook[pair]={
                'bids':{
                    'price':0,
                    'amount':0
                },
                'asks':{
                    'price':0,
                    'amount':0
                }
            }
            polo.market(pair);
        }
    },
    getOrders:function() {
        let self = this
        polo.on('change', info => {
            self.orderbook[info['channel']][info['side']]['price'] = parseFloat(info['rate']);
            self.orderbook[info['channel']][info['side']]['amount'] = parseFloat(info['amount']);

            //console.log(self.orderbook)
        });
    },
    getBalance: function(callback) {
        polorest.returnBalances((err,data)=>{
            if (err) {
                console.log('Error PoloTrade getBalance',err)
            } else if (data.error) {
                console.log('Error PoloTrade getBalance data',data)
            } else{
                return callback(data)
            }
        })
    },
    trade: function(pair,price,amount,mode,callback) {
        let self = this
        console.log(pair, 'Entering into trade on poloniex')
        polorest.trade({pair:pair, rate:price.toString(), amount: amount, type: mode}, (err, data)=>{
            if (err) {
                console.log('Error PoloTrade trade',err)
            } else if (data.error) {
                console.log('Error PoloTrade trade data',data)
            } else{
                console.log(pair,'Order was placed on poloniex',price,' amount',amount,'type',mode)
                console.log('data',data)
                self.checkOrder(pair,data.orderNumber,0,()=>{
                    callback()
                })
            }
        })
    },
    checkOrder: function(pair, orderId, n, callback) {
        if(!orderId && orderId ===0) {
            console.log(pair,' Poloniex order was executed immediately')
            callback()
        } else {
            polorest.returnOpenOrders(pair, (err, orders)=>{
                if (err) {
                    console.log('Error PoloTrade checkOrder',err)
                } else if (orders.error) {
                    console.log('Error PoloTrade checkOrder orders',orders)
                } else {
                    let activeOrders=[]
                    for(let order of orders){
                        activeOrders.push(order[orders.orderNumber])
                    }
                    console.log(orderId)
                    if(activeOrders.indexOf(orderId)>-1){
                        setTimeout(function(){
                            this.checkOrder(pair,orderId,n+1,callback)
                        },1)
                    } else {
                        console.log(pair,'Poloniex order were closed. n:',n)
                        callback()
                    }
                }
            })
        }
    }
}

module.exports = PoloTrade