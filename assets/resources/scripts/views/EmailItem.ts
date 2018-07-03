import Common from "../common/common";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EmailItem extends cc.Component {

    private emailSid: number = 0;
    start () {

    }

    initData(sid:number) {
        this.emailSid = sid;
    }
    
    onClick() {
        Common.addPrefabToScene("prefabs/emailDetailDlg");
    }
    // update (dt) {}
}
