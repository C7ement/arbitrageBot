class Iterable {
    constructor(array) { // [{price:<price>, amount:<amount>}]
        this.array = array;
        this.index = 0;
        this.length = array.length;
    }
    next() {
        this.index += 1;
    }
    get price() {
        if(this.index>=this.length) console.log('Error: index out of range!');
        return this.array[this.index].price;
    }
    get amount() {
        if(this.index>=this.length) console.log('Error: index out of range!');
        return this.array[this.index].amount;
    }
    set amount(amount) {
        if(this.index>=this.length) console.log('Error: index out of range!');
        this.array[this.index].amount = amount;
    }
    end() {
        return this.index>=this.length
    }
}