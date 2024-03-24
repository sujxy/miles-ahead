import express from 'express';
const routers=express.Router();
import {CreateUser,ValidateUser} from "../controller/UserController.js";
import {AddReport1,AddReport2,AddReport3,GetReport1,GetReport2} from "../controller/ReportControllers.js";
import {AddUserConversation1,AddUserConversation2,AddUserConversation3} from "../controller/UserInputControllers.js"

routers.post('/signup',CreateUser);
routers.post('/login',ValidateUser);
routers.post('/report1_desc',AddReport1);
routers.post('/report2_desc',AddReport2);
routers.post('/report3_desc',AddReport3);
routers.post('/userConv1',AddUserConversation1);
routers.post('/userConv2',AddUserConversation2);
routers.post('/userConv3',AddUserConversation3);
routers.get('/get_report1_desc',GetReport1);
routers.get('/get_report2_desc',GetReport2);

export default routers;
