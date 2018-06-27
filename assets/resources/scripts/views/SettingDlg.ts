const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingDlg extends cc.Component {
    onLoad () {}
    onDestroy() {}

    //ui事件
    onCloseDlg() {
        this.node.removeFromParent();
    }
}
