export default class ServerSession {
    private static instance:ServerSession = null;
    private constructor(){}
    static Instance() {
        if(ServerSession.instance == null) {
            ServerSession.instance = new ServerSession;
        }

        return ServerSession.instance;
    } 

    connect() {

    }

    send(data:string) {

    }
} 