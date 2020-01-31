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
const write = document.querySelector('.write');

write.style.display = 'none';
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
	const allPostsDiv = document.createElement('div');
	allPostsDiv.classList.add('story');
	let date = new Date();
	allPostsDiv.innerHTML = `
		<h4 class="storyTitle">${blog.title}</h4>
		<p class="storyDate">${date.toLocaleDateString(undefined, options)}</p>
		<p class="storyContent">${blog.body}</p>
		<button class="storyDelete" id="${index}"><i class="fas fa-trash-alt"></i></button>
		<button class="storyEdit" id="${index}"><i class="fas fa-pen"></i></i></button>`;
	return allPostsDiv
}

const allBlogs = (data) => {
	spirit.innerHTML = 'nnnnn';
	console.log(data);
	for (let [ index, blog ] of data.entries()) {
		if (Object.keys(blog).length !== 0 && (blog.title != '' && blog.body != '')) {
			let allPostsDiv = renderStory(blog,index)
			spirit.appendChild(allPostsDiv);
			const storyDelButton = allPostsDiv.querySelector('.storyDelete');
			const storyUpdateButton = allPostsDiv.querySelector('.storyEdit');
			storyDelButton.addEventListener('click', () => {
				let buttonId = Number(storyDelButton.getAttribute('id'));
			    posts.splice(buttonId, 1);
				console.log(data);
				localStorage.setItem('Post', JSON.stringify(posts));
				allBlogs(posts);
			});
			storyUpdateButton.addEventListener('click', () => {
				const yourPosts = JSON.parse(localStorage.getItem('Post'));
				//console.log('wee', yourPosts);
				if(yourPosts) {
					document.querySelector('#numberPosts').innerHTML = yourPosts.length;
					//console.log('wee', yourPosts);
					typedContent.innerHTML= 'aaaaaaaaaa';
					write.style.display = 'block';
					title.value = blog.title;
					content.value = blog.body;
					console.log(title.value, 'in btn', content.value);
				}
				

			});
		} else {
			console.log('something');
		}
	}
};

postForm.addEventListener('submit', (e) => {
	//prevent default behaviour of the form
	e.preventDefault();

	//title.classList.remove('title');
	//content.classList.remove('title');
	if (title.value != '' && content.value != '') {
		posts.unshift(ourPost);
		ourPost = {};
		localStorage.setItem('Post', JSON.stringify(posts));
		const data = JSON.parse(localStorage.getItem('Post'));
		allBlogs(data);
		typedContent.innerHTML = '';
		title.value = '';
		content.value = '';
		write.style.display = 'none';
		spirit.style.display = 'block';
	} else {
		if (title.value === '') {
			title.classList.add('title');
		}
		if (content.value === '') {
			content.classList.add('title');
		}
		alert('PROVIDE BOTH BLOG TITLE AND BODY');
	}
});

writeBlog.addEventListener('click', () => {
	//spirit.style.display = 'none';
	write.style.display = '';
});
