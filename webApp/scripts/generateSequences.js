const fetch = require('node-fetch');
const fs = require('fs');

let pairs = [
    {id: 177, name: 'BTC_ARDR'},
    {id: 253, name: 'BTC_ATOM'},
    {id: 210, name: 'BTC_BAT'},
    //{id: 189, name: 'BTC_BCH'},
    {id: 236, name: 'BTC_BCHABC'},
    {id: 238, name: 'BTC_BCHSV'},
    {id: 7, name: 'BTC_BCN'},
    {id: 232, name: 'BTC_BNT'},
    {id: 14, name: 'BTC_BTS'},
    {id: 269, name: 'BTC_BTT'},
    {id: 15, name: 'BTC_BURST'},
    {id: 194, name: 'BTC_CVC'},
    {id: 24, name: 'BTC_DASH'},
    {id: 162, name: 'BTC_DCR'},
    {id: 27, name: 'BTC_DOGE'},
    {id: 201, name: 'BTC_EOS'},
    {id: 171, name: 'BTC_ETC'},
    {id: 148, name: 'BTC_ETH'},
    {id: 266, name: 'BTC_ETHBNT'},
    {id: 246, name: 'BTC_FOAM'},
    {id: 198, name: 'BTC_GAS'},
    {id: 185, name: 'BTC_GNT'},
    {id: 251, name: 'BTC_GRIN'},
    {id: 43, name: 'BTC_HUC'},
    {id: 207, name: 'BTC_KNC'},
    {id: 275, name: 'BTC_LINK'},
    {id: 213, name: 'BTC_LOOM'},
    {id: 250, name: 'BTC_LPT'},
    {id: 163, name: 'BTC_LSK'},
    {id: 50, name: 'BTC_LTC'},
    {id: 229, name: 'BTC_MANA'},
    {id: 295, name: 'BTC_MATIC'},
    {id: 302, name: 'BTC_MKR'},
    {id: 309, name: 'BTC_NEO'},
    {id: 64, name: 'BTC_NMC'},
    {id: 248, name: 'BTC_NMR'},
    {id: 69, name: 'BTC_NXT'},
    {id: 196, name: 'BTC_OMG'},
    {id: 249, name: 'BTC_POLY'},
    {id: 75, name: 'BTC_PPC'},
    {id: 221, name: 'BTC_QTUM'},
    {id: 174, name: 'BTC_REP'},
    {id: 170, name: 'BTC_SBD'},
    {id: 150, name: 'BTC_SC'},
    {id: 204, name: 'BTC_SNT'},
    {id: 290, name: 'BTC_SNX'},
    {id: 168, name: 'BTC_STEEM'},
    {id: 200, name: 'BTC_STORJ'},
    {id: 89, name: 'BTC_STR'},
    {id: 182, name: 'BTC_STRAT'},
    {id: 92, name: 'BTC_SYS'},
    {id: 263, name: 'BTC_TRX'},
    {id: 108, name: 'BTC_XCP'},
    {id: 112, name: 'BTC_XEM'},
    {id: 114, name: 'BTC_XMR'},
    {id: 117, name: 'BTC_XRP'},
    {id: 277, name: 'BTC_XTZ'},
    {id: 178, name: 'BTC_ZEC'},
    {id: 192, name: 'BTC_ZRX'},
    {id: 306, name: 'DAI_BTC'},
    {id: 307, name: 'DAI_ETH'},
    {id: 211, name: 'ETH_BAT'},
    //{id: 190, name: 'ETH_BCH'},
    {id: 202, name: 'ETH_EOS'},
    {id: 172, name: 'ETH_ETC'},
    {id: 176, name: 'ETH_REP'},
    {id: 179, name: 'ETH_ZEC'},
    {id: 193, name: 'ETH_ZRX'},
    {id: 284, name: 'PAX_BTC'},
    {id: 285, name: 'PAX_ETH'},
    {id: 271, name: 'TRX_BTT'},
    {id: 267, name: 'TRX_ETH'},
    {id: 276, name: 'TRX_LINK'},
    {id: 297, name: 'TRX_MATIC'},
    {id: 311, name: 'TRX_NEO'},
    {id: 292, name: 'TRX_SNX'},
    {id: 274, name: 'TRX_STEEM'},
    {id: 273, name: 'TRX_WIN'},
    {id: 268, name: 'TRX_XRP'},
    {id: 279, name: 'TRX_XTZ'},
    {id: 254, name: 'USDC_ATOM'},
    //{id: 235, name: 'USDC_BCH'},
    {id: 237, name: 'USDC_BCHABC'},
    {id: 239, name: 'USDC_BCHSV'},
    {id: 224, name: 'USDC_BTC'},
    {id: 256, name: 'USDC_DASH'},
    {id: 243, name: 'USDC_DOGE'},
    {id: 257, name: 'USDC_EOS'},
    {id: 258, name: 'USDC_ETC'},
    {id: 225, name: 'USDC_ETH'},
    {id: 252, name: 'USDC_GRIN'},
    {id: 244, name: 'USDC_LTC'},
    {id: 242, name: 'USDC_STR'},
    {id: 264, name: 'USDC_TRX'},
    {id: 226, name: 'USDC_USDT'},
    {id: 241, name: 'USDC_XMR'},
    {id: 240, name: 'USDC_XRP'},
    {id: 245, name: 'USDC_ZEC'},
    {id: 288, name: 'USDJ_BTC'},
    {id: 289, name: 'USDJ_TRX'},
    {id: 255, name: 'USDT_ATOM'},
    {id: 212, name: 'USDT_BAT'},
    //{id: 191, name: 'USDT_BCH'},
    {id: 260, name: 'USDT_BCHABC'},
    {id: 298, name: 'USDT_BCHBEAR'},
    {id: 259, name: 'USDT_BCHSV'},
    {id: 299, name: 'USDT_BCHBULL'},
    {id: 280, name: 'USDT_BEAR'},
    {id: 293, name: 'USDT_BSVBEAR'},
    {id: 294, name: 'USDT_BSVBULL'},
    {id: 121, name: 'USDT_BTC'},
    {id: 270, name: 'USDT_BTT'},
    {id: 281, name: 'USDT_BULL'},
    {id: 304, name: 'USDT_BVOL'},
    {id: 308, name: 'USDT_DAI'},
    {id: 122, name: 'USDT_DASH'},
    {id: 262, name: 'USDT_DGB'},
    {id: 216, name: 'USDT_DOGE'},
    {id: 203, name: 'USDT_EOS'},
    {id: 173, name: 'USDT_ETC'},
    {id: 149, name: 'USDT_ETH'},
    {id: 300, name: 'USDT_ETHBEAR'},
    {id: 301, name: 'USDT_ETHBULL'},
    {id: 217, name: 'USDT_GNT'},
    {id: 261, name: 'USDT_GRIN'},
    {id: 305, name: 'USDT_IBVOL'},
    {id: 218, name: 'USDT_LSK'},
    {id: 123, name: 'USDT_LTC'},
    {id: 231, name: 'USDT_MANA'},
    {id: 296, name: 'USDT_MATIC'},
    {id: 303, name: 'USDT_MKR'},
    {id: 310, name: 'USDT_NEO'},
    {id: 124, name: 'USDT_NXT'},
    {id: 286, name: 'USDT_PAX'},
    {id: 223, name: 'USDT_QTUM'},
    {id: 175, name: 'USDT_REP'},
    {id: 219, name: 'USDT_SC'},
    {id: 291, name: 'USDT_SNX'},
    {id: 125, name: 'USDT_STR'},
    {id: 265, name: 'USDT_TRX'},
    {id: 282, name: 'USDT_TRXBEAR'},
    {id: 283, name: 'USDT_TRXBULL'},
    {id: 287, name: 'USDT_USDJ'},
    {id: 272, name: 'USDT_WIN'},
    {id: 126, name: 'USDT_XMR'},
    {id: 127, name: 'USDT_XRP'},
    {id: 278, name: 'USDT_XTZ'},
    {id: 180, name: 'USDT_ZEC'},
    {id: 220, name: 'USDT_ZRX'},
];

fetch('https://poloniex.com/public?command=returnCurrencies')
    .then( (response) => response.json())
    .then( (json) => {
        const currencies = Object.keys(json);
        let sequences = [];
        pairs.forEach(pair_1 => {
            let currency_1 = pair_1.name.split('_')[0];
            let currency_2 = pair_1.name.split('_')[1];
            currencies.filter(currency => currency !== currency_1 && currency !== currency_2)
                .forEach(currency_3 => {

                    const pair_2 = pairs.find(pair => pair.name === currency_1 + '_' + currency_3 || pair.name === currency_3 + '_' + currency_1);
                    const pair_3 = pairs.find(pair => pair.name === currency_3 + '_' + currency_2 || pair.name === currency_2 + '_' + currency_3);
                    if (pair_2 !== undefined && pair_3 !== undefined) {
                        if (!sequences.some(seq =>
                                            seq.currencies.includes(currency_1) &&
                                            seq.currencies.includes(currency_2) &&
                                            seq.currencies.includes(currency_3))) {

                            let seq = {
                                pairs: [pair_1, pair_2, pair_3],
                                currencies: [currency_1, currency_2, currency_3]
                            };
                            seq.pairs = seq.pairs.map(pair => {
                                let currencies = pair.name.split('_');
                                return {id: pair.id, name: pair.name, sell: currencies[0], buy: currencies[1]};
                            });
                            seq.pairs[0].invert = false;

                            if (seq.pairs[0].sell===seq.pairs[1].sell || seq.pairs[0].sell===seq.pairs[1].buy) { //switch to have A_B, B_C, C_A
                                let tmp = seq.pairs[1];
                                seq.pairs[1] = seq.pairs[2];
                                seq.pairs[2] = tmp;
                            }
                            if (seq.pairs[0].buy===seq.pairs[1].buy) {
                                seq.pairs[1].invert = true;
                            } else if (seq.pairs[0].buy===seq.pairs[1].sell) {
                                seq.pairs[1].invert = false;
                            }

                            if (seq.pairs[0].sell===seq.pairs[2].sell) {
                                seq.pairs[2].invert = true;
                            } else if (seq.pairs[0].sell===seq.pairs[2].buy) {
                                seq.pairs[2].invert = false;
                            }
                            sequences.push(seq);
                        }
                    }
                });

        });

        let content = `class Sequences {
        static all = `+JSON.stringify(sequences, null, 2)+`;
        }`;
        fs.writeFile("webApp/scripts/lib/Sequences.js", content, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        });
        console.log('sequences: ', content);
        console.log('size: ', sequences.length);
    })
    .catch(err => console.log(err.message));


