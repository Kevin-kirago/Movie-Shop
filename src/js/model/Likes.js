export default class Likes {
	constructor() {
		this.Likes = [];
	}

	addLike(id, title, image_url) {
		const like = { id, title, image_url };
		this.Likes.push(like);

		return like;
	}

	deleteLike(id) {
		const index = this.Likes.findIndex(el => el.id === id);
		this.Likes.splice(index, 1);
	}

	getNumLikes() {
		return this.Likes.length;
	}
}
