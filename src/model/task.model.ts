import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const taskSchema = new Schema(
    {
        taskName : {
            type: String,
            required : true,
            trim : true,
            index : true
        },
        taskDescription : {
            type: String,
        },
        status : {
            type: String
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps :true
    }
    );
export const Task = mongoose.model("Task" , taskSchema);    