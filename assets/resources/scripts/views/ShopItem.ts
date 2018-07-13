import { getItemTypeImageName, ItemType, ShopItemType } from "../globals/Types";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem extends cc.Component {

    @property(cc.Label)
    countLabel: cc.Label = null;

    @property(cc.Sprite)
    itemTypeIcon: cc.Sprite = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    @property(cc.Sprite)
    priceTypeIcon: cc.Sprite = null;

    //唯一id,数据层物品的id
    sid: number = 0;

    initData(itemType, count, priceType, price) {
        let itemName = getItemTypeImageName(itemType, ShopItemType.Item);
        this.itemTypeIcon.spriteFrame.setTexture(cc.url.raw("/images/common/"+itemName+".png"));
        this.countLabel.string = "" + count;
        let itemPriceName = getItemTypeImageName(itemType, ShopItemType.Price);
        this.priceTypeIcon.spriteFrame.setTexture(cc.url.raw("/images/common/"+itemName+".png"));
        this.priceLabel.string = "" + price;
    }

    // onLoad () {}
}
