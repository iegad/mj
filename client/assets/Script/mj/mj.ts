// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MJ extends cc.Component {
  name: string = ''
  spriteFrame: string = ''

  @property(cc.Node)
  public inner: cc.Node = null

  @property([cc.Node])
  public allCards: cc.Node[] = []

  onLoad() {
    this.inner = this.node.getChildByName('inner')
    var this_ = this
    cc.resources.load<cc.SpriteAtlas>('textures/MJ/my/Z_my', cc.SpriteAtlas, (err, atlas) => {
      this_.inner.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(this_.spriteFrame)
    })

    this.node.on('mousedown', (ev) => {
      for (let i = 0; i < this_.allCards.length; i++) {
        let inn = this_.allCards[i].getChildByName('inner')
        if (inn.position.y > 0)
          inn.setPosition(inn.position.x, -inn.position.y)
      }

      this_.inner.setPosition(this_.inner.position.x, -this_.inner.position.y)
    })
  }

  start() {

  }

  setFrame(name: string) {

  }



  // update (dt) {}
}
