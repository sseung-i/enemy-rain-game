
class Init {
    constructor() {
        this.gameStart = false;
        this.pointWrap = get('.point_wrap');
        this.startBtn = get('.start_btn');
        this.pointElement = get('.point');
        this.gameoverEle = get('.gameover')
        this.hero = null;
        this.enemy = null;
        this.initValue = {
            enemyCount : 0,
            point : 0,
            speed : 100,
            addTime : 3000,
            nowRound : 1,
            roundCount : 5,
        }
        
    }
    
    
    btnClick () {
        this.gameStart = true;
        // console.log(this.gameStart)

        this.hero = new Hero()
        this.enemy = new Enemy(this)

        this.pointElement.innerHTML = '0'


        this.pointWrap.classList.toggle('hide')
        this.startBtn.classList.toggle('hide')

        // this.pointWrap.className = 'point_wrap'
        // this.startBtn.className = 'start_btn hide'

        this.enemy.roundChange()
        this.hero.moveHero()
        this.enemy.addEnemy()
    }
    
    
}

const startBtn = get(".start_btn")
const init = new Init()


startBtn.addEventListener('click', () => {
    // e.preventDefault();
    init.btnClick()
    
})