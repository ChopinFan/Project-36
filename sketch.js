//I didn't name the dog, a preschooler did but I think that Charlie suits my sprite :)

var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed, addfood;
var fedTime, lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("Images/dogImg.png");
   dogImg1=loadImage("Images/dogImg1.png");
  }


function setup() {
  
  createCanvas(1000,500);
  database=firebase.database();
  console.log(database);
  
  foodObj = new Food();

  dog=createSprite(900,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed Charlie");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {

  background(46,139,67);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
   else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }
   else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  
  database.ref('/').update({
    Food:x
  })
}



function feedDog(){
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}