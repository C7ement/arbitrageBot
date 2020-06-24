<script>
  import DepthGraph from './components/DepthGraph.vue'
  import OrderBook from './store/OrderBook'

  export default {
    name: 'App',
    components: {
      DepthGraph
    },
    data() {
      return {
        orderBooks: [],
      };
    },
    created() {

      const api_url = "wss://api2.poloniex.com";
      let socket = new WebSocket(api_url);

      socket.onopen = function () {
        socket.send(JSON.stringify({"command": "subscribe", "channel": 'BTC_ETH'}));
      };

      socket.onmessage = (event) => {
        let response = JSON.parse(event.data); // response: [<channel>, <sequence id>, <update data...>]
        if (response[0] === 1010) return; //heartbeat
        if (response[2] === undefined) {
          console.log('%c Invalid response.', 'color: red');
          return;
        }
        let updateData = response[2][0]; //[["i", {"currencyPair": "<currency pair name>", "orderBook":  orderBook} ]]
        let pairId = response[0];
        //let pair = pairs.find(pair => pair.id === response[0]); //the channel is the pair id

        if (updateData[0] === 'i') { //init or reset orderBook
          let pairName = updateData[1].currencyPair;
          if (pairName === undefined) {
            console.log('%c Invalid response.', 'color: red');
            return;
          }
          let orderBook = new OrderBook(pairName, updateData[1].orderBook);

          orderBook.initialized = true;

          /*pair.sequences.forEach( seq => {
            seq.pairInitialized += 1;
            if (seq.pairInitialized == 3) {
              document.getElementById('sequence-data-wrapper').appendChild(sequenceToHtml(seq));
              seq.displayed = true;
            }
          })*/

          //document.getElementById('graph-wrapper').appendChild(pairToHtml(pair));

          this.orderBooks.push({
            asks: orderBook.asks,
            bids: orderBook.bids,
            title: pairName,
            pairName: pairName,
            pairId: pairId,
          });
        } else {
          //let orderBook = this.orderBooks.find(o => o.pairId == pairId)
        }
      }
    }
  }
</script>

<template>
  <div id="app">
    <DepthGraph v-for="o in orderBooks" v-bind:key="o.pairName" width="600" height="300" :order-book="o" />
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .flex {display: flex;}
  .column {flex-direction: column;}

</style>