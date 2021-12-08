// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MJ extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    clicked: boolean = false

    onLoad () {
        var this_ = this
        this.node.on('mousedown', (ev) => {
            if (this_.clicked)
            this_.node.setPosition(this_.node.position.x, this_.node.position.y - 30)
            else 
                this_.node.setPosition(this_.node.position.x, this_.node.position.y + 30)

            this_.clicked = !this_.clicked
        })
    }

    start () {
        let sp = this.getComponent(cc.Sprite)
        console.log(sp.spriteFrame)
        cc.resources.load("textures/MJ/my/Z_my", cc.SpriteAtlas, (err, atlas) => {
            sp.spriteFrame = atlas.getSpriteFrame("M_bamboo_8")
        })
    }

    setFrame(name: string) {
        
    }

    

    // update (dt) {}
}
