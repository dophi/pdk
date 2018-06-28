const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopItem extends cc.Component {

    @property(cc.Label)
    smallLabel: cc.Label = null;

    @property(cc.Sprite)
    bigIcon: cc.Sprite = null;

    @property(cc.Sprite)
    smallIcon: cc.Sprite = null;

    @property(cc.Label)
    bigLabel: cc.Label = null;    

    //唯一id,数据层物品的id
    @property
    sid: number = 0;

    initData(smallNumber, bigNumber, smallSprite, bigSprite) {
        this.smallLabel.string = ""+smallNumber;
        this.bigLabel.string = ""+bigNumber;
        this.smallIcon = smallSprite;
        this.bigIcon = bigSprite;
    }

    // onLoad () {}
}
