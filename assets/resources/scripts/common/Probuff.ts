let ByteBuffer = require("bytebuffer");
let PB = require("protobuf");

export default class Probuff {
    static instance: Probuff = null;
    static Instance() {
        if (Probuff.instance == null) {
            Probuff.instance = new Probuff;
        }

        return Probuff.instance;
    }

    private constructor() { }

    private pbBuilder = null;

    //协议文件放到resources下,放到空场景中去初始化，完成了再切换场景
    public async init(protoFileName) {
        let promise = new Promise<void>((resolve) => {
            cc.loader.loadRes(protoFileName, cc.TextAsset, (err, res) => {
                this.pbBuilder = PB.protoFromString(res);
                resolve();
            });
        });

        return promise;
    }

    //创建一个obj,赋值好字段，未来调用encode()打包成字节流
    public createObject(msgName: string): any {
        let Msg = this.createMessage(msgName);
        return new Msg;
    }

    // 创建出来的对象decode出一个obj
    public createMessage(msgName: string): any {
        let Msg = this.pbBuilder.build(msgName);
        return Msg;
    }

    public encode(obj): any {
        return obj.encode();
    }

    public decode(msgName, data): any {
        let msg = this.createMessage(msgName);
        return msg.decode(data);
    }

}
