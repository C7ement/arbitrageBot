class Time {

    static t0=Date.now();
    static last=Date.now();

    static log(message='', color='black') {
        let t = Date.now()-this.last;
        this.last = Date.now();
        let log =  'Δt : '+t
        log += message.length===0 ? '' : '\t-\t'+message;
        console.log('%c'+log, 'color:'+color);
    }

    static reset() {
        this.last = Date.now();
    }
}