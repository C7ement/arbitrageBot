class HTML {
    static node(name) {
        return document.createElement(name);
    }

    static flex() {
        let container = document.createElement('div');
        container.classList.add('flex');
        return container;
    }

    static flexColumn() {
        let container = document.createElement('div');
        container.classList.add('flex');
        container.classList.add('column');
        return container;
    }

    static p(text) {
        let p = document.createElement('p')
        let textNode = document.createTextNode(text);
        p.appendChild(textNode);
        p.style.margin = '2px';
        p.style.fontSize = '12px';
        return p;
    }

    static pairDataDisplay(graph, data) {
        let container = this.flex();
        container.appendChild(graph);
        let dataContainer = this.flexColumn()
        for (let d of data) {
            let p = document.createElement('p');
            p.appendChild(document.createTextNode(d));
            dataContainer.appendChild(p);
        }
        container.appendChild(dataContainer)
        return container;
    }
}