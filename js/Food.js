class Food {
    constructor(){
        this.foodStock = 0
        this.lastFed;
        this.image = loadImage("images/Milk.png")
    }
    getFedTime(lastFed){
        this.lastFed = lastFed
    }
    getFoodStock(){
        return this.foodStock
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }
    deductFoodStock(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1
        }
     
    }
    display()
    {
        var x = 120;
        var y = 120;
        imageMode(CENTER);
        //image(this.image, 120, 220, 50, 50)

        if(this.foodStock !== 0)
        {
            for(var i = 0; i < this.foodStock; i++)
            {
            if(i % 10 === 0) 
                {
                x = 120; 
                 y = y+50
                }              
            image(this.image, x, y, 50, 50)   
            x = x+30        
            }
        }
    }
    
}