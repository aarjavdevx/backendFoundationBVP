import { createConnectionRequest, findAcceptedConnections, findAllRequestForUser, findExistingRequestBetween, findPendingRequestForUser, findRequestById, updateRequestStatus } from "../repositories/connectionRepository.js"
import { findIncludedUserIds } from "../repositories/userRepository.js"


export const sendConnectionRequest = async(senderId, receiverId)=>{
    //1 khud ko request na bhej sake
    if(senderId === receiverId){
        throw new Error("You cannot send request to yourself")
    }
    //2. if requests alreadye exists, request na create ho sake
    const existing = await findExistingRequestBetween(senderId, receiverId)

    if(existing.length>0){
        throw new Error("A request already exist between these users")
    }

    return await createConnectionRequest(senderId, receiverId)
}

export const respondToRequest = async(requestId, userId, action)=>{

    //agar request exist hi nahin krti to kaise response

    const request = await findRequestById(requestId)


    if(!request){
        throw new Error("Request not found")
    }

    if(request.status !== 'pending'){
        throw new Error("hadd me rho!")
    }
    //kya requestusi uer ke liye hai jisko respons ekrna h
    if(request.receiver.toString() !==userId){
        throw new Error("You are not authorized to respond to this request")
    }

    const status = action === 'accept' ? 'accepted' : 'rejected'

    return await updateRequestStatus(requestId, status)
}

export const getMyNetworkFeed = async(userId)=>{

    //phle ye pta lgao ki is userID ke liye kaunsi requests already exits krti hai

    const allRequests = await findAllRequestForUser(userId) //array of objects obj = req document

    //re1 doc me jo sender vo aap khud ho to exlude kro resceive rko
    //req dovc me sender app nahi ho, app rceiver ho to snedr ko exclude kro
    const excludedIds = allRequests.map((req)=>{

        return req.sender.toString() === userId ? req.receiver.toString() : req.sender.toString()
    })

    excludedIds.push(userId)

    return await findIncludedUserIds(excludedIds)


}   

export const getPendingRequests = async(userId) =>{
    return await findPendingRequestForUser(userId)
}

export const getMyConnections  = async(userId) =>{
    return await findAcceptedConnections(userId)
}
