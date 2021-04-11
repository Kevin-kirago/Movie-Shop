import axios from "axios";
import { key, proxy } from "../config";

export default class Likes {
	constructor() {
		this.Likes = [];
	}

	async getMovie(id) {
		try {
			const res = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
			this.result = res.data;
		} catch (E) {
			console.log(E);
		}
	}

	isLiked(id) {
		return this.Likes.findIndex((el) => el.id === id) !== -1;
	}

	addLike(id, title, genres, image_url) {
		const like = { id, title, genres, image_url };
		this.Likes.push(like);

		return like;
	}

	removeLike(id) {
		const index = this.Likes.findIndex((el) => el.id === id);
		this.Likes.splice(index, 1);
	}

	getNumLikes() {
		return this.Likes.length;
	}
}
