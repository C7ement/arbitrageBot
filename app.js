const pairs = ['BTC_BCN', 'BTC_BTS', 'BTC_BURST', 'BTC_CLAM', 'BTC_DGB', 'BTC_DOGE', 'BTC_DASH', 'BTC_GAME', 'BTC_HUC',
    'BTC_LTC', 'BTC_MAID', 'BTC_OMNI', 'BTC_NAV', 'BTC_NMC', 'BTC_NXT', 'BTC_PPC', 'BTC_STR', 'BTC_SYS', 'BTC_VIA',
    'BTC_VTC', 'BTC_XCP', 'BTC_XMR', 'BTC_XPM', 'BTC_XRP', 'BTC_XEM', 'BTC_ETH', 'BTC_SC', 'BTC_FCT', 'BTC_DCR',
    'BTC_LSK', 'BTC_LBC', 'BTC_STEEM', 'BTC_SBD', 'BTC_ETC', 'BTC_REP', 'BTC_ARDR', 'BTC_ZEC', 'BTC_STRAT',
    'BTC_PASC', 'BTC_GNT', 'BTC_BCH', 'BTC_ZRX', 'BTC_CVC', 'BTC_OMG', 'BTC_GAS', 'BTC_STORJ', 'BTC_EOS', 'BTC_SNT',
    'BTC_KNC', 'BTC_BAT', 'BTC_LOOM', 'BTC_QTUM', 'BTC_BNT', 'BTC_MANA', 'BTC_FOAM', 'BTC_BCHABC', 'BTC_BCHSV',
    'BTC_NMR', 'BTC_POLY', 'BTC_LPT',
    'USDT_BTC', 'USDT_DOGE', 'USDT_DASH', 'USDT_LTC', 'USDT_NXT', 'USDT_STR', 'USDT_XMR', 'USDT_XRP', 'USDT_ETH',
    'USDT_SC', 'USDT_LSK', 'USDT_ETC', 'USDT_REP', 'USDT_ZEC', 'USDT_GNT', 'USDT_BCH', 'USDT_ZRX', 'USDT_EOS',
    'USDT_SNT', 'USDT_KNC', 'USDT_BAT', 'USDT_LOOM', 'USDT_QTUM', 'USDT_BNT', 'USDT_MANA',
    'XMR_BCN', 'XMR_DASH', 'XMR_LTC', 'XMR_MAID', 'XMR_NXT', 'XMR_ZEC',
    'ETH_LSK', 'ETH_STEEM', 'ETH_ETC', 'ETH_REP', 'ETH_ZEC', 'ETH_GNT', 'ETH_BCH', 'ETH_ZRX', 'ETH_CVC', 'ETH_OMG',
    'ETH_GAS', 'ETH_EOS', 'ETH_SNT', 'ETH_KNC', 'ETH_BAT', 'ETH_LOOM', 'ETH_QTUM', 'ETH_BNT', 'ETH_MANA',
    'USDC_BTC', 'USDC_DOGE', 'USDC_LTC', 'USDC_STR', 'USDC_USDT', 'USDC_XMR', 'USDC_XRP', 'USDC_ETH', 'USDC_ZEC',
    'USDC_BCH', 'USDC_FOAM', 'USDC_BCHABC', 'USDC_BCHSV']

const trios = [['USDC_BTC', 'USDT_BTC', 'USDC_USDT'],
    ['USDC_ETH', 'USDT_ETH', 'USDC_USDT'],
    ['USDC_ETH', 'BTC_ETH', 'USDC_BTC'],
    ['USDT_ETH', 'BTC_ETH', 'USDT_BTC'],
    ['USDC_XMR', 'USDT_XMR', 'USDC_USDT'],
    ['USDC_XMR', 'BTC_XMR', 'USDC_BTC'],
    ['USDT_XMR', 'BTC_XMR', 'USDT_BTC'],
    ['BTC_BCN', 'XMR_BCN', 'BTC_XMR'],
    ['USDC_DOGE', 'USDT_DOGE', 'USDC_USDT'],
    ['USDC_DOGE', 'BTC_DOGE', 'USDC_BTC'],
    ['USDT_DOGE', 'BTC_DOGE', 'USDT_BTC'],
    ['USDT_DASH', 'XMR_DASH', 'USDT_XMR'],
    ['BTC_DASH', 'XMR_DASH', 'BTC_XMR'],
    ['USDT_DASH', 'BTC_DASH', 'USDT_BTC'],
    ['BTC_MAID', 'XMR_MAID', 'BTC_XMR'],
    ['USDT_SC', 'BTC_SC', 'USDT_BTC'],
    ['BTC_CVC', 'ETH_CVC', 'BTC_ETH'],
    ['BTC_OMG', 'ETH_OMG', 'BTC_ETH'],
    ['BTC_GAS', 'ETH_GAS', 'BTC_ETH'],
    ['USDC_FOAM', 'BTC_FOAM', 'USDC_BTC'],
    ['BTC_STEEM', 'ETH_STEEM', 'BTC_ETH'],
    ['USDC_BCHSV', 'BTC_BCHSV', 'USDC_BTC'],
    ['USDC_BCHABC', 'BTC_BCHABC', 'USDC_BTC'],
    ['BTC_NXT', 'XMR_NXT', 'BTC_XMR'],
    ['USDT_NXT', 'XMR_NXT', 'USDT_XMR'],
    ['USDT_NXT', 'BTC_NXT', 'USDT_BTC'],
    ['USDT_STR', 'BTC_STR', 'USDT_BTC'],
    ['USDC_STR', 'BTC_STR', 'USDC_BTC'],
    ['USDC_STR', 'USDT_STR', 'USDC_USDT'],
    ['USDT_XRP', 'BTC_XRP', 'USDT_BTC'],
    ['USDC_XRP', 'BTC_XRP', 'USDC_BTC'],
    ['USDC_XRP', 'USDT_XRP', 'USDC_USDT'],
    ['BTC_LSK', 'ETH_LSK', 'BTC_ETH'],
    ['USDT_LSK', 'ETH_LSK', 'USDT_ETH'],
    ['USDT_LSK', 'BTC_LSK', 'USDT_BTC'],
    ['BTC_ETC', 'ETH_ETC', 'BTC_ETH'],
    ['USDT_ETC', 'ETH_ETC', 'USDT_ETH'],
    ['USDT_ETC', 'BTC_ETC', 'USDT_BTC'],
    ['BTC_REP', 'ETH_REP', 'BTC_ETH'],
    ['USDT_REP', 'ETH_REP', 'USDT_ETH'],
    ['USDT_REP', 'BTC_REP', 'USDT_BTC'],
    ['BTC_GNT', 'ETH_GNT', 'BTC_ETH'],
    ['USDT_GNT', 'ETH_GNT', 'USDT_ETH'],
    ['USDT_GNT', 'BTC_GNT', 'USDT_BTC'],
    ['BTC_ZRX', 'ETH_ZRX', 'BTC_ETH'],
    ['USDT_ZRX', 'ETH_ZRX', 'USDT_ETH'],
    ['USDT_ZRX', 'BTC_ZRX', 'USDT_BTC'],
    ['BTC_EOS', 'ETH_EOS', 'BTC_ETH'],
    ['USDT_EOS', 'ETH_EOS', 'USDT_ETH'],
    ['USDT_EOS', 'BTC_EOS', 'USDT_BTC'],
    ['BTC_SNT', 'ETH_SNT', 'BTC_ETH'],
    ['USDT_SNT', 'ETH_SNT', 'USDT_ETH'],
    ['USDT_SNT', 'BTC_SNT', 'USDT_BTC'],
    ['BTC_KNC', 'ETH_KNC', 'BTC_ETH'],
    ['USDT_KNC', 'ETH_KNC', 'USDT_ETH'],
    ['USDT_KNC', 'BTC_KNC', 'USDT_BTC'],
    ['BTC_BAT', 'ETH_BAT', 'BTC_ETH'],
    ['USDT_BAT', 'ETH_BAT', 'USDT_ETH'],
    ['USDT_BAT', 'BTC_BAT', 'USDT_BTC'],
    ['BTC_BNT', 'ETH_BNT', 'BTC_ETH'],
    ['USDT_BNT', 'ETH_BNT', 'USDT_ETH'],
    ['USDT_BNT', 'BTC_BNT', 'USDT_BTC'],
    ['BTC_LOOM', 'ETH_LOOM', 'BTC_ETH'],
    ['USDT_LOOM', 'ETH_LOOM', 'USDT_ETH'],
    ['USDT_LOOM', 'BTC_LOOM', 'USDT_BTC'],
    ['BTC_QTUM', 'ETH_QTUM', 'BTC_ETH'],
    ['USDT_QTUM', 'ETH_QTUM', 'USDT_ETH'],
    ['USDT_QTUM', 'BTC_QTUM', 'USDT_BTC'],
    ['BTC_MANA', 'ETH_MANA', 'BTC_ETH'],
    ['USDT_MANA', 'ETH_MANA', 'USDT_ETH'],
    ['USDT_MANA', 'BTC_MANA', 'USDT_BTC'],
    ['BTC_BCH', 'ETH_BCH', 'BTC_ETH'],
    ['USDT_BCH', 'ETH_BCH', 'USDT_ETH'],
    ['USDT_BCH', 'BTC_BCH', 'USDT_BTC'],
    ['USDC_BCH', 'ETH_BCH', 'USDC_ETH'],
    ['USDC_BCH', 'BTC_BCH', 'USDC_BTC'],
    ['USDC_BCH', 'USDT_BCH', 'USDC_USDT'],
    ['USDT_LTC', 'XMR_LTC', 'USDT_XMR'],
    ['USDT_LTC', 'BTC_LTC', 'USDT_BTC'],
    ['BTC_LTC', 'XMR_LTC', 'BTC_XMR'],
    ['USDC_LTC', 'BTC_LTC', 'USDC_BTC'],
    ['USDC_LTC', 'XMR_LTC', 'USDC_XMR'],
    ['USDC_LTC', 'USDT_LTC', 'USDC_USDT'],
    ['USDC_ZEC', 'USDT_ZEC', 'USDC_USDT'],
    ['USDC_ZEC', 'BTC_ZEC', 'USDC_BTC'],
    ['USDC_ZEC', 'XMR_ZEC', 'USDC_XMR'],
    ['USDC_ZEC', 'ETH_ZEC', 'USDC_ETH'],
    ['USDT_ZEC', 'BTC_ZEC', 'USDT_BTC'],
    ['USDT_ZEC', 'XMR_ZEC', 'USDT_XMR'],
    ['USDT_ZEC', 'ETH_ZEC', 'USDT_ETH'],
    ['BTC_ZEC', 'ETH_ZEC', 'BTC_ETH'],
    ['BTC_ZEC', 'XMR_ZEC', 'BTC_XMR']] //sell 0; buy 1; buy 2; - sell 2; buy 1; buy 0; - buy 2; sell 1; sell 0;
const balance = require('./markets/Balance')
const poloTrade = require('./markets/PoloTrade')

poloTrade.initPairs(pairs)
poloTrade.getOrders()
const start = new Date().getTime()
let end = new Date().getTime()
let intervalId = null;
let self = this
let apiCalls = [start,start,start,start,start,start,start]

balance.updateBalance(()=>{
    setTimeout(function(){
        intervalId = setInterval(function(){
            //console.log('asks',poloTrade.orderbook["USDT_BTC"]["asks"]["price"])
            //console.log('bids',poloTrade.orderbook["USDT_BTC"]["bids"]["price"])
            compare(self)
        },500)
    },600)
})


function compare() {
    end = new Date().getTime()
    for (let t of trios) {
        let p = poloTrade.orderbook
        let t0 = t[0]
        let t1 = t[1]
        let t2 = t[2]
        let result = []


        // buy sell pour B de A_B donc de B/A
        //
        //['BTC_ZEC', 'XMR_ZEC', 'BTC_XMR']] buy0 sell1 sell2 - buy1 sell0 buy2 - sell2 buy0 sell1 - buy2 buy1 sell0


        let modesAB = [['asks','bids','bids'],['bids','asks','asks'],['asks','bids','bids'],['bids','asks','asks']]
        //let modesAB = [['bids','asks','asks'],['asks','bids','bids'],['bids','asks','asks'],['asks','bids','bids']]
        let modesBS = [['buy','sell','sell'],['sell','buy','buy'],['buy','sell','sell'],['sell','buy','buy']]
        let orders = [[0,1,2],[1,0,2],[2,0,1],[2,1,0]]
/*
        for (let i in orders) {
            let r =1
            for (let j in modesAB[i]) {
                if(modesAB[i][j]==='asks') {
                    r = r*p[t[j]]['asks']['price']
                } else if (p[t[j]]["bids"]["price"]===0) {
                    r = 0
                } else {
                    r = r/p[t[j]]["bids"]["price"]
                }
            }
            result.push(r)
        }
*/
        for (let i=0; i<4; i++) {
            let amounts = getAmounts(t,orders[i],modesBS[i],modesAB[i])
            let bal = balance.getBalance(coinToSell(t[orders[i][0]],modesBS[i][orders[i][0]]))
            /*if ((bal<amounts[4])!==(result[i]*0.994>1 && checkAmounts(t,orders[i],modesAB[i],amounts))) {
                console.log('Error',(bal<amounts[4]),(result[i]*0.994>1 && checkAmounts(t,orders[i],modesAB[i],amounts)),'a',amounts,'r',result[i],'t',t,'o',orders[i],'m',modesBS[i],'bal',bal,'am',amounts,'p',p[t[0]],p[t[1]],p[t[2]])
            }*/
            if ( bal < amounts[4] ) {
                let prices = getPrices(t,orders[i],modesAB[i])
                clearInterval(intervalId)
                console.log(t,'result:', result[i],'order',orders[i],'mode:',modesAB[i],p[t0][modesAB[i][0]]['price'],
                    p[t1][modesAB[i][1]]['price'],p[t2][modesAB[i][2]]['price'],'time',(end-start)/1000)
                console.log('amount',amounts)
                console.log(t)

                console.log('get.balance', t[orders[i][0]], modesBS[i][orders[i][0]])
                return poloTrade.trade(t[orders[i][0]],prices[0], amounts[0],modesBS[i][orders[i][0]], ()=> {
                    poloTrade.trade(t[orders[i][1]], prices[1], amounts[1], modesBS[i][orders[i][1]], () => {
                        poloTrade.trade(t[orders[i][2]], prices[2], amounts[2], modesBS[i][orders[i][2]], () => {
                            balance.updateBalance(() => {
                                console.log('time', (end - start) / 1000)
                            })
                        })
                    })
                })
            }
        }
    }
}

function getAmounts(t,order,modeBS,modeAB) {
    let amounts = []
    let prices = getPrices(t,order,modeAB)
    let mapAmount = new Map()
    let firstCoin = coinToSell(t[order[0]],modeBS[order[0]])
    mapAmount.set(firstCoin,balance.getBalance(firstCoin))
    for (let i = 0; i<order.length; i++) {
        if (modeBS[order[i]]==="sell") {
            amounts.push(mapAmount.get(coinToSell(t[order[i]],modeBS[order[i]])))
            mapAmount.set(coinToBuy(t[order[i]],modeBS[order[i]]),amounts[i]*0.99799999*prices[i])
        } else if (prices[i]!==0) {
            amounts.push(mapAmount.get(coinToSell(t[order[i]],modeBS[order[i]]))/prices[i])
            mapAmount.set(coinToBuy(t[order[i]],modeBS[order[i]]),amounts[i]*0.99799999)
        } else {
            amounts.push(0)
            mapAmount.set(coinToBuy(t[order[i]],modeBS[order[i]]),0)
        }
    }
    amounts.push(mapAmount.get(firstCoin))
    if (typeof amounts[1]==="undefined") {
        console.log('error')
    }
    return amounts
}

function getPrices(t,order,modeAB) {
    let prices = []
    for (let k of order){
        prices.push(poloTrade.orderbook[t[k]][modeAB[k]]['price'])
    }
    return prices
}

//-------------------------
// ADD TOTAL & AMOUNT > 0.0001
// Check if the transaction is possible
function checkAmounts(t,order,modeAB,amounts) {
    let b = true
    for (let i=0; i<3; i++) {
        b = b && (amounts[i]<poloTrade.orderbook[t[order[i]]][modeAB[order[i]]]['amount'])
        b = b && (amounts[i]*poloTrade.orderbook[t[order[i]]][modeAB[order[i]]]['price']>0.0001)
    }
    return b
}

function coinToSell(pair,modeBS) { //return the coin you are selling
    switch(modeBS){
        case 'buy':
            return pair.split('_')[0]
        case 'sell':
            return pair.split('_')[1]
    }
}

function coinToBuy(pair,modeBS) { //return the coin you are buying
    switch(modeBS){
        case 'buy':
            return pair.split('_')[1]
        case 'sell':
            return pair.split('_')[0]
    }
}

function callApi() {
    let time = new Date().getTime()
    apiCalls.shift()
    apiCalls.push(time)
}