export const elements = {
	resultsContainer: document.querySelector(".latest__movies"),
	searchInput: document.querySelector(".search__input"),
	searchForm: document.querySelector(".search"),
	resultsHeading: document.querySelector(".result__heading"),
	popupContainer: document.querySelector(".popup"),
	popupContentContainer: document.querySelector(".popup__content"),
	likesPanel: document.querySelector(".likes_panel"),
	likesList: document.querySelector(".likes__list"),
	loader: "loader"
};

// rendering our spinner
export const renderLoader = parent => {
	const loader = `
	<div class="${elements.loader}">
		<i class="ion-load-c"></i>
	</div>
	`;

	parent.insertAdjacentHTML("beforeend", loader);
};

// Clearing the spinner
export const clearLoader = () => {
	const loader = document.querySelector(`.${elements.loader}`);
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};

export const toggleLikesIcon = isLiked => {
	const iconStr = isLiked ? "ion-ios-heart" : "ion-ios-heart-outline";
	document.querySelector(".likes__field i").className = iconStr;
};
