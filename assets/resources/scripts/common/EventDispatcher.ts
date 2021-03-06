//只能注册一个对象的函数，不能注册闭包和箭头函数，因为这样没法移除
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

    public on(name:number, func: any, obj: any): void {
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
                func.call(obj, data);
            }
        }
    }
};


























