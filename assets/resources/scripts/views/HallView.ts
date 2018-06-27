
import Common from "../common/Common"

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallView extends cc.Component {
    onLoad () {

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

    onAvatarButtonClick() {
        Common.addPrefabToScene("prefabs/avatarDlg");
    }
}
