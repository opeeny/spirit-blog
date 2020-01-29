const title = document.querySelector('#title');
const content = document.querySelector('#content');
const submitButton = document.querySelector('#send');
const typedContent = document.querySelector('#typedContent');
const postForm = document.querySelector('#postForm');
const deleteBlog = document.querySelector('#delete');
const posts = [];
let ourPost = {};
const typedTitle = document.createElement('h1');
const typedBlog = document.createElement('p');
const spirit = document.querySelector('.spirit');
const writeBlog = document.querySelector('#writeBlog');
const writeDiv = document.querySelector('.write');

writeDiv.style.display = 'none';
const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};

title.addEventListener('input', (e) => {
	let text = e.target.value;

	typedTitle.innerHTML = text;
	typedContent.appendChild(typedTitle);

	ourPost.title = text;
});

content.addEventListener('input', (e) => {
	let text = e.target.value;
	typedBlog.innerHTML = text;
	typedContent.appendChild(typedBlog);
	ourPost.body = text;
});

const renderStory = (blog, index) => {
	const storyDiv = document.createElement('div');
	storyDiv.classList.add('story');
	let date = new Date();
	storyDiv.innerHTML = `
		<h4 class="storyTitle">${blog.title}</h4>
		<p class="storyDate">${date.toLocaleDateString(undefined, options)}</p>
		<p class="storyContent">${blog.body}</p>
		<button class="storyDelete" id="${index}"><i class="fas fa-trash-alt"></i></button>`;
	return storyDiv
}

const allBlogs = (data) => {
	spirit.innerHTML = '';
	console.log(data);
	for (let [ index, blog ] of data.entries()) {
		if (Object.keys(blog).length !== 0 && (blog.title != '' && blog.body != '')) {
			let storyDiv = renderStory(blog,index)
			spirit.appendChild(storyDiv);
			const storyDelButton = storyDiv.querySelector('.storyDelete');
			storyDelButton.addEventListener('click', () => {
				let buttonId = Number(storyDelButton.getAttribute('id'));
				posts.splice(buttonId, 1);
				console.log(data);
				localStorage.setItem('Post', JSON.stringify(posts));
				allBlogs(posts);
			});
		} else {
			console.log('something');
		}
	}
};

postForm.addEventListener('submit', (e) => {
	// Adds a particular blog to the blog array
	e.preventDefault();

	title.classList.remove('title');
	content.classList.remove('title');
	if (title.value != '' && content.value != '') {
		posts.unshift(ourPost);
		ourPost = {};
		localStorage.setItem('Post', JSON.stringify(posts));
		const data = JSON.parse(localStorage.getItem('Post'));
		allBlogs(data);
		typedContent.innerHTML = '';
		title.value = '';
		content.value = '';
		writeDiv.style.display = 'none';
		spirit.style.display = 'block';
	} else {
		if (title.value === '') {
			title.classList.add('title');
		}
		if (content.value === '') {
			content.classList.add('title');
		}
		alert('Both fields are required');
	}
});

// deleteBlog.addEventListener('click', () => {
// 	console.log('I am deleting');
// 	localStorage.clear();
// 	while (typedContent.firstChild) {
// 		typedContent.removeChild(typedContent.firstChild);
// 	}
// 	while (blogs.firstChild) {
// 		blogs.removeChild(blogDisplay.firstChild);
// 	}
// });

writeBlog.addEventListener('click', () => {
	spirit.style.display = 'none';
	writeDiv.style.display = 'block';
});
