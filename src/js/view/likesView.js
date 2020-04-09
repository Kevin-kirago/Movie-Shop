import { elements } from "./base";

// Toggle likes panel
export const toggleLikeBtn = (isLiked, id) => {
	const iconStr = isLiked ? "ion-ios-heart" : "ion-ios-heart-outline";

	document.querySelectorAll(".card__content-likeIcon i").forEach(el => {
		if (el.parentElement.parentElement.parentElement.id === id) {
			el.className = iconStr;
		}
	});
};

export const toggleLikeMenu = numLike => {
	elements.likesPanel.style.visibility = numLike > 0 ? "visible" : "hidden";
};

export const addLikeToUI = (id, poster, title, genre) => {
	const html = `
	<li class="likes__item" id="${id}">
		<figure class="likes__fig">
			<img src="https://image.tmdb.org/t/p/w500/${poster}" alt="${title}" />
		</figure>
		<div class="likes__data">
			<h4 class="likes__name">
				${title}
			</h4>
			<p class="likes__author">
				${genre}
			</p>
		</div>
	</li>`;

	elements.likesList.insertAdjacentHTML("beforeend", html);
};

export const removeLikeFromUI = id => {
	if (elements.likesList.childNodes) {
		elements.likesList.childNodes.forEach(el => {
			if (el.id === id) {
				el.remove();
			}
		});
	}
};
