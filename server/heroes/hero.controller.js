const express = require('express'),
    path = require('path'),
    router = express.Router(),
    mongojs = require('mongojs'),    
    db = mongojs('mongodb://admin:admin@ds143539.mlab.com:43539/dbtest', ['todos']);



router.get('/', (req, res, next) => {
    db.todos.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
    // res.send('TODOS PAGE');
});

router.get('/todo', (req, res, next) => {
    console.log(' query all todo in the list ',req);
    db.todos.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
    // res.send('TODOS PAGE');
});

// get by id

router.get('/todo/:id', (req, res, next) => {
    console.log(' get  todo by id  in the list ',req);
    db.todos.findOne({ _id: mongojs.ObjectId(req.params.id) },
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });

});

// save
router.post('/todo', (req, res, next) => {
    console.log(' adding todo in the list ',req);
    var reqBody = req.body;
    if (!reqBody.subject) {
        res.status(400);
        res.json({
            "error": "no request body"
        })
    } else {
        db.todos.save(
            reqBody,
            (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(data);
                }
            });
    }

});

// delete
router.delete('/todo/:id', (req, res, next) => {
    console.log(' delete todo by id ',req);
    db.todos.remove({ _id: mongojs.ObjectId(req.params.id) },
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });
});

// edit
router.put('/todo', (req, res, next) => {
    console.log(' edit todo by id ',req.body);
    var reqBody = req.body;
    if (!reqBody._id) {
        res.status(400);
        res.json({
            "error": "no request body"
        })
        return;

    } 
    var newData = {
        subject: reqBody.subject,
        status: reqBody.status,
        createddate: reqBody.createddate,
        notes: reqBody.notes        
    };

    db.todos.update({ 
        _id: mongojs.ObjectId(reqBody._id) },
        newData,
        {},
        (err, data) => {
            console.log("PUT RESULT " + err, data);
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });
});
