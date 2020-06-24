<script>
    export default {
        name: "DepthGraph.vue",
        props: ['width', 'height', 'orderBook'],
        data() {
            return {
                x1:0, x2:0,
                y1:0, y2:0,
                asksLine:'', bidsLine:'',
                asksArea:'', bidsArea:'',
                nx: 5, ny: 4,
                xMin: 0, yMin: 0,
                xMax: 0, yMax: 0,
                active: false,
                cursorX:0,
                cursorY:0,
            };
        },
        created() {
            if(!Number(this.width) || !Number(this.height)) {
                console.log('%c Error: width or height not a number.', 'color:red')
            }
            let x1 = 100;
            let x2 = Number(this.width)-25;
            let y1 = 40;
            let y2 = Number(this.height)-40;
            this.x1 = x1; this.x2 = x2;
            this.y1 = y1; this.y2 = y2;

            console.log(this.orderBook);

            let asks = this.orderBook.asks, bids = this.orderBook.bids;
            let xMin = bids[bids.length-1].price; //lowest bid
            let xMax = asks[asks.length-1].price; //highest ask
            let yMax = Math.max(asks[asks.length-1].depth, bids[bids.length-1].depth); //max depth
            this.xMin = xMin;
            this.xMax = xMax; this.yMax = yMax;


            const scaleOrder = order => ({
                x: x1 + (order.price - xMin) * (x2-x1) / (xMax - xMin),
                y: y2 - order.depth * (y2-y1) / yMax });

            const pointToString = (points, point) => points + point.x +','+ point.y +' ';
            const pointsToLine = (points) => points.reduce(pointToString, points[0].x+ ',' + y2 +' ');

            this.asksLine = pointsToLine(asks.map(scaleOrder));
            this.bidsLine = pointsToLine(bids.map(scaleOrder));
            this.asksArea = x2 +','+ y2 +' '+ this.asksLine;
            this.bidsArea = x1 +','+ y2 +' '+ this.bidsLine;

        },
        methods: {
            mouseOver: function() {
                this.active = true;
            },
            mouseLeave: function() {
                this.active = false;
            },
            mouseMove: function(event) {
                let parent = event.currentTarget.getBoundingClientRect();
                let clientX = event.x - parent.x;
                this.cursorX = clientX;
                let price = this.xMin + (clientX-this.x1) * (this.xMax - this.xMin) / (this.x2-this.x1);
                let asks = this.orderBook.asks;
                let bids = this.orderBook.bids;

                const binarySearch = (orders, price, start, end, condition) => {
                    if (end===start) return orders[start].depth;
                    if (end===start+1) {
                        if (price-orders[start].price < orders[end].price-price) {
                            return orders[start].depth;
                        } else {
                            return orders[end].depth;
                        }
                    }
                    let mid = Math.floor((start+end)/2);
                    if (orders[mid].price==price) return orders[mid].depth;

                    if (condition(price, orders[mid].price)) {
                        return binarySearch(orders, price, start, mid, condition);
                    } else {
                        return binarySearch(orders, price, mid, end, condition);
                    }
                };

                let depth;
                if (asks[0].price < price) {
                    const condition = (a, b) => a < b;
                    depth = binarySearch(asks, price, 0, asks.length-1, condition);
                } else {
                    const condition = (a, b) => a > b;
                    depth = binarySearch(bids, price, 0, bids.length-1, condition);
                }
                this.cursorY =  this.y2 - depth * (this.y2-this.y1) / this.yMax;

    }
        },
    }
</script>

<template>
    <svg class="graph" :width="width" :height="height"
         v-on:mouseover="mouseOver"
         v-on:mouseleave="mouseLeave"
         v-on:mousemove="mouseMove">
        <text :x="(x1+x2)/2" y="14" text-anchor="middle" class="title">{{orderBook.title}}</text>

        <g id="xLabels" class="labels x-labels">
            <line :x1="x1" :x2="x2" :y1="y2" :y2="y2"></line>
            <text :x="(x1+x2)/2" :y="y2+6+4" class="label-title">Price</text>
            <g v-for="(n, i) in nx+1" v-bind:key="i" >
                <text :x="x1 + (x2-x1)*i/nx" :y="y2+2">
                    {{ (xMin + (xMax-xMin)*(i/nx)).toPrecision(3) }}
                </text>
                <line :x1="x1 + (x2-x1)*i/nx" :x2="x1 + (x2-x1)*i/nx" :y1="y2-4" :y2="y2+2"></line>
            </g>
        </g>

        <g id="yLabels" class="labels y-labels">
            <line :x1="x1" :x2="x1" :y1="y1" :y2="y2"></line>
            <text :x="50" :y="(y1+y2)/2" class="label-title">Depth</text>
            <g v-for="(n, i) in ny+1" v-bind:key="i">
                <text :x="x1-10" :y="y1 + (y2-y1)*(1-i/ny)">
                    {{ (yMax*(i/ny)).toPrecision(3)}}
                </text>
                <line :x1="x1-2" :x2="x1+4" :y1="y1 + (y2-y1)*(1-i/ny)" :y2="y1 + (y2-y1)*(1-i/ny)"></line>
            </g>
        </g>
        <g id="data_graph" class="data">
            <polyline :points="asksLine" stroke="red" fill="none">
            </polyline>
            <polyline :points="bidsLine" stroke="green" fill="none">
            </polyline>
            <polyline :points="asksArea" stroke="none" fill="rgba(255,0,0,0.25)">
            </polyline>
            <polyline :points="bidsArea" stroke="none" fill="rgba(0,255,0,0.25)">
            </polyline>
        </g>

        <g v-show="this.active">
        <line :x1="cursorX" :x2="cursorX" :y1="y1" :y2="y2"></line>
        <line :x1="x1" :x2="x2" :y1="cursorY" :y2="cursorY"></line>
        </g>
    </svg>
</template>

<style scoped>
    g line {
        stroke: #ccc;
        stroke-dasharray: 0;
        stroke-width: 1;
    }

    text {
        dominant-baseline: middle;
    }
    .x-labels text {
        text-anchor: middle;
        dominant-baseline: hanging;
    }
    .y-labels text { text-anchor: end; }
    .labels text {
        font-size: 12px;
    }

    .label-title, .title {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 12px;
        fill: black;
    }

</style>