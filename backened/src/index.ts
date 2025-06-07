declare global{
    namespace Express{
        export interface Request{
            userId?:string;
        }
    }
}

import express from "express";
import bcrypt, { hash } from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import { ContentModel, LinkModel, UserModel,TagModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async function (req, res) {

    const userBody = z.object({
        userName: z.string().min(3).max(30),
        password: z.string().min(6).max(30)
    });
    type FinalUserSchema = z.infer<typeof userBody>
   // const updateBody: FinalUserSchema = req.body;
    const parseDataWithSuccess = userBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.status(401).json({
            msg: "invalid input",
            error: parseDataWithSuccess.error
        })
    }
    const userName = req.body.userName;
    const password = req.body.password;
    let errorThrown = false;
    try {
        const hashedpassword = await bcrypt.hash(password, 5);
        console.log(hashedpassword);
        await UserModel.create({
            userName: userName,
            password: hashedpassword
        });
    }
    catch (e) {
        res.json({
            msg: "user already exists "
        })
        errorThrown = true;
    }
    if (!errorThrown) {
        res.json({
            msg: "you are signed up"
        });
    }
});

app.post("/api/v1/signin", async function (req, res) {

    const userName = req.body.userName;
    const password = req.body.password;

    const user = await UserModel.findOne({
        userName
    })

    if (!user) {

        res.json({
            msg: "invalid credentials"
        })
        return
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET)
        res.json({
            msg:"signed in",
            token: token
        })
    }

    else {

        res.json({
            msg: "invalid credential"
        })
    }


})

app.post("/api/v1/content",userMiddleware ,async function (req, res) {
   
    const link= req.body.link;
    const type=req.body.type;
    const title= req.body.title;
    const tag=req.body.tags;
    const tagIds=[];
    if (tag && typeof tag === 'string'){
    const tagTitles=tag.split(",").map((t:string)=>t.trim().toLowerCase());
    
    for(const title of tagTitles){
        let existingTag = await  TagModel.findOne({title});
        if(!existingTag){
            existingTag=await TagModel.create({title});
        }
        tagIds.push(existingTag._id);

    }
}
     await ContentModel.create({
        link:link,
        type:type,
        title:title,
        tags:tagIds,
        userId: req.userId

    })
    res.json({
        msg:"content added"
    })


});
app.get("/api/v1/content",userMiddleware, async function (req, res) {
   
    const userId=req.userId;
    const content= await ContentModel.find({
        userId:userId
    }).populate("userId").populate("tags");
   res.json({
    content
});

})

app.delete("/api/v1/content", userMiddleware,async function (req, res) {
    const contentId= req.body.contentId;
    await ContentModel.deleteMany({
        _id:contentId,
       
        userId:req.userId
    })
    res.json({
        msg:"deleted"
    })
})

app.post("/api/v1/brain/share",userMiddleware, async function (req, res) {
   const share=req.body.share;
   if(share){
    const existngLink= await LinkModel.findOne({
        userId:req.userId
    });
    if(existngLink){
        res.json({
            hash:existngLink.hash
        })
        return;
    }
    const hash=random(10);
        await LinkModel.create({
        hash:hash,
       
        userId:req.userId
    })
    res.json({
        message: hash
    })
   }
   else{
    await LinkModel.deleteOne({
       
       userId:req.userId
    })
   }
   res.json({
    msg:"removed link"
   })
})

app.get("/api/v1/brain/:shareLink", async function (req, res) {
    const hash=req.params.shareLink;
    const link= await LinkModel.findOne({
        hash:hash
    });
    if(!link){
        res.json({
            msg:"sorry incorrect input"
        })
        return;
    }
    const content= await ContentModel.find({
        userId:link.userId
    })
    const user= await UserModel.findOne({
        _id:link.userId
    })
    if(!user){
        res.status(411).json({
            message:"usernot found,error should ideallly not happend "
        })
        return;
     
    }
    res.json({
        username:user.userName,
        content:content
    })


})
app.listen(3001);
