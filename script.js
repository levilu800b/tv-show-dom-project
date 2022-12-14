//You can edit ALL of the code here
// get all the elements that we need to work with from the DOM (Document Object Model)
// api: https://api.tvmaze.com/shows/82/episodes
// use bootstrap for styling: https://getbootstrap.com/docs/5.2/components/card/

const rootElem = document.getElementById('root'); // div that wraps all the epContainer divs
const eSearch = document.getElementById('eSearch'); // search input field
const totalDisplayingEpsP = document.getElementById('totalDisplayingEps');
const eSelect = document.getElementById('eDropdown');
const shSelect = document.getElementById('shDropdown');
const allShows = getAllShows();
console.log(allShows);

async function getEpisodes(showId) {
	console.log(showId);
	const response = await fetch(
		`https://api.tvmaze.com/shows/${showId}/episodes`,
	);
	const data = await response.json();
	return data;
}

function makePageForEpisodes(episodeList) {
	rootElem.innerHTML = '';
	episodeList.forEach((episode) => {
		const epContainer = document.createElement('div');
		epContainer.className = 'card';
		epContainer.style.width = '18rem';
		epContainer.style.margin = '10px';
		epContainer.style.display = 'inline-block';
		epContainer.style.verticalAlign = 'top';
		epContainer.style.textAlign = 'center';
		epContainer.style.padding = '10px';
		epContainer.style.border = '1px solid black';
		epContainer.style.borderRadius = '5px';
		epContainer.style.backgroundColor = 'lightgrey';
		rootElem.appendChild(epContainer);
		const epTitle = document.createElement('h5');
		epTitle.className = 'card-title';
		epTitle.innerText = `${episode.name} - S${episode.season
			.toString()
			.padStart(2, '0')}E${episode.number.toString().padStart(2, '0')}`;
		epContainer.appendChild(epTitle);
		const epImg = document.createElement('img');
		epImg.className = 'card-img-top';
		epImg.src = episode.image.medium;
		epContainer.appendChild(epImg);
		const epSummary = document.createElement('p');
		epSummary.className = 'card-text';
		epSummary.innerHTML = episode.summary;
		epContainer.appendChild(epSummary);
	});
	totalDisplayingEpsP.innerText = `Displaying ${episodeList.length} / ${allEpisodes.length} episodes`;
}

function makePageForShows(showList) {
	rootElem.innerHTML = '';
	showList.forEach((show) => {
		const shContainer = document.createElement('div');
		shContainer.className = 'card';
		shContainer.style.width = '18rem';
		shContainer.style.margin = '10px';
		shContainer.style.display = 'inline-block';
		shContainer.style.verticalAlign = 'top';
		shContainer.style.textAlign = 'center';
		shContainer.style.padding = '10px';
		shContainer.style.border = '1px solid black';
		shContainer.style.borderRadius = '5px';
		shContainer.style.backgroundColor = 'lightgrey';
		rootElem.appendChild(shContainer);
		const shTitle = document.createElement('h5');
		shTitle.className = 'card-title';
		shTitle.innerText = show.name;
		shContainer.appendChild(shTitle);
		const shImg = document.createElement('img');
		shImg.className = 'card-img-top';
		shImg.src = show.image?.medium;
		shContainer.appendChild(shImg);
		const shSummary = document.createElement('p');
		shSummary.className = 'card-text';
		shSummary.innerHTML = show.summary;
		shContainer.appendChild(shSummary);
		const shEpisodes = document.createElement('button');
		shEpisodes.className = 'btn btn-primary';
		shEpisodes.innerText = 'Episodes';
		shEpisodes.addEventListener('click', () => {
			getEpisodes(show.id).then((data) => {
				makePageForEpisodes(data);
			});
		});
		shContainer.appendChild(shEpisodes);
	});
	totalDisplayingEpsP.innerText = `Displaying ${showList.length} / ${allShows.length} shows`;
}

makePageForShows(allShows);

eSearch.addEventListener('keyup', (e) => {
	const searchString = e.target.value;
	const filteredShows = allShows.filter((show) => {
		return (
			show.name.toLowerCase().includes(searchString) ||
			show.summary.toLowerCase().includes(searchString)
		);
	});
	return makePageForShows(filteredShows);
});



// window.onload = setup;
