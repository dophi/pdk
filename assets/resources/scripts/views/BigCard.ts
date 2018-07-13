import { ICardSelectResult } from "./CardController";
import { CardType } from "../globals/Types";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BigCard extends cc.Component implements ICardSelectResult {
    public isSelected: boolean = false;

    @property(cc.Node)
    private selectMask: cc.Node = null;

    @property(cc.Node)
    private bgRoot:cc.Node = null;  //图案牌背景（J Q K这些）

    @property(cc.Node) 
    private icon:cc.Node = null;

    @property(cc.Node)
    private point:cc.Node = null;

    onLoad() {

    }

    initData(point, type) {
        let iconName:string = "";
        if(type == CardType.Spades) {
            iconName = "f_s_spade";
        }else if(type == CardType.Hearts) {
            iconName = "f_s_heart";
        }else if(type == CardType.Clubs) {
            iconName = "f_s_club";
        }else if(type === CardType.Diamonds) {
            iconName = "f_s_diamond";
        }else{
            
        }
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
