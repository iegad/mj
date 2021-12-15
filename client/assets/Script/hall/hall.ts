import { TableInfo } from "../engine/table_info";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  popCreateTable: cc.Node = null

  @property(cc.Node)
  popJoinTable: cc.Node = null

  @property(cc.Node)
  popUserInfo: cc.Node = null

  @property(cc.Button)
  btnCreateTable: cc.Button = null

  @property(cc.Button)
  btnJoinTable: cc.Button = null

  @property(cc.EditBox)
  txtMaxRound: cc.EditBox = null

  @property(cc.EditBox)
  txtBaseScore: cc.EditBox = null

  @property(cc.EditBox)
  txtMaxFan: cc.EditBox = null

  showPopCreateTable() {
    this.popCreateTable.active = true
    this.btnCreateTable.enabled = false
    this.btnJoinTable.enabled = false
  }

  hidePopCreateTable() {
    this.popCreateTable.active = false
    this.btnCreateTable.enabled = true
    this.btnJoinTable.enabled = true
  }

  showPopJoinTable() {
    this.popJoinTable.active = true
    this.btnCreateTable.enabled = false
    this.btnJoinTable.enabled = false
  }

  hidePopJoinTable() {
    this.popJoinTable.active = false
    this.btnCreateTable.enabled = true
    this.btnJoinTable.enabled = true
  }

  showPopUserInfo() {
    this.popUserInfo.active = true
    this.btnCreateTable.enabled = false
    this.btnJoinTable.enabled = false
  }

  hidePopUserInfo() {
    this.popUserInfo.active = false
    this.btnCreateTable.enabled = true
    this.btnJoinTable.enabled = true
  }

  backToLogin() {
    cc.director.loadScene("login")
  }

  createTable() {
    let maxFan = Number(this.txtMaxFan.string)
    let maxRound = Number(this.txtMaxRound.string)
    let baseScore = Number(this.txtBaseScore.string)

    if (isNaN(maxFan) || maxFan <= 0) {
      alert("无效的最大番数")
      return
    }

    if (isNaN(maxRound) || maxRound <= 0) {
      alert("无效的最大局数")
      return
    }

    if (isNaN(baseScore) || baseScore <= 0) {
      alert("无效的底分")
      return
    }

    TableInfo.instance().BaseScore = baseScore
    TableInfo.instance().MaxFan = maxFan
    TableInfo.instance().MaxRound = maxRound

    this.enterGame()
  }

  enterGame() {
    cc.director.loadScene("game")
  }
}
