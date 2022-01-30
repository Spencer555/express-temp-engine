// mongo uses bson which is binary json 

// collection is similar to a table and holds documents of data


show dbs : show databases

use dbasename : use the dbase or create the db if it does not exist

show collections : show collections in the dbase 

to drop a database use it and type : db.dropDatabase()


db : to show which dbase u are using 

db.createCollection("collectionname") : create a collection

//insert data 
// db.nameofcollection.insert({anyobj uwant})
db.posts.insert({
    title:'otf',
    body:'gang squad 9',
    age:32,
    days:[32, 3, 32],
    data: Date(),

    user: {
        name:'red cat',
        status:'author'
    }
})


//insert many posts 
db.posts.insertMany(
    [
        {
            title:'spl',
            age:'fd'
        },
        {
            title:'spl',
            age:'fd'
        },
        {
            title:'spl',
            age:'fd'
        },
        {
            title:'spl',
            age:'fd'
        },
        {
            title:'spl',
            age:'fd'
        }
    ]
)

///find all of the data in a collection
db.collectionName.find()
db.collectionName.find().pretty() //to make it nice

//to find title is spl
db.collectionName.find({name of category:"value of the category"})
e.g.
db.collectionName.find({title:'spl'})

//count of item
db.collectionName.find({title:'spl'}).count()

//limit to only 2 results
db.collectionName.find({title:'spl'}).limit(2)

//find only one row result
db.collectionName.findOne({title:'spl'})

//to sort 
// to sort by title  1 for ascending -1 for descending
db.collectionName.find().sort({title:1})

//to loop and print something out based on collection
db.collectionName.find().forEach( function(doc){
    print("Blog Post: " + doc.title )
})


//update this replace the entire thing and be sure to add all the fields u have to update 
db.collectionName.update({title:'spl'}, {
    title:'new updated data',
    age:'fsdkfl'
}, {
    upsert: true
})

//if upsert is true it updates it if it does not exist it creates it  


//this updates only this or add the field if this does not exist
db.collectionName.update({title:'spl'}, {
      $set : {
          title:"pron",
          color:"green"
      }
})


//updates the integer by add or minus increase the likes by 2
db.posts.update({title:'spl'}, {$inc: {likes:2}})

//rename  likes to views 
db.posts.update({title:'spl'}, {$rename: {likes:'views'}})


//delete item
db.posts.remove({title:'spl'})


//in a relational db u need to create a foriegn key but in mongodb u can store comments directly in the main file

db.posts.update({title:'spl'}, 
{
    $set : {
        comments : [
            { 
                name:'111fdfs',
                comment:'jhfdf fdsjfksaj'
            },
            { 
                name:'fdf32s',
                comment:'fdf fds2341jfksaj'
            },
            { 
                name:'fdfs343',
                comment:'fdf fdsjfyteksaj'
            },
            { 
                name:'fd2654fs',
                comment:'fdf ffgewdsjfksaj'
            },
            { 
                name:'fd4352fs',
                comment:'fdf fd543sjfksaj'
            },
            { 
                name:'fderefs',
                comment:'fdf fsfassdsjfksaj'
            },
            { 
                name:'fdfsfdg',
                comment:'fdf fdsjsfksaj'
            },
        ]
    }
})

//to get the post
db.posts.find({
    comments:{
        $elemMatch: {
            name: "fdfsfdg"
        }
    }
})

// to add index to search by
db.posts.createIndex({title:'text'})

//to search by index u must create the index b4 u can searcg by
db.posts.find({
    $text: {
        $search: "\'fdfsf \'"
    }
})

//update views by 10
db.posts.update({title:"spl"}, {Sset:{views:10}})



//find views greater than 10
// lt or lte less than or less than equal to
//gt or gte greater than or greater than or equal to
db.posts.find({views:{$gt:10}})