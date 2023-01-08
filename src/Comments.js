import React, { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";

function Comments(props) {
const [commentInput, setCommentInput] = useState("");
const handleSubmit = event => {
    event.preventDefault();
    fetch(`http://localhost:3000/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        missionId: props.missionId,
        comment: commentInput
      })
    })
      .then(res => res.json())
      .then(result => {
        props.setComments([...props.comments, result]);
        setCommentInput("");
      });
  };
  

return (
<div>
<h3>Comments</h3>
{props.comments.map(comment => (
<div key={comment.id}>
    <p>{comment.comment}</p>
</div>
))}
<form onSubmit={handleSubmit}>
<label>
<input
type="text"
value={commentInput} placeholder={'Add Comment'} style={{paddingLeft: '20px', fontSize:'17px'}}
onChange={event => setCommentInput(event.target.value)}
/>
</label>
<button type="submit">Add comment</button>
</form>
</div>
);
}

export default Comments;