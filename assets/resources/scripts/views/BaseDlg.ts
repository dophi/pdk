
const {ccclass, property} = cc._decorator;
@ccclass
export class BaseDlg extends cc.Component {
    onLoad() {
        this.node.addComponent(cc.BlockInputEvents);
        this.node.width = 50000;
        this.node.height = 50000;
        this.node.scale = 0.95;
        this.node.opacity = 180;
        let actionTime = 0.06;
        let scaleAction = cc.scaleTo(actionTime, 1.0);
        let fadeAction = cc.fadeIn(actionTime/2);
        let spawnAction = cc.spawn(scaleAction, fadeAction);
        this.node.runAction(spawnAction);
    }
    
    private closeActionFinished() {
        this.node.removeFromParent();
    }

    onCloseDlg() {
        let actionTime = 0.06;
        let scaleAction = cc.scaleTo(actionTime, 0.95);
        let fadeAction = cc.fadeOut(actionTime);
        let spawnAction = cc.spawn(scaleAction, fadeAction);
        let endFuncAction = cc.callFunc(this.closeActionFinished, this);
        let seqAction = cc.sequence(spawnAction, endFuncAction);
        this.node.runAction(seqAction);
    }
}