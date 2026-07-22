import { getMyConnections, getMyNetworkFeed, getPendingRequests, respondToRequest, sendConnectionRequest } from "../services/connectionservice.js"

export const sendRequest = async(req, res) =>{

    try {
        const {receiverId} = req.params
        const request = await sendConnectionRequest(req.id, receiverId )
        res.status(200).json({
            success: true,
            message: 'Connection request sent succesfully',
            request
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const acceptRequest = async(req, res)=>{

    try {
       const {requestId} = req.params

       const acceptedRequest = await respondToRequest(requestId,req.id,'accept')
       res.status(201).json({
        success: true,
        message: 'Connection accepted sent succesfully',
        acceptedRequest
    })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const rejectRequest = async(req, res)=>{

    try {
       const {requestId} = req.params

       const rejectedRequest = await respondToRequest(requestId,req.id,'reject')
       res.status(201).json({
        success: true,
        message: 'Connection rejected  succesfully',
        rejectedRequest
    })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const myFeed = async(req, res)=>{
    try {
        const feed = await getMyNetworkFeed(req.id)
        res.status(200).json({
            success: true,
            message: 'feed fetched succesfully',
            feed
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const getPending = async(req, res)=>{
    try {
        const pending = await getPendingRequests(req.id)
        res.status(200).json({
            success: true,
            message: 'pending requests fetched succesfully',
            pending
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const myConnections = async(req, res)=>{
    try {
        const connections = await getMyConnections(req.id)
        res.status(200).json({
            success: true,
            message: 'all connections fetched succesfully',
            connections
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}