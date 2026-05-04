const form = document.getElementById('blog-form');
  const container = document.getElementById('blog-container');

  // Load posts from localStorage
  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    container.innerHTML = '';

    posts.forEach(post => {
      renderPost(post);
    });
  }

  //Submit new artist form
  function renderPost(postData) {
    const post = document.createElement('div');
    post.classList.add('blog-post');

    post.innerHTML = `
      <h2>${postData.title}</h2>
      <img src="${postData.image}" alt="Blog Image">
      <p>${postData.content}</p>
    `;

    container.prepend(post);
  }

  // Save post to local storage
  function savePost(postData) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(postData);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const postData = {
      title: document.getElementById('title').value,
      image: document.getElementById('image').value,
      content: document.getElementById('content').value
    };

    savePost(postData);
    renderPost(postData);

    form.reset();
  });

  // Load posts when page opens
  loadPosts();
