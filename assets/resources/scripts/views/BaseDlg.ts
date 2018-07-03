
const { ccclass, property } = cc._decorator;
@ccclass
export class BaseDlg extends cc.Component {
    private scalePercent: number = 0.95;
    private actionTime: number = 0.06;

    onLoad() {
        this.node.addComponent(cc.BlockInputEvents);
        this.node.width = 50000;
        this.node.height = 50000;
        this.node.scale = this.scalePercent;
        this.node.opacity = 180;
        let scaleAction = cc.scaleTo(this.actionTime, 1.0);
        let fadeAction = cc.fadeIn(this.actionTime / 2);
        let spawnAction = cc.spawn(scaleAction, fadeAction);
        this.node.runAction(spawnAction);
    }

    //设置对话框弹出的效果细节
    protected init(scalePercent, time) {
       this.scalePercent = scalePercent;
       this.actionTime = time; 
    }

    private closeActionFinished() {
        this.node.destroy();
    }

    onCloseDlg() {
        let scaleAction = cc.scaleTo(this.actionTime, this.scalePercent);
        let fadeAction = cc.fadeOut(this.actionTime);
        let spawnAction = cc.spawn(scaleAction, fadeAction);
        let endFuncAction = cc.callFunc(this.closeActionFinished, this);
        let seqAction = cc.sequence(spawnAction, endFuncAction);
        this.node.runAction(seqAction);
    }
}