class SVG {
    static node(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }

    static line(x1, x2, y1, y2) {
        let node = this.node('line');
        let names = ['x1', 'x2', 'y1', 'y2'];
        for (let i in names) {
            node.setAttribute(names[i], arguments[i]);
        }
        return node;
    }

    static text(x, y, text) {
        let node = this.node('text');
        node.setAttribute('x', x);
        node.setAttribute('y', y);
        node.appendChild(document.createTextNode(text));
        return node;
    }
}

