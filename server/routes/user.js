const router = require('express').Router();
const pgConnection = require('../database/dbConnect');
const util = require('util');

const query = util.promisify(pgConnection.query).bind(pgConnection);

router.get('/:username', async (req, res) => {
    const result = await query('SELECT * FROM users WHERE username = $1', [
        req.params.username,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    res.json({ success: true, data: result.rows[0] });
});

router.get('/all', async (req, res) => {
    const result = await query('SELECT * FROM user').catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    res.json({ success: true, data: result.rows });
});

router.put('/:username', async (req, res) => {
    if (req.body.user.username === req.params.username || req.body.isAdmin) {
        const res1 = await query(
            'UPDATE users SET profileImgUrl = $1,coverImgUrl = $2,Fname = $3, Lname = $4, DOB = $5, country = $6 WHERE username = $7',
            [
                req.body.profileImgUrl,
                req.body.coverImgUrl,
                req.body.Fname,
                req.body.Lname,
                req.body.DOB,
                req.body.country,
                req.params.username,
            ]
        ).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });
    } else {
        return res.json({
            success: false,
            message: 'You can only Update your Account!',
        });
    }

    res.json({ success: true, message: 'Account updated successfuly!' });
});

router.delete('/:username', async (req, res) => {
    if (req.body.user.username === req.params.username || req.body.isAdmin) {
        const res1 = await query('DELETE FROM users WHERE username = $1', [
            req.params.username,
        ]).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });
    } else {
        return res.json({
            success: false,
            message: 'You can only Delete your Account!',
        });
    }
    res.json({ success: true, message: 'Account deleted successfully' });
});

module.exports = router;
