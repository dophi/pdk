import Common from "../common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameView extends cc.Component {
    onLoad() { }

    //ui事件
    onSettingButtonClick() {
        Common.addPrefabToScene("prefabs/settingDlg");
    }

    onShopButtonClick() {
        Common.addPrefabToScene("prefabs/shopDlg");
    }
}

