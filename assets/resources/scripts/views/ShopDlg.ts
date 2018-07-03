import { BaseDlg } from "./BaseDlg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopDlg extends BaseDlg {
    onLoad() {
        this.init(0.99,0.03);
        super.onLoad();
    }
}
