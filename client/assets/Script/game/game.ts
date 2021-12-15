import { TableInfo } from "../engine/table_info";
import MJ from "../mj/mj";
import { mjMap } from "../mj/mj_map";

const { ccclass, property } = cc._decorator;

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
  lblTableNo: cc.Label = null

  @property(cc.Label)
  lblClock: cc.Label = null

  @property([cc.Node])
  myCards: cc.Node[] = []

  @property(cc.Node)
  gpMyCards: cc.Node = null

  @property(cc.Node)
  gpLeftCards: cc.Node = null

  @property(cc.Node)
  gpRightCards: cc.Node = null

  @property(cc.Node)
  gpTopCards: cc.Node = null

  ticker: number = 15
  readyTimer: any = null

  onLoad() {
    var this_ = this

    this_.lblTableNo.string = TableInfo.instance().TableNo.toString()

    this_.readyTimer = setInterval(() => {
      if (this_.ticker <= 0)
        this_.backToHall()

      this_.ticker--
      this_.lblClock.string = this_.ticker.toString()
    }, 1000)
  }

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

    var nodes: cc.Node[] = []
    cc.resources.load<cc.Prefab>("prefab/mjSelf", (err, prefab) => {
      for (let i = 0; i < 13; i++) {
        var n = cc.instantiate(prefab)
        nodes.push(n)
        var script = n.getComponent(MJ)
        script.name = i.toString()
        script.spriteFrame = mjMap.get(i)
        this_.gpMyCards.addChild(n, i, i.toString())
      }

      for (let i = 0; i < 13; i++) {
        nodes[i].getComponent(MJ).allCards = nodes
      }
    })

    cc.resources.load<cc.Prefab>("prefab/mjLeft", (err, prefab) => {
      for (let i = 0; i < 13; i++) {
        var n = cc.instantiate(prefab)
        this_.gpLeftCards.addChild(n, i, i.toString())
      }
    })

    cc.resources.load<cc.Prefab>("prefab/mjRight", (err, prefab) => {
      for (let i = 0; i < 13; i++) {
        var n = cc.instantiate(prefab)
        this_.gpRightCards.addChild(n, i, i.toString())
      }
    })

    cc.resources.load<cc.Prefab>("prefab/mjTop", (err, prefab) => {
      for (let i = 0; i < 13; i++) {
        var n = cc.instantiate(prefab)
        this_.gpTopCards.addChild(n, i, i.toString())
      }
    })
  }
}
