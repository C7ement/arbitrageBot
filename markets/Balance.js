const poloTrade = require('./PoloTrade')

Balance = {
    matrix:{},

    updateBalance:function(callback){
        let self = this
        poloTrade.getBalance(function(polodata){
            for (let elem in polodata) {
                self.matrix[elem] = parseFloat(polodata[elem])
            }
            console.log('Balance :')
            for (let i in self.matrix) {
                if (self.matrix[i] !== 0)
                console.log('\t',self.matrix[i],i)
            }
            callback()
        })
    },
    getBalance:function(coin){
        return this.matrix[coin]
    },
    checkAmount:function(pair,mode) {
        let coin = ''
        switch(mode){
            case 'asks':
                coin = pair.split('_')[0]
                break
            case 'bids':
                coin = pair.split('_')[1]
                break
        }
        switch(coin) {
            case 'USDC':
                return self.matrix['USDC']>1
            case 'USDT':
                return self.matrix['USDT']>1
            case 'BTC':
                return self.matrix['BTC']>0.0003
            case 'ETH':
                return self.matrix['ETH']>0.0095
            case 'XMR':
                return self.matrix['XMR']>0.02
        }
    }
}

module.exports = Balance