var express = require('express');
var eventsRouter = express.Router();
// const events = require('./../models/events');
const Events = require('./../models/events');

eventsRouter.get("/daily_events",function(req,res,next){
    const type = req.query.type;
    Events.getDailyEvents(type,res);
});

eventsRouter.get("/weekly_events",function(req,res,next){
    const type = req.query.type;
    Events.getDailyEvents(type,res);
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

eventsRouter.get("/daily_increment",function(req,res,next){
    const type = req.query.type;
    Events.getDailyIncrease(type,res);
});

eventsRouter.get("/weekly_increment",function(req,res,next){
    const type = req.query.type;
    Events.getWeeklyIncrease(type,res);
});

eventsRouter.get("/analysed_data",function(req,res,next){
    const type = req.query.type;
    Events.getAnalysedData(res);
});

eventsRouter.get("/daily_feed",function(req,res,next){
    Events.getDailyFeed(res);
});

eventsRouter.post("/register_app_event",function(req,res,next){
    Events.registerAppEvent(res,req);
})
module.exports = eventsRouter;