
import ConnectionRequest from "../models/ConnectionRequest.js"

//1.  create a connection request
export const createConnectionRequest = async(senderId, receiverId)=>{
    return await ConnectionRequest.create({
        sender: senderId,
        receiver: receiverId
    })
}

//2.Intition: kya connection exist karta hai do users ke beech me

export const findExistingRequestBetween = async(userA, userB)=>{
    return await ConnectionRequest.find({
        $or:[
            {sender: userA, receiver: userB},
            {sender: userB, receiver: userA}
        ]
    })
}

//3.Intution: REQUEST ID NIKALO TAAKI AGAR KAHI PE BAAD ME USE KRNA HO TO KR SAKE

export const findRequestById = async(requestId)=>{
    return await ConnectionRequest.findById(requestId)
}

4. //Intuition: STATUS UPDATE -> PENDING -> ACCEPTED, REJECTED JO BHI AAPKO STATUS UPDATE KRNA HAI USKI AAPKE PAAS REQUEST ID HONI CHAHIYE KYOKI USI KO TO UPDATE KROGE, AUR KISSE UPDATE KRNA H USKA STATUS
export const updateRequestStatus = async(requestId, status)=>{
    return await ConnectionRequest.findByIdAndUpdate(requestId, {status}, {new:true})
}

5. //find all requests fro user, array of objects of IDS

export const findAllRequestForUser = async(userId)=>{
    return await ConnectionRequest.find({
        $or: [
            {sender: userId},
            {receiver: userId}
        ]
    })
}

6. //find pending request fro user  taaki pending page pe dikha sake
export const findPendingRequestForUser = async(userId)=>{
    return await ConnectionRequest.find({
        receiver: userId,
        status: 'pending'
    }).populate('sender', 'name email') 
}

//
7. //find all accepted connections
export const findAcceptedConnections = async(userId)=>{
    return await ConnectionRequest.find({
        $or:[
            {sender: userId},
            {receiver: userId}
        ],
            
        
        status: 'accepted'
    })
    .populate('sender', 'name email')
    .populate('receiver', 'name email')

}


