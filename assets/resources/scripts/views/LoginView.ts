import LoginModel from "../models/LoginModel";
import EventDispatcher from "../common/EventDispatcher";
import {Events} from "../globals/Events";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LoginView extends cc.Component {
    private model: LoginModel = null;

    @property(cc.Label)
    loginStateLabel: cc.Label = null;

    onLoad() {
        EventDispatcher.Instance().on(Events.Local_LoginSuccess, this.onLoginSuccess, this);
        EventDispatcher.Instance().on(Events.Local_LoginFailed, this.onLoginFailed, this);
        this.model = new LoginModel;
        this.model.load();
    }

    onDestroy() {
        EventDispatcher.Instance().off(Events.Local_LoginSuccess, this.onLoginSuccess);
        EventDispatcher.Instance().off(Events.Local_LoginFailed, this.onLoginFailed);
        this.model.destroy();
    }

    onLoginSuccess() {
        this.loginStateLabel.string = "登陆成功";
        cc.director.loadScene("scenes/hall");
    }

    onLoginFailed() {
        this.loginStateLabel.string = "登陆失败";
    }

    // ui响应函数
    onLoginButtonClick() {
        this.loginStateLabel.string = "正在登陆中";
        this.model.login();
    }
}
