
var Room = require('../models/roomModel');

let index = (req, res) => {
    Room.find((err, results) => {
        if(err) {
            res.json({
                status: "error",
                message: err
            });
        } 
        res.json({
            status: "success",
            message: "List room", 
            data: results
        });
    })
}
let create = (req, res) => {
    var room = new Room();
    room.name = req.body.name;
    room.code = req.body.code;
    // room.room_type.name = req.body.type_name;
    room.room_type.adult = req.body.type_adult;
    room.room_type.children = req.body.type_children;
    room.room_type.extra_bed = req.body.extra_bed;
    room.total = req.body.total;
    room.is_book = req.body.is_book;

    room.insertOne(room, (err, result) => {
        if(err) {
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: "success",
                message: "Insert successfully"
            });
        }
    });
}
let update = (req, res) => {
    var room = new Room();
    let id = req.body._id;

    room.name = req.body.name;
    room.code = req.body.code;
    // room.room_type.name = req.body.type_name;
    room.room_type.adult = req.body.type_adult;
    room.room_type.children = req.body.type_children;
    room.total = req.body.total;
    room.is_book = req.body.is_book;

    room.findOneAndUpdate(
        { _id: id },
        room,
        { 
            sort: { _id: -1 },
            upsert: true
        }, 
        (err, result) => {
            if(err) {
                if(err.name == 'ValidationError') {
                    res.json({
                        status: 'error',
                        message: 'Please input fields required',

                    })
                } else {
                    res.json({
                        status: 'error',
                        message: err
                    })
                }
            } else {
                res.json({
                    status: "success",
                    message: "Update successfully",
                    data: result
                });
            }
        }

    );
}
let deleteRoom = (req, res) => {
    var room = Room();
    var code = req.params.code;
    room.findOneAndDelete(code, (err, result) => {
        if(err) {
            res.json({
                status: 'error',
                message: 'Failed to Delete Room: ' + err
            });
        } else {
            res.json({
                status: 'success',
                message: 'Room Deleted'
            })
        }
    });
}