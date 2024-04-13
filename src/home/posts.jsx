import React from 'react';
import './home.css';
import { PostNotifier } from './postNotifier';

export function Posts(props) {
  const discussion = props.discussion;
  const discussionId = 'postContainer';

  const [posts, updatePosts] = React.useState([]);
  const [users, updateUsers] = React.useState({});

  React.useEffect(() => {
    fetch(`/api/posts/${discussion}`)
      .then((response) => response.json())
      .then((posts) => {
        updatePosts(posts);
        localStorage.setItem('posts', JSON.stringify(posts));
        // Fetch user data for each post
      })
      .catch(() => {
        const postsLocalStorage = localStorage.getItem('posts');
        if (postsLocalStorage) {
          updatePosts(JSON.parse(postsLocalStorage));
        }
      });
  }, [discussion]);

  React.useEffect(() => {
    fetch(`/api/accounts`)
      .then((response) => response.json())
      .then((accounts) => {
        updateUsers(accounts);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        // Fetch user data for each post
      })
      .catch(() => {
        const accountsLocalStorage = localStorage.getItem('accounts');
        if (accountsLocalStorage) {
          updateUsers(JSON.parse(accountsLocalStorage));
        }
      });
  }, [discussion]);

  React.useEffect(() => {
    PostNotifier.addHandler(handleGameEvent);

    return () => {
      PostNotifier.removeHandler(handleGameEvent);
    };
  });

  function handleGameEvent(event) {
    const newPost = {
        date: event.date,
        username: event.username,
        text: event.text
      };

    updatePosts([...posts, newPost]);
  }

  return (
    <div className={discussionId}>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <div className="post-main">
            <h6 className="date">{post['date']}</h6>
            <div className="comment-header">
              <div className="mini-profile">
                <img className="img_profile_pic" src="static/profile-pic.png" style={{ width: "50px" }} />
              </div>
              <div className="name-info">
                <h3 className="name">{users[post['username']]?.firstName + ' ' + users[post['username']]?.lastName}</h3>
                <h5 className="service-start">Service Starts {new Date(users[post['username']]?.startDate).toDateString()}</h5>
              </div>
            </div>
            <p className="comment-text">{post['text']}</p>
            <div className="comments-header">
              <h6 className="comment-label">Comments</h6>
              <div className="add-comment">
                <img className="add-comment-img" src="static/add-comment.svg" style={{ width: "15px" }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// onClick="makePost({discussion}, {textAreaId})"

// async function getPosts(discussion) {
//     //discussion name to id dictionary
//     let pAll = [];
//     console.log('1');
//     const response = await fetch(`/api/posts/${discussion}`);
//     let posts = await response.json();
//     console.log('2')

//     for (let i = 0; i < posts.length; i++) {
//         try {
//             let _post = posts[i];
//             let res = await fetch(`/api/account/${_post['username']}`);
//             let _account = await res.json();
            
//             let _p = {
//             'name': _account['firstName'] + ' ' + _account['lastName'],
//             'serviceDate': missionary_type(_account['startDate'], _account['endDate']),
//             'date': _post['date'],
//             'text': _post['text']
//             }
        
//             pAll.push(_p)
//         } catch {} 
//         //await buildPost(`${discussion}`, _account['prefix'], _account['firstName'], _account['lastName'], _account['startDate'], _account['endDate'], _post['date'], _post['text']);
//     }
//     console.log('3')
//     updatePosts(pAll);
//     return pAll;
// }

// async function missionary_type(start_date, end_date) {
//     let today = new Date();
//     start_date = new Date(start_date);
//     end_date = new Date(end_date);

//     if (end_date < today) {
//         return "Service ended " + end_date.toDateString();
//     }
//     else if (start_date < today) {
//         return "Serving since " + start_date.toDateString();
//     }
//     else if (today < start_date) {
//         return "Service starts " + start_date.toDateString();
//     }
// }

// getPosts(discussion)

// React.useEffect(() => {
//     let combinedPosts = []
//     fetch(`/api/posts/${discussion}`)
//       .then((response) => response.json())
//       .then((posts) => {
//         for (let i = 0; i < posts.length; i++) {
//             let j = posts[i]
//             fetch(`/api/account/${j['username']}`)
//             .then((res) => res.json())
//             .then((account) => {
//                 let c = {
//                     ...j,
//                     ...account
//                 }
//                 combinedPosts.push(c)
//             })
//         }
        
//         updatePosts(combinedPosts);
//         localStorage.setItem('posts', JSON.stringify(combinedPosts));
//       })
//       .catch(() => {
//         const postsLocalStorage = localStorage.getItem('posts');
//         if (postsLocalStorage) {
//           updatePosts(JSON.parse(postsLocalStorage));
//         }
//       });
//   }, []);