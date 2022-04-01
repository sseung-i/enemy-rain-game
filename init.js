const hero = new Hero()
const enemy = new Enemy()

class Init {
    constructor() {
        this.gameStart = false;
        this.pointWrap = get('.point_wrap');
    }
    
    
    btnClick () {
        if(this.gameStart) {
            this.gameStart = false;
            //멈추게
        } else {
            this.gameStart = true;
            this.pointWrap.className = 'point_wrap'
            hero.moveHero()
         }
    }


}

const startBtn = get(".start_btn")
const init = new Init()


startBtn.addEventListener('click', () => {
    // e.preventDefault();
    init.btnClick()
    
})