
export default class EventDispatcher {
    private name2handlers: { [key: number]: any } = {};
    private static instance: EventDispatcher = null;
    private constructor() { }

    public static Instance() {
        if (EventDispatcher.instance == null) {
            EventDispatcher.instance = new EventDispatcher;
        }

        return EventDispatcher.instance;
    }

    public on(name:number, func: any, obj: any = null): void {
        let handler = { func: func, obj: obj };
        let handlers = this.name2handlers[name];
        if (handlers == undefined) {
            handlers = [];
            this.name2handlers[name] = handlers;
        }

        handlers.push(handler);
    }

    public off(name: number, func: any): void {
        let handlers = this.name2handlers[name];
        if (handlers != undefined) {
            for (let idx = 0; idx < handlers.length; idx++) {
                const handler = handlers[idx];
                let func = handler["func"];
                if (func != undefined) {
                    handlers.splice(handlers.indexOf(handler), 1);
                    break;
                }
            }
        }
    }

    public dispatch(name: number, data: any = null): void {
        let handlers = this.name2handlers[name];
        if (handlers != undefined) {
            for (let idx = 0; idx < handlers.length; idx++) {
                let handler = handlers[idx];
                let func = handler["func"];
                let obj = handler["obj"];
                if (obj != null) {
                    cc.log(func + " " + obj);
                    func.call(obj, data);
                } else {
                    func(data);
                }
            }
        }
    }
};


























