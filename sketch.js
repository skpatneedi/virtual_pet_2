var dog, happyDog, database, foodS, foodStock , position;
var backgroundImg, dogImg;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");  
  
}


function setup(){
    createCanvas(500,500);
    database = firebase.database();
    dog = createSprite(250,400,50,50);
    dog.addImage("dog",dogImg);
    dog.scale=0.25  ;
    foodStock =  database.ref('Food');
    foodStock.on("value",readStock)

    feedPet = createButton("Feed the Dog")
    feedPet.position(700,95);
    feedPet.mousePressed(feedDog)

    addFood = createButton("Add the food")
    addFood.position(400,95);
    addFood.mousePressed(addFoods)
      
    foodObj = new Food()
  }

function draw(){
    background("lightblue");
    foodObj.display();
    drawSprites();
    console.log(lastFed)
    textSize(25);
    fill("black");
    text("food remaining:"+ foodS,150,100);
    text("press space to feed the dog!" ,100 , 130 )
    
    fedTime = database.ref('fedTime');
    fedTime.on("value",function(data){
      lastFed = data.val();
    })
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last fed :" + lastFed % 12 + "PM",350,30)
    }else if(lastFed == 0){
      text("Last fed : 12 AM",350,30);
    }else{
      text("Last fed :" + lastFed + "AM",350,30)
    }
}

function WriteStock(x){
    if(x<=0){
        x=0
    }
    else{
        x=x-1;
    }
    database.ref('/').update({
        Food:x
    })
}
function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS)
    
}

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(), 
    fedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}