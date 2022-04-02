
class Enemy {
    constructor(init){
        this.bg = get('#bg')
        this.hero = get(".heroImg_wrap");
        this.gameover_bg = get(".gameover");
        this.pointWrap = init.pointWrap;
        this.pointElement = init.pointElement;
        this.enemyCount = init.initValue.enemyCount;
        this.point = init.initValue.point;
        this.speed = init.initValue.speed;
        this.addTime = init.initValue.addTime;
        this.nowRound = init.initValue.nowRound;
        this.roundCount = init.initValue.roundCount;
        this.step = 10;
        this.enemyEle;
        this.intervalName = null;
        this.moveEnemy = null;
        this.init = init;
        this.gameStart = init.gameStart;
        this.speedup_round = 10;
        this.nowLiveEnemyt = 5;
    }

    gameOver_view () {
        this.init.gameoverEle.classList.toggle('hide')

        //재시작 구현시
        // this.init.pointWrap.classList.toggle('hide')
        // this.init.startBtn.classList.toggle('hide')
    }

    gameOver () {
        //생성 멈춤
        clearInterval(this.intervalName)
        const nowLiveEnemy = document.querySelectorAll('.enemyWrap').length;
        const lastIntervalId = this.moveEnemy;
        clearInterval(lastIntervalId)

        for(let i = 0; i <= nowLiveEnemy+5; i++) {
            clearInterval(lastIntervalId + i)

        }

        this.gameOver_view()
        this.gameStart = false;
    }
    
    getEnemy (enemyX) {
        this.enemyCount++

        const wrapper = document.createElement("div")
        wrapper.className = `enemyWrap enemy${this.enemyCount}`

        //이미지 생성
        const element = document.createElement("img")
        element.src = "./images/enemy.png"
        element.className = 'enemyImg'
        
        wrapper.appendChild(element)
        this.bg.appendChild(wrapper);

        const thisEnemy = get(`.enemy${this.enemyCount}`)
        thisEnemy.style.left = `${enemyX}px`
        this.enemyEle = thisEnemy;
        // console.log(thisEnemy)
    }

    dieEnemy (enemyImg, nowEnemy) {
        this.pointElement.innerHTML = `${++this.point}`
        enemyImg.className = "die"
        // console.log('잡았다!!')
        setTimeout(() => {
            nowEnemy.remove();
        }, 500)
    }

   
    setEnemy () {
        //랜덤값 생성
        let tf = true;
        while(tf) {
            let num = parseInt(Math.random()*750)
            //짝수면 getEnemy에 값을 넘겨주고 종료
            if(num%2) {
                this.getEnemy(num)
                tf = false;
            }
            //홀수면 다시 실행
        }
        //유령 랜덤 등장!!
        //충돌 감지를 위한 현재 유령의 위치값
        const nowEnemy = this.enemyEle;
        let enemyY = this.enemyEle.offsetTop;
        let enemyLeftX = this.enemyEle.offsetLeft;
        let enemyRightX = this.enemyEle.offsetLeft + 45;

        //유령을 잡았을때 이미지 변경을 위해
        //현재 유령의 img엘리먼트를 변수에 담기!
        const enemyImg = nowEnemy.firstChild;
        
        
        
        
        
        let moveEnemy = setInterval(() => {
            console.log(`유령 움직임 인터벌 ${moveEnemy}`)
            nowEnemy.style.top = `${enemyY += this.step}px`
            
            //유령과 부딪히면?
            if(this.hero.offsetTop <= (enemyY + 30) && (this.hero.offsetLeft <= enemyRightX && enemyLeftX <= (this.hero.offsetLeft + 35))) {
                clearInterval(moveEnemy)
                this.dieEnemy(enemyImg, nowEnemy)
                return
            }
            
            
            //바닥 닿고 게임오버
            if(enemyY > 545) {
                this.moveEnemy = moveEnemy
                clearInterval(moveEnemy)
                
                this.gameOver()
                
            }
        }, this.speed)
        
        
        
        
        
        
    }
    
    roundChange () {
        let roundEle = get('.round');
        let roundText = get('.round span');
        roundText.innerHTML = `${this.nowRound}`
        roundEle.classList.toggle('hide')
        setTimeout(() => {
            roundEle.classList.toggle('hide')
        },1000)
    }

    addInterval (speed, addTime) {
        
        //새로운 라운드 시작마다 유령 재설정
        this.addTime = addTime;
        this.speed = speed;
        this.intervalName = setInterval(() => {
            console.log(`유령 생성 인터벌 ${this.intervalName}`)
            this.setEnemy()
                if(this.point === this.roundCount) {
                    clearInterval(this.intervalName)
                    this.nowRound++
                    this.roundChange()
                    this.roundCount += 5;
                    if( 10 < this.speed && !(this.nowRound%2) ) {
                        this.speed -= 10;
                        // console.log(`현재 스피드 : ${this.speed}`)
                    }
                    if( 50 < this.addTime && this.nowRound%2 ) {
                        this.addTime -= 500;
                        // console.log(`현재 생성속도 : ${this.addTime}`)
                }
                this.addEnemy()
            }
        }, this.addTime)
    }
    

    addEnemy () {
        this.addInterval(this.speed, this.addTime)
    }
}
