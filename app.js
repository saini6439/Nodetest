const moongoose = require("mongoose");

// connection creation and creation new db
moongoose.connect('mongodb://localhost:27017/ram',
    {useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: true,
    useUnifiedTopology: true
    }).then(()=> console.log("connection successfull...")).catch((err)=> console.log(err));


// Schem creation
    const playlistSchema= new moongoose.Schema({
        name:{
            type : String,
            required : true
        },
        ctype : String,
        videos : Number,
        author : String,
        active : Boolean,
        date : {
            type : Date,
            default : Date.now
        }
    })

// Collection creation
const Playlist= new moongoose.model("Playlist",playlistSchema);

const createDocument= async () =>{
    try{
        const reactPlaylist = new Playlist({
            name : "node js",
            ctype: "backend",
            videos:50,
            author:"js tech",
            active: true
        })
        const result = await reactPlaylist.save();
        console.log(result);
    }
    catch(err){
        console.log(err)
    }
}

//createDocument();

const getDocument = async() => {
    try{
        // const result = await Playlist.find({author:"js tech"})
        // .select({name:1})

        const result = await Playlist.find({name: {$in : ["jp saini", "Javascript"]}})
        .select({name:1}).countDocuments();

        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}



// update the documemnt

const updateDocument = async(_id)=>{
        try{
            // const result = await Playlist.updateOne({_id:id},{
            //     $set : {
            //         name : "Javascript"
            //     }
            // })

            // const result = await Playlist.updateOne({_id},{
            //     $set : {
            //         name : "Javascript"
            //     }
            // })

            const result = await Playlist.findByIdAndUpdate({_id},{
                $set : {
                    name : "Javascript test Final"
                }
            },
            {
                useFindAndModify: false
            }
            );

            console.log("Result",result);
        }
        catch(err){
            console.log(err)
        }
}

//updateDocument("60168c74de05ac4530eeafee");
//getDocument();

const deleteDocument= async(_id)=>{
    try{
        //const result = await Playlist.deleteOne({_id});
        const result = await Playlist.findByIdAndDelete({_id});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

deleteDocument("60165e5ab5b4ca1ad4222b20");