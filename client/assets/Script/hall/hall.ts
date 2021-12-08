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
    popCreateTable: cc.Node = null

    @property(cc.Node)
    popJoinTable: cc.Node = null

    @property(cc.Node)
    popUserInfo: cc.Node = null

    @property(cc.Button)
    btnCreateTable: cc.Button = null

    @property(cc.Button)
    btnJoinTable: cc.Button = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

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

    enterGame() {
        cc.director.loadScene("game")
    }
}
