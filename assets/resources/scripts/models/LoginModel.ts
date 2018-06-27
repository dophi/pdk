import EventDispatcher from "../common/EventDispatcher";
import {Events} from "../events/Events";
import IModel from "./IModel";

export default class LoginModel implements IModel {
    load() {
        EventDispatcher.Instance().on(Events.Net_LoginSuccess, this.onNetLoginSuccess, this);
        EventDispatcher.Instance().on(Events.Net_LoginFailed, this.onNetLoginFailed, this);
    }

    destroy() {
        EventDispatcher.Instance().off(Events.Net_LoginSuccess, this.onNetLoginSuccess);
        EventDispatcher.Instance().off(Events.Net_LoginSuccess, this.onNetLoginFailed);
    }

    login() {
        //网络登陆请求
        
        //假实现
        this.onNetLoginSuccess();
    }

    onNetLoginSuccess() {
        EventDispatcher.Instance().dispatch(Events.Local_LoginSuccess);
    }

    onNetLoginFailed() {
        EventDispatcher.Instance().dispatch(Events.Local_LoginFailed);
    }
}
