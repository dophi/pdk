import { BaseDlg } from "./BaseDlg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultDlg extends BaseDlg {

    @property(cc.Node)
    private successNode: cc.Node = null;

    @property(cc.Node)
    private failedNode: cc.Node = null;

    init(isSuccess: boolean) {
        if (isSuccess) {
            this.successNode.isValid = true;
            this.failedNode.isValid = false;
        } else {
            this.successNode.isValid = false;
            this.failedNode.isValid = true;
        }
    }
}
