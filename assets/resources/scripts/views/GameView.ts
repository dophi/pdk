import Common from "../common/Common";
import { CardController } from "./CardController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameView extends cc.Component {
    @property(cc.Node)
    cardRoot: cc.Node = null;

    private controllerScript: CardController = null;

    onLoad() {
        cc.log("GameView onLoad");
        this.controllerScript = this.cardRoot.getComponent("CardController");
        this.loadCards();
    }
    private async loadOneCard() {
        let card = await Common.loadPrefab("prefabs/bigCard");
        return card;
    }
    private async loadCards() {
        for (let idx = 0; idx < 15; idx++) {
            let card = await this.loadOneCard();
            this.controllerScript.addCard(card);
            cc.log("load"+idx);
        }
    }
    //ui事件
    onSettingButtonClick() {
        Common.addPrefabToScene("prefabs/settingDlg");
    }

    onShopButtonClick() {
        Common.addPrefabToScene("prefabs/shopDlg");
    }
}

