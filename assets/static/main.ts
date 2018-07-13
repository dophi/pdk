import Probuff from "../resources/scripts/common/Probuff";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class main extends cc.Component {
    start() {
        this.init();
    }

    //所有前期初始化的事情都在这里做
    async init() {
        await Probuff.Instance().init("proto/msg");
        this._testProto();
        this.enterLogin();
    }

    _testProto() {
        let pack = Probuff.Instance().createObject("Test.Pack");
        pack.set("msgId", 1001);

        let person = Probuff.Instance().createObject("Test.Person");
        cc.log(person.name);
        person.name = "abc";
        let books = [];
        for (let idx = 0; idx < 5; idx++) {
            let book = Probuff.Instance().createObject("Test.Book");
            book.name = "book" + idx;
            books.push(book);
        }

        person.books = books;
        cc.log("1");
        let personData = Probuff.Instance().encode(person);
        pack.data = personData;
        let packData = Probuff.Instance().encode(pack);
        let packmsg = Probuff.Instance().createMessage("Test.Pack");
        cc.log("3");
        let pack2 = packmsg.decode(packData);
        cc.log(pack2.get("msgId"));

        cc.log("1111");
        let data2 = pack2.get("data");
        cc.log("222222");
        let person2 = Probuff.Instance().decode("Test.Person", data2);
        cc.log("33333");
        for (let idx = 0; idx < person2.books.length; idx++) {
            cc.log(person2.books[idx].name);
        }
    }

    enterLogin() {
        cc.director.loadScene("scenes/login");
    }
}