const {ccclass, property} = cc._decorator;

@ccclass
export default class ReadmeDlg extends cc.Component {
    onLoad () {}
    onDestroy() {}

    onCloseDlg() {
        this.node.removeFromParent();
    }
}
