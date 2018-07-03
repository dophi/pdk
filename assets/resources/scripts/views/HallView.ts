
import Common from "../common/Common"

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallView extends cc.Component {
    onLoad() {

    }

    onDestroy() {

    }

    //ui事件
    onSettingButtonClick() {
        Common.addPrefabToScene("prefabs/settingDlg");
    }

    onReadmeButtonClick() {
        Common.addPrefabToScene("prefabs/readmeDlg");
    }

    onEmailButtonClick() {
        Common.addPrefabToScene("prefabs/emailDlg");
    }

    onAvatarButtonClick() {
        Common.addPrefabToScene("prefabs/avatarDlg");
    }

    onAddCoinButtonClick() {
        Common.addPrefabToScene("prefabs/shopDlg");
    }

    onAddDiamondButtonClick() {
        Common.addPrefabToScene("prefabs/shopDlg");
    }

    onShopButtonClick() {
        Common.addPrefabToScene("prefabs/shopDlg");
    }

    onEnterButtonClick_Test() {
        cc.director.loadScene("scenes/game");
    }
}
