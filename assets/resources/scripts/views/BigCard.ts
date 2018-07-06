import { ICardSelectResult } from "./CardController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BigCard extends cc.Component implements ICardSelectResult {
    public isSelected: boolean = false;

    @property(cc.Node)
    public selectMask: cc.Node = null;

    onLoad() {

    }

    initData() {
         
    }

    onSelected() {
        cc.log("选中了");
        this.selectMask.opacity = 150;
    }

    onUnselected() {
        this.selectMask.opacity = 0;
    }

    onSelectFinished() {
        this.selectMask.opacity = 0;
    }
}
