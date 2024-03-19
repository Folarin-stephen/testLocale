import mongoose from "mongoose";
import Blacklist from "@/resources/user/token.blaclistInterface"
const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
export default mongoose.model<Blacklist>("blacklist", BlacklistSchema);