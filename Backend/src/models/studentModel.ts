import mongoose ,{Schema, Document} from "mongoose";

export interface IStudent extends Document{
    name:string;
    age:number;
    grade:string;
}


const stundentSchema  = new Schema<IStudent>(
{
    name:{type:String,required:true},
    age:{type:Number,required:true},
    grade:{type:String,required:true}

},{
    timestamps:true
}
)
export default mongoose.model<IStudent>('Student',stundentSchema)