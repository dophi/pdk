import { BaseDlg } from "./BaseDlg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EmailDlg extends BaseDlg {

    @property(cc.Node)
    scrollViewContentNode: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.createAllEmail();
    }

    async createOneEmail(name): Promise<cc.Node> {
        let promise = new Promise<cc.Node>((resolve) => {
            cc.loader.loadRes(name, cc.Prefab, (err, res) => {
                let node: cc.Node = cc.instantiate(res);
                resolve(node);
            });
        });
        return promise;
    }

    async createAllEmail() {
        let interval: number = 20;
        let height = -interval;
        for (let idx = 0; idx < 20; idx++) {
            let ret = await this.createOneEmail("prefabs/emailItem");
            ret.y = height;
            height = height - ret.height - interval;
            ret.parent = this.scrollViewContentNode;
        }

        this.scrollViewContentNode.height = -height;
    }
}
