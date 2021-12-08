// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    pnlReady: cc.Node = null

    @property(cc.Node)
    popReadyBtn: cc.Node = null

    @property(cc.Node)
    readySignRight: cc.Node = null

    @property(cc.Node)
    readySignBtm: cc.Node = null

    @property(cc.Node)
    readySignLeft: cc.Node = null

    @property(cc.Node)
    readySignTop: cc.Node = null

    @property(cc.Node)
    pnlPlay: cc.Node = null

    @property(cc.Label)
    lblClock: cc.Label = null
    

    ticker: number = 15
    readyTimer: any = null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var this_ = this
        this.readyTimer = setInterval(() => {
            if (this_.ticker <= 0)
                this_.backToHall()

            this_.ticker--
            this_.lblClock.string = this_.ticker.toString()
        }, 1000)
    }

    start () {

    }

    // update (dt) {}

    showPopReadyBtn() {
        this.popReadyBtn.active = true
    }

    hidePopReadyBtn() {
        this.popReadyBtn.active = false
    }

    showPnlReady() {
        this.pnlReady.active = true
    }

    hidePnlReady() {
        this.pnlReady.active = false
    }

    showPnlPlay() {
        this.pnlPlay.active = true
    }

    hidePnlPlay() {
        this.pnlPlay.active = false
    }

    backToHall() {
        this.showPnlReady()
        this.hidePnlPlay()

        this.readySignTop.active = false
        this.readySignRight.active = false
        this.readySignBtm.active = false
        this.readySignLeft.active = false

        if (this.readyTimer !== null) {
            clearInterval(this.readyTimer)
            this.readyTimer = null
        }
        
        cc.director.loadScene("hall")
    }

    onBtnReadyClick() {
        this.readySignTop.active = true
        this.readySignRight.active = true
        this.readySignBtm.active = true
        this.readySignLeft.active = true

        this.hidePopReadyBtn()

        if (this.readyTimer !== null) {
            clearInterval(this.readyTimer)
            this.readyTimer = null
        }

        var this_ = this
        setTimeout(() => {
            this_.gameStart()
        }, 1500)
    }

    gameStart() {
        var this_ = this
        this_.ticker = 15

        setInterval(() => {
            if (this_.ticker <= 0)
                this_.ticker = 16

            this_.ticker--
            this_.lblClock.string = this_.ticker.toString()
        }, 1000)

        this.hidePnlReady()
        this.showPnlPlay()
        this.readySignTop.active = false
        this.readySignRight.active = false
        this.readySignBtm.active = false
        this.readySignLeft.active = false


    }
}
