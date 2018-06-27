const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    onLoad () {}

    onCloseDlg() {
        this.node.removeFromParent();
    }
}
