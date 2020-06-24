class Graph {
    constructor(pairName, width, height) {

        let x1=100, x2=x1+width, y1=40, y2=y1+height+5;
        let parentWidth = x2+25, parentHeight = y2+40;

        this.width = width;
        this.height = height;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

        //Create svg node for graph
        let graph = SVG.node('svg');
        graph.classList.add('graph');
        graph.setAttribute('width',parentWidth);
        graph.setAttribute('height',parentHeight);

        let title =SVG.text(this.width/2,y1/2-6,pairName)
        title.classList.add('title');
        graph.appendChild(title);

        ['xGrid', 'yGrid', 'xLabels', 'yLabels'].forEach(name => {
            let node = SVG.node('g');
            node.id = name;
            node.classList.add(name.substring(1, name.length).toLowerCase()); // add class 'grid' to xGrid node
            node.classList.add(name[0] + '-' + name.substring(1, name.length).toLowerCase()); // add class 'x-grid' to xGrid node
            graph.appendChild(node);
            this[name] = node;
        });

        this['xGrid'].appendChild(SVG.line(x1, x1, y1, y2));
        this['yGrid'].appendChild(SVG.line(x1, x2, y2, y2));

        let dataGraph = SVG.node('g');
        dataGraph.id = 'data_graph';
        dataGraph.classList.add('data'); // add class 'grid' to xGrid node
        this.dataGraph = dataGraph;
        graph.appendChild(dataGraph);

        this.root = graph;
    }



    setLabels(xMin, xMax, yMin, yMax) {
        let x1=this.x1, x2=this.x2, y1=this.y1, y2=this.y2;

        const labelArray = (first, last, n) =>  [...Array(n+1).keys()].map(i => first + (last-first) * (i/n) );

        let xLabels = labelArray(xMin, xMax, 5);
        let yLabels = labelArray(yMin, yMax, 4);
        for (let i in xLabels) {
            let n = xLabels.length-1;
            let x = x1 + (x2-x1)*i/n;
            let y = y2+20;
            let label = SVG.text(x, y, xLabels[i].toPrecision(3));
            this['xLabels'].appendChild(label);
        }
        let labelTitle = SVG.text(x1+(x2-x1)/2,y2+40,'Price');
        labelTitle.classList.add('label-title');
        this['xLabels'].appendChild(labelTitle);

        for (let i in yLabels) {
            let n = yLabels.length-1;
            let x = x1-10;
            let y = 6 + y1 + (y2-y1)*(1-i/n); //6 == font-size/2
            let label = SVG.text(x, y, yLabels[i].toPrecision(3));
            this['yLabels'].appendChild(label);
        }
        labelTitle = SVG.text(50,y1+(y2-y1)/2,'Depth');
        labelTitle.classList.add('label-title');
        this['xLabels'].appendChild(labelTitle);

    }

    setData(asks, bids, xMax, yMax) {

        let pointsToString = orders => {
            return (orders[0].price+this.x1)+ ',' + this.y2 +' '+
                orders.reduce((points, bid) => {
                    let x = (bid.price+this.x1).toString();
                    let y = (this.y2-bid.depth).toString();
                    return points+x+','+y+' ';
                },'');
        };

        let bidPoints = pointsToString(bids)
        let line = SVG.node('polyline');
        line.setAttribute('points',bidPoints);
        line.setAttribute('stroke', 'green');
        line.setAttribute('width', '2px');
        line.setAttribute('fill', 'none');
        this.dataGraph.appendChild(line);

        let polygon = SVG.node('polyline');
        bidPoints = this.x1+','+this.y2+' '+bidPoints;
        polygon.setAttribute('points',bidPoints);
        polygon.setAttribute('stroke', 'none');
        polygon.setAttribute('fill', 'rgba(0,255,0,0.25)');
        this.dataGraph.appendChild(polygon);

        line = SVG.node('polyline');

        let askPoints = pointsToString(asks);
        line.setAttribute('points',pointsToString(asks));
        line.setAttribute('stroke', 'red');
        line.setAttribute('fill', 'none');
        this.dataGraph.appendChild(line);

        polygon = SVG.node('polyline');
        askPoints = this.x2+','+this.y2+' '+askPoints;
        polygon.setAttribute('points',askPoints);
        polygon.setAttribute('stroke', 'none');
        polygon.setAttribute('fill', 'rgba(255,0,0,0.25)');
        this.dataGraph.appendChild(polygon);
    }
}