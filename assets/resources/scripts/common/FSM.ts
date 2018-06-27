
export interface IState {
    onEnter();
    onExit();
}

export class FSM {
    private _curStateName = null;
    private _stateTable = null;
    private _states = null;
    private _events = null;
    
    public run(t) {
        this._stateTable = t;
        this._states = t["states"];
        this._events = t["events"];
        this._curStateName = this._stateTable["init"];
        let state = this._states[this._curStateName];
        state.onEnter();
    }

    public transition(eventName:string) {
        let statePair = this._events[eventName];
        if(this._curStateName == statePair.from) {
            let fromState = this._states[statePair.from];
            let toState = this._states[statePair.to]; 
            fromState.onExit();
            toState.onEnter();
            this._curStateName = statePair.to;
            cc.log("状态切换："+statePair.from+" to "+statePair.to);
        }else{
            cc.log("没有定义"+this._curStateName+"到"+statePair.to+"状态的转换");
        }
    }
}

