import * as pb from '../pb/mj_pb.js'

export interface IEvent {
    onUserLogin(rsp: pb.UserLoginRsp): boolean
}

export class MessageMgr {
    static instance(): MessageMgr {
        if (this.instance_ === null)
            this.instance_ = new MessageMgr()
        return this.instance_
    }

    setEvent(ev: IEvent): void {
        this.ev_ = ev
    }

    connect(host: string): Promise<any> {
        var this_ = this
        return new Promise((resolve, reject) => {
            if (this_.ws_ !== null) {
                reject(new Error("websocket has already connected"))
            }

            this_.ws_ = new WebSocket(`ws://${host}/`)
            this_.ws_.onopen = function(ev) {
                this_.ws_.onerror = this_.onError
                this_.ws_.onmessage = this_.onMessage
                this_.ws_.onclose = this_.onClose
                resolve(ev)
            }

            this_.ws_.onerror = function(ev) {
                reject(ev)
            }
        })
    }

    userLogin(userId: string): void {
        let this_ = this
        let req = new pb.UserLoginReq()
        req.setUserid(userId)

        this.sendPackage(pb.PackageID.PID_USER_LOGIN_REQ, req.serializeBinary())
    }

    createTable({userId, maxRound, baseScore, maxFan}): void {
        let req = new pb.CreateTableReq()
        req.setUserid(userId)
        req.setMaxround(maxRound)
        req.setBasescore(baseScore)
        req.setMaxfan(maxFan)

        this.sendPackage(pb.PackageID.PID_CREATE_TABLE_REQ, req.serializeBinary())
    }

    /* ----------------------- 私有方法 ----------------------- */

    private static instance_: MessageMgr = null
    private ws_: WebSocket = null
    private idempotent_: number = 0
    private activeTime_: number = 0
    private ev_: IEvent = null

    private constructor() {}

    private onError(err: any): void {
        console.log(err)
    }

    private onMessage(ev: any): void {
        ev.data.arrayBuffer().then((buf: Uint8Array) => {
            let pack = pb.Package.deserializeBinary(buf)

            switch (pack.getPid()) {
                case pb.PackageID.PID_USER_LOGIN_RSP:
                    MessageMgr.instance_.userLoginHandler(pack)
            }

            MessageMgr.instance_.idempotent_ = pack.getIdempotent()
        })
    }

    private onClose(ev: any): void {
        console.log(ev)
    }

    private sendPackage(pid: pb.PackageID, data: any): void {
        let pack = new pb.Package()
        pack.setPid(pid)
        pack.setData(data)
        pack.setIdempotent(new Date().getTime())

        this.ws_.send(pack.serializeBinary())
        this.activeTime_ = new Date().getTime()
    }

    private userLoginHandler(pack: pb.Package): boolean {
        if (pack.getIdempotent() <= MessageMgr.instance_.idempotent_) {
            return true
        }

        let rsp = pb.UserLoginRsp.deserializeBinary(pack.getData())
        return MessageMgr.instance_.ev_.onUserLogin(rsp)
    }
}

