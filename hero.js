const get = (target) => document.querySelector(target)

class Hero {
    constructor(){
        this.bg = get('#bg')
        this.hero = get(".heroImg_wrap")
        this.positionX = this.hero.offsetLeft;
        this.step = 10;
        // this.init = init;
        // this.game = game;
    }

    moveHero () {
        document.addEventListener('keydown', (e) => {

            const heroImg = get(".heroImg_wrap img")
            
            if( e.key === "ArrowLeft" ) {
                if(this.positionX < 15) return;
                this.hero.style.left = `${this.positionX -= this.step}px`
                
                //hero이미지 변경
                heroImg.className = "hero_l"
            } else if ( e.key === "ArrowRight" ) {
                if(775 < this.positionX) return;
                this.hero.style.left = `${this.positionX += this.step}px`
                
                //hero이미지 변경
                heroImg.className = "hero_r"
            } else {
                return;
            }
        })

    }

}


