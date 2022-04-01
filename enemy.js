
class Enemy {
    constructor(gameStart, initValue){
        this.bg = get('#bg')
        this.hero = get(".heroImg_wrap");
        this.gameover_bg = get(".gameover");
        this.pointWrap = get('.point_wrap');
        this.pointElement = get('.point');
        this.enemyCount = initValue.enemyCount;
        this.point = initValue.point;
        this.speed = initValue.speed;
        this.addTime = initValue.addTime;
        this.nowRound = initValue.nowRound;
        this.roundCount = initValue.roundCount;
        this.step = 10;
        this.enemyEle;
        this.intervalName;
        this.gameStart = gameStart;
    }


    /*
    stopInterval (inervalName) {
        if(this.gameStart === false) {
            return clearInterval(inervalName)
        }
    }
    

    

    dieEnemy (enemyImg, nowEnemy) {
        this.pointElement.innerHTML = `${++this.point}`
        enemyImg.className = "die"
        console.log('잡았다!!')
        setTimeout(() => {
            nowEnemy.remove();
        }, 500)
    }*/ 

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
        const nowEnemy = this.enemyEle;
        let enemyY = this.enemyEle.offsetTop;
        let enemyLeftX = this.enemyEle.offsetLeft;
        let enemyRightX = this.enemyEle.offsetLeft + 45;
        
        const moveEnemy = setInterval(() => {
            nowEnemy.style.top = `${enemyY += this.step}px`
            
            //유령과 부딪히면?
            if(this.hero.offsetTop <= (enemyY + 30) && (this.hero.offsetLeft <= enemyRightX && enemyLeftX <= (this.hero.offsetLeft + 35))) {
                // this.stopInterval(moveEnemy)
                clearInterval(moveEnemy)
            }

            //유령이 땅에 닿았을 때
            if(545 < enemyY) {
                this.gameStart = false;
                // this.stopInterval(moveEnemy) //바닥에서 멈춤!
                clearInterval(moveEnemy)
                nowEnemy.remove();
            }


        }, this.speed)
    }

    addInterval (speed, addTime) {
        console.log(`roundCount: ${this.roundCount}`)

        //새로운 라운드 시작마다 유령 재설정
        this.addTime = addTime;
        this.speed = speed;
        
        this.intervalName = setInterval(() => {
            this.setEnemy()
            if(this.point === this.roundCount) {
                console.log('다음 라운드 가야함')
                clearInterval(this.intervalName)
                this.roundCount += 5;
                this.speed -= 20;
                this.addTime -= 1000;
                this.addEnemy()
            }
            
        }, this.addTime)
    }
    

    addEnemy () {
        // console.log(this.gameStart)
        this.addInterval(this.speed, this.addTime)
    }
}
