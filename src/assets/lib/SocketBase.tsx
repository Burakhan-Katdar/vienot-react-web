import { io } from "socket.io-client";
import { socketLinkServer } from "./Constants";

class SocketBase {
    private socketInstance

    constructor() {
        this.socketInstance = io(socketLinkServer);
    }

    GetSocketInstance = () => {
        return this.socketInstance
    }
}

export default new SocketBase