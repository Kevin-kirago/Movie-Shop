import { elements } from "./base";

// Dispay the popup
export const togglePopup = () => {
	elements.popupContainer.classList.toggle("show__popup");
};

// render popup result
const renderResult = result => {
	const markup = `
    <div class="popup__content-col">
        <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="poster-image" class="popup__content-img">
    </div>
    <div class="popup__content-col">
        <div class="popup__content-description">
            <h1 class="popup__content-title"><span>Title:</span>&nbsp;${result.title}</h1>
            <h2>Overview</h2>
            <p class="popup__content-story">
                ${result.overview}
            </p>
            <div class="popup__content-ratings">
                <span>Vote Count: ${result.vote_count}</span>
                <span>Vote Average: ${result.vote_average}</span>
                <span>Release Date: ${result.release_date}</span>
            </div>
        </div>
    </div>`;

	elements.popupContentContainer.innerHTML = markup;
};

// Populate the popup
export const renderPopupContent = obj => {
	if (obj !== undefined) {
		renderResult(obj);
	}
};
