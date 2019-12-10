import { element } from "./base";

// Toggle likes panel
export const toggleLikeBtn = isLiked => {
	const iconStr = isLiked ? "ion-ios-heart" : "ion-ios-heart-outline";
	document.querySelectorAll.forEach(element => {
		element(".card__content-likeIcon i").className = iconStr;
	});
};
