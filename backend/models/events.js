var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(`${__dirname}/../db/`, 'safe-org.db')
let db = new sqlite3.Database(dbPath,sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connected to the safe-org database.');
  });
class Events{
    static eventTypeEnum = {
        "mask": 0,
        "social_distancing": 1
    }
    constructor(){
        this.id = -1;
        this.type =  0;
        this.timestamp = new Date().toISOString();
        this.video_id = -1;
    }
    static getDailyEvents(eventType){
        let stmt = `SELECT * from EVENTS where type = ${Events.eventTypeEnum[eventType]}`;
        if(eventType == 3)
            stmt = `SELECT * from EVENTS`;

        db.all(stmt, [], (err, rows) => {
            if (err) {
                console.log(err)
                throw err;
            }
            const currentTime = new Date().getTime();
            let finalOut = []
            let offset = 24*60*60*1000;
            rows.forEach((row) => {
                if(new Date(row.timestamp).getTime() <= currentTime && new Date(row.timestamp).getTime() >= currentTime-offset)
                    finalOut.push(row);
            });
            return finalOut;
        });
    }

    static getWeeklyEvents(eventType){
        let stmt = `SELECT * from EVENTS where type = ${Events.eventTypeEnum[eventType]}`;

        db.all(stmt, [], (err, rows) => {
            if (err) {
                // res.send({status: false, data: 0});
                throw err;
            }
            const currentTime = new Date().getTime();
            let finalOut = [];
            let offset = 24*60*60*1000*7;
            rows.forEach((row) => {
                if(new Date(row.timestamp).getTime() <= currentTime && new Date(row.timestamp).getTime() >= currentTime-offset)
                    finalOut.push(row);
            });
            return finalOut;
        });
    }

    static getIncreaseBase(eventType,offset1,offset2,res){
        let stmt = `SELECT * from EVENTS where type = ${Events.eventTypeEnum[eventType]}`;

        db.all(stmt, [], (err, rows) => {
            if (err) {
                res.send({status: false, data: 0})
                throw err;
            }
            const currentTime = new Date().getTime();
            let  prevDay = [];
            let currDay = [];
            
            rows.forEach((row) => {
                if(new Date(row.timestamp).getTime() <= currentTime-offset && new Date(row.timestamp).getTime() >= currentTime-offset2)
                    prevDay.push(row);
                if(new Date(row.timestamp).getTime() <= currentTime && new Date(row.timestamp).getTime() >= currentTime-offset1)
                    currDay.push(row);
                
            });
            res.send({status: true, data: prevDay.length - currDay.length})
        });
    }

    static getDailyIncrease(eventType,res){
        const offset1 = 24*60*60*1000;
        const offset2 = 24*60*60*1000*2;
        Events.getIncreaseBase(eventType,offset1,offset2,res);
    }

    static getWeeklyIncrease(eventType,res){
        const offset1 = 24*60*60*1000*7;
        const offset2 = 24*60*60*1000*2*7;
        Events.getIncreaseBase(eventType,offset1,offset2,res);
    }

    create(res){
        const aEvent = this;
        db.run(`INSERT INTO EVENTS(type,timestamp,video_id) VALUES(?,?,?)`, [Events.eventTypeEnum[this.type], this.timestamp, this.video_id], function (err) {
            if (err) {
                console.log(err.message);
                res.send({status: false, data: null});
                return false;
            }
            console.log(`A row has been inserted`);
            res.send({status: true, data: aEvent});
            return true;
        });
        
    }

    static fetchAll(res){
        let stmt = `SELECT * from EVENTS`;

        db.all(stmt, [], (err, rows) => {
            if (err) {
                res.send({status: false, data: 0})
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
            res.send({status: true, data: rows});
            return rows;
        });
    }

    static fetchById(id){
        let stmt = `SELECT * from EVENTS where id = ${id}`;

        db.all(stmt, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row.name);
            });
            return rows;
        });
    }
}

module.exports = Events;