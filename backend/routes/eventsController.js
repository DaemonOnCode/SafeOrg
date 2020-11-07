var express = require('express');
var eventsRouter = express.Router();
// const events = require('./../models/events');
const Events = require('./../models/events');

eventsRouter.get("/daily_events",function(req,res,next){
    const type = req.query.type;
    Events.getDailyIncrease(type,res);
});

eventsRouter.get("/weekly_events",function(req,res,next){
    const type = req.query.type;
    Events.getDailyIncrease(type,res);
});

eventsRouter.get("/",function(req,res,next){
    const type = req.query.type;
    Events.fetchAll(res);
});

eventsRouter.post("/",function(req,res,next){
    const event = new Events();
    event.type = req.body.type;
    event.video_id  = req.body.video_id;
    event.create(res);
});

module.exports = eventsRouter;