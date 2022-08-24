const router = require('express').Router();
const pgConnection = require('../database/dbConnect');
const util = require('util');

const query = util.promisify(pgConnection.query).bind(pgConnection);

router.post('/art', (req, res) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    pgConnection.query(
        'INSERT INTO arts (timestamp,title,description,username,isPublished) VALUES ($1,$2,$3,$4,$5) RETURNING id',
        [
            now,
            req.body.Title,
            req.body.Description,
            req.body.user.username,
            req.body.isPublished,
        ],
        async (err, result) => {
            if (err) {
                const { sqlMessage, ...other } = err;
                return res.json({ success: false, message: sqlMessage });
            } else {
                const rows1 = await query(
                    'INSERT INTO artImages (timestamp,imageUrl,postId) VALUES ($1,$2,$3)',
                    [now, req.body.Image, result.rows[0].id]
                ).catch((Err) => {
                    const { sqlMessage, ...other } = Err;
                    return res.json({ success: false, message: sqlMessage });
                });
                const Res2 = req.body.Tags.map(async (tag) => {
                    const rows2 = await query(
                        'INSERT INTO tags(postId,tagName) VALUES ($1,$2)',
                        [result.rows[0].id, tag]
                    ).catch((Err) => {
                        const { sqlMessage, ...other } = Err;
                        return res.json({
                            success: false,
                            message: sqlMessage,
                        });
                    });
                });
                if (rows1 && Res2) {
                    return res.json({
                        success: true,
                        message: 'Post created successfully!',
                    });
                }
            }
        }
    );
});

router.post('/like', async (req, res) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        const result = await query(
            'INSERT INTO likes (timestamp,username,postId) VALUES ($1,$2,$3)',
            [now, req.body.username, req.body.postId]
        );
        return res.json({ success: true, message: 'Post liked successfully!' });
    } catch (Err) {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    }
});

router.post('/comment', async (req, res) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result = await query(
        'INSERT INTO comments (timestamp,username,commentData,postId) VALUES ($1,$2,$3,$4)',
        [now, req.body.user.username, req.body.comment, req.body.postId]
    ).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });
    res.json({ success: true, message: 'Comment added successfully!' });
});

router.get('/all', async (req, res) => {
    const result = [];

    // if(req.session.user){
    //   const res1 = await query("SELECT * FROM arts WHERE isPUblished=1 AND username<>?",[req.session.user.username]).catch((err) => {
    //     const { sqlMessage, ...other } = Err;
    //     res.json({ success: false, message: sqlMessage });
    //   });
    // }else{
    //   const res1 = await query("SELECT * FROM arts WHERE isPUblished=1").catch((err) => {
    //     const { sqlMessage, ...other } = Err;
    //     res.json({ success: false, message: sqlMessage });
    //   });
    // }
    const res1 = await pgConnection
        .query('SELECT * FROM arts WHERE isPUblished=TRUE')
        .catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });

    await Promise.all(
        res1.rows.map(async (rowData) => {
            const res2 = await query(
                'SELECT * FROM artImages WHERE postId = $1',
                [rowData.id]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });
            const res3 = await query(
                'SELECT COUNT(*) FROM likes WHERE postId = $1',
                [rowData.id]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });
            const res4 = await query(
                'SELECT profileImgUrl FROM users WHERE username = $1',
                [rowData.username]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });

            result.push({
                art: rowData,
                image: res2.rows[0],
                likes: parseInt(res3.rows[0].count),
                artistImg: res4.rows[0],
            });
        })
    );

    return res.json({ success: true, data: result });
});

router.get('/post/:id', async (req, res) => {
    const id = Number(req.params.id);

    const res1 = await query('SELECT * FROM arts WHERE id = $1', [id]).catch(
        (Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        }
    );
    const res2 = await query('SELECT COUNT(*) FROM likes WHERE postId = $1', [
        id,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    const res3 = await query('SELECT * FROM comments WHERE postId = $1', [
        id,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    const res4 = await query('SELECT * FROM artImages WHERE postId = $1', [
        id,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });
    const res5 = await query(
        'SELECT profileImgUrl FROM users WHERE username = $1',
        [res1.rows[0].username]
    ).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });
    const comments = [];

    await Promise.all(
        res3.rows.map(async (rowData) => {
            const res6 = await query(
                'SELECT profileImgUrl FROM users WHERE username = $1',
                [rowData.username]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });
            comments.push({ commentData: rowData, commenterImg: res6.rows[0] });
        })
    );
    const result = {
        art: res1.rows[0],
        likes: parseInt(res2.rows[0].count),
        comments: comments,
        image: res4.rows[0],
        artistImg: res5.rows[0],
    };

    return res.json({ success: true, data: result });
});

router.get('/liked/:username', async (req, res) => {
    const username = req.params.username;
    const result = await query('SELECT postId FROM likes where username = $1', [
        username,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    let newres = result.rows.map((e) => e.postid);
    newres = [...new Set(newres)];

    const newResult = [];
    await Promise.all(
        newres.map(async (rowData) => {
            const res1 = await query('SELECT * FROM arts WHERE id =$1', [
                rowData,
            ]).catch((err) => {
                const { sqlMessage, ...other } = Err;
                res.json({ success: false, message: sqlMessage });
            });
            if (res1.rows.length) {
                const res2 = await query(
                    'SELECT * FROM artImages WHERE postId = $1',
                    [rowData]
                ).catch((err) => {
                    const { sqlMessage, ...other } = Err;
                    res.json({ success: false, message: sqlMessage });
                });
                const res3 = await query(
                    'SELECT COUNT(*) FROM likes WHERE postId = $1',
                    [rowData]
                ).catch((Err) => {
                    const { sqlMessage, ...other } = Err;
                    return res.json({ success: false, message: sqlMessage });
                });
                newResult.push({
                    art: res1.rows[0],
                    likes: parseInt(res3.rows[0].count),
                    image: res2.rows[0],
                });
            }
        })
    );

    res.json({ success: true, data: newResult });
});

router.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const isPublished = username === req.query.username;

    const res1 = await query(
        'SELECT * FROM arts WHERE username = $1 AND isPublished = TRUE',
        [username]
    ).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });
    const result = [];

    await Promise.all(
        res1.rows.map(async (rowData) => {
            const res2 = await query(
                'SELECT * FROM artImages WHERE postId = $1',
                [rowData.id]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });
            const res3 = await query(
                'SELECT COUNT(*) FROM likes WHERE postId = $1',
                [rowData.id]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });
            result.push({
                art: rowData,
                image: res2.rows[0],
                likes: parseInt(res3.rows[0].count),
            });
        })
    );
    if (isPublished) {
        const res1_2 = await query(
            'SELECT * FROM arts WHERE username = $1 AND isPublished = FALSE',
            [username]
        ).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });
        await Promise.all(
            res1_2.rows.map(async (rowData) => {
                const res2_2 = await query(
                    'SELECT * FROM artImages WHERE postId = $1',
                    [rowData.id]
                ).catch((Err) => {
                    const { sqlMessage, ...other } = Err;
                    return res.json({ success: false, message: sqlMessage });
                });
                const res3_2 = await query(
                    'SELECT COUNT(*) FROM likes WHERE postId = $1',
                    [rowData.id]
                ).catch((Err) => {
                    const { sqlMessage, ...other } = Err;
                    return res.json({ success: false, message: sqlMessage });
                });

                result.push({
                    art: rowData,
                    image: res2_2.rows[0],
                    likes: parseInt(res3_2.rows[0].count),
                });
            })
        );
    }

    return res.json({ success: true, data: result });
});

router.delete('/like', async (req, res) => {
    const result = await query(
        'DELETE FROM likes WHERE postId  = $1 AND username = $2',
        [req.body.id, req.body.username]
    ).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });
    return res.json({ success: true, message: 'like deleted successfully' });
});

router.delete('/post/:id', async (req, res) => {
    const post = await query('SELECT * FROM arts WHERE id = $1', [
        req.params.id,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    if (req.body.user.username === post.rows[0].username || req.body.isAdmin) {
        const res1 = await query('DELETE FROM arts WHERE id = $1', [
            req.params.id,
        ]).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });

        return res.json({
            success: true,
            message: 'Post deleted successfully',
        });
    } else {
        return res.json({
            success: false,
            message: 'You can delete only your post!',
        });
    }
});

router.put('/post/:id', async (req, res) => {
    const art = await query('SELECT * FROM arts WHERE id = $1', [
        req.params.id,
    ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
    });

    if (art.rows[0].username === req.body.user.username || req.body.isAdmin) {
        const res1 = await query(
            'UPDATE arts SET isPublished = $1, title = $2, description = $3 WHERE id = $4',
            [
                req.body.isPublished,
                req.body.Title,
                req.body.Description,
                req.params.id,
            ]
        ).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });

        const delTags = await query('DELETE FROM tags WHERE postId = $1', [
            req.params.id,
        ]).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
        });

        const res2 = req.body.Tags.map(async (tag) => {
            const rows = await query(
                'INSERT INTO tags(postId,tagName) VALUES ($1,$2)',
                [req.params.id, tag]
            ).catch((Err) => {
                const { sqlMessage, ...other } = Err;
                return res.json({ success: false, message: sqlMessage });
            });
        });
        return res.json({
            success: true,
            message: 'Post updated successfully',
        });
    } else {
        return res.json({
            success: false,
            message: 'You can update only your Post!',
        });
    }
});

module.exports = router;
