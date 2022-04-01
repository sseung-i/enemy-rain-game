
class Init {
    constructor() {
        this.gameStart = false;
        this.pointWrap = get('.point_wrap');
        this.startBtn = get('.start_btn');
        this.initValue = {
            enemyCount : 0,
            point : 0,
            speed : 100,
            addTime : 3000,
            nowRound : 0,
            roundCount : 5,
        }
    }
    
    
    btnClick () {
        if(this.gameStart) {
            this.gameStart = false;
            this.startBtn.classList.toggle('hide')
            //멈추게
        } else {
            this.gameStart = true;
            const hero = new Hero()
            const enemy = new Enemy(this.gameStart, this.initValue)
            
            this.pointWrap.className = 'point_wrap'
            this.startBtn.classList.toggle('hide')
            hero.moveHero()
            enemy.addEnemy()
        }
    }
    
    
}

const startBtn = get(".start_btn")
const init = new Init()


startBtn.addEventListener('click', () => {
    // e.preventDefault();
    init.btnClick()
    
})