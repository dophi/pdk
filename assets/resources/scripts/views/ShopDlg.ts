import { BaseDlg } from "./BaseDlg";
import Common from "../common/Common";
import { DataManager, ShopItemData } from "../common/DataManager";
import ShopItem from "./ShopItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopDlg extends BaseDlg {
    @property(cc.Node)
    private itemContent:cc.Node = null;

    onLoad() {
        this.init(0.99,0.03);
        super.onLoad();
    }

    async loadTest(count:number) {
        this.itemContent.destroyAllChildren();
        let shopItems:ShopItemData[] = DataManager.Instance().getShopItemArray();
        for(let idx=0;idx<shopItems.length;idx++) {
            let shopItemData:ShopItemData = shopItems[idx];

            let node:cc.Node = await Common.loadPrefab("prefabs/shopItem");
            let shopItemScript:ShopItem = node.getComponent("ShopItem");
            shopItemScript.initData(shopItemData.type, shopItemData.count, shopItemData.priceType, shopItemData.price);
            node.parent = this.itemContent;
        }
    }


    //ui
    onCoinButtonClick() {
        this.loadTest(5);
    }

    onDiamondButtonClick() {
        this.loadTest(15);
    }

    onItemButtonClick() {
        this.loadTest(50);
    }
}
