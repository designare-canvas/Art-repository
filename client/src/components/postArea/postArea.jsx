import React, { useContext } from 'react';
import './postArea.scss';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import axios from 'axios';

function PostArea(props) {
  const { user, isAdmin } = useContext(AuthContext);
  let history = useHistory();

  const handleDelete = async () => {
    const result = await axios.delete('/api/posts/post/' + props.id, {
      data: { user: user, isAdmin: isAdmin },
    });
    console.log(result);
    if (result.data.success) {
      history.push('/');
    }
  };

  return (
    <div className="postArea">
      <div className="postHeader">
        <div className="leftItems">
          <div>
            <img src={props.imgUrl} className="profileImg" alt="posts" />
          </div>
          <div className="postBody">
            <h4>{props.postTitle}</h4>
            <div className="authorLinks">
              <Link to={`/Profile/${props.authorName}`}>
                <p>{props.authorName}</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {(user && user.username === props.authorName) || isAdmin ? (
            <>
              <Link
                to={{
                  pathname: '/upload',
                  state: props,
                }}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: '#000',
                    backgroundColor: '#f3f3f4',
                    border: 'none',
                    marginRight: '20px',
                    zIndex: '0',
                  }}
                  size="small"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="contained"
                style={{
                  color: '#000',
                  backgroundColor: '#f3f3f4',
                  border: 'none',
                  marginRight: '20px',
                  zIndex: '0',
                }}
                size="small"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          ) : (
            <></>
          )}

          <Button
            variant="contained"
            style={{
              color: '#000',
              backgroundColor: '#f3f3f4',
              border: 'none',
              zIndex: '0',
            }}
            size="small"
            startIcon={<FavoriteIcon />}
            disabled={isAdmin}
          >
            Like
          </Button>
        </div>
      </div>
      <div className="postImg">
        <img src={props.postImgUrl} alt="posts" style={{ width: '63.8vw', borderRadius: '10px' }} />
      </div>
      <div className="postDescription">{props.postDescription}</div>
    </div>
  );
}

export default PostArea;
