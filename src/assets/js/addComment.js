import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteButton = document.querySelectorAll(".jsDeleteBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (node) => {
  node.remove();
  decreaseNumber();
};

const sendCommentID = async (commentId, li) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    deleteComment(li);
  }
};

const handleDelete = (event) => {
  event.preventDefault();
  const li = event.target.parentNode;
  const commentId = li.querySelector(".jsCommentId").innerHTML;
  if (commentId === "1") {
    deleteComment(li);
  }
  sendCommentID(commentId, li);
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const spanId = document.createElement("span");
  const spanComment = document.createElement("span");
  const deleteBtn = document.createElement("button");
  spanId.innerHTML = "1";
  spanId.classList.add("jsCommentId");
  spanComment.innerHTML = comment;
  spanComment.classList.add("jsComment");
  deleteBtn.innerHTML = "❌";
  deleteBtn.classList.add("jsDeleteBtn");
  li.appendChild(spanId);
  li.appendChild(spanComment);
  li.appendChild(deleteBtn);
  commentList.prepend(li);
  deleteBtn.addEventListener("click", handleDelete);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  if (!addCommentForm.hasAttribute("disabled"))
    addCommentForm.addEventListener("submit", handleSubmit);
  if (deleteButton)
    deleteButton.forEach((del) => {
      del.addEventListener("click", handleDelete);
    });
}

if (addCommentForm) {
  init();
}
