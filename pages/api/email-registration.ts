import { NextApiRequest, NextApiResponse } from "next";

export default function emailHandler(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req;
    if(method == "POST") {
        const {email, eventId} = req.body
        console.log(email, eventId)
        res.status(200).json({
            message: "You have registrered your email"
        })
    }
    if(method == "GET") {
        res.status(200).json({
            message: "Email received"
        })
    }
}