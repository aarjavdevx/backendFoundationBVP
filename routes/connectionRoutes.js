import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { acceptRequest, getPending, myConnections, myFeed, rejectRequest, sendRequest } from '../controller/connectionController.js'

const router= express.Router()

router.get('/feed', protect, myFeed)

router.get('/pending', protect, getPending)

router.get('/my-connections', protect, myConnections)

router.post('/send/:receiverId', protect, sendRequest )

router.put('/accept/:requestId', protect, acceptRequest )

router.put('/reject/:requestId', protect, rejectRequest)

export default router;