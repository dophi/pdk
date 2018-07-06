import BigCard from "./BigCard";

export interface ICardSelectResult {
    isSelected:boolean;
    onSelected();
    onUnselected();
    onSelectFinished();
}

const { ccclass, property } = cc._decorator;

@ccclass
export class CardController extends cc.Component {
    private space: number = 40;
    private touchBeganPos: cc.Vec2 = null;
    private selectCards: cc.Node[] = [];
    private cardOrginY:number = 0;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, (e: cc.Touch) => {
            this.touchBeganPos = this.node.convertTouchToNodeSpaceAR(e);
            this.handleTouch(e);
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Touch) => {
            this.handleTouch(e);
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (e: cc.Touch) => {
            this.handleTouchFinished();
        });
    }

    private handleTouch(touch: cc.Touch) {
        this.selectCards = [];
        let pos = this.node.convertTouchToNodeSpaceAR(touch);
        let y = this.touchBeganPos.y;
        let left: number = 0;
        let right: number = 0;
        if (pos.x > this.touchBeganPos.x) {
            left = this.touchBeganPos.x;
            right = pos.x;
        } else {
            left = pos.x;
            right = this.touchBeganPos.x;
        }

        let selectRect: cc.Rect = cc.rect(left, y, right - left, 1);
        let cards: cc.Node[] = this.node.children;
        let cardCount: number = this.node.childrenCount;
        let ignore:boolean = false;
        for (let idx = cardCount - 1; idx >= 0; idx--) {
            let cardNode = cards[idx];
            let script: BigCard = cardNode.getComponent("BigCard");
            if (cc.rectIntersectsRect(selectRect, cardNode.getBoundingBox())) {
                if(!ignore) {
                    script.onSelected();
                    this.selectCards.push(cardNode);
                    if(cardNode.getBoundingBox().x<left) {
                        ignore = true;
                    }
                }else{
                    script.onUnselected();
                }

            } else {
                script.onUnselected();
            }
        }

    }

    private handleTouchFinished() {
        this.selectCards.forEach(card => {
            let script: BigCard = card.getComponent("BigCard");
            script.isSelected = !script.isSelected;
            if(script.isSelected) {
                card.y = this.cardOrginY+20;
            }else{
               card.y = this.cardOrginY; 
            }

            script.onSelectFinished();
        });
    }

    private getSelectCardArray() {
        let selectCards:cc.Node[] = [];
        this.node.children.forEach(card => {
            let script: BigCard = card.getComponent("BigCard");
            if(script.isSelected) {
                selectCards.push(card);     
            }
        });

        return selectCards;
    }

    addCard(card: cc.Node) {
        this.cardOrginY = card.y;
        card.parent = this.node;
        let cards: cc.Node[] = this.node.children;
        let cardCount: number = this.node.childrenCount;
        let left = this.space * cardCount * 0.5;
        for (var idx = 0; idx < cardCount; idx++) {
            let card: cc.Node = cards[idx];
            card.x = left + idx * this.space;
        }
    }

}
