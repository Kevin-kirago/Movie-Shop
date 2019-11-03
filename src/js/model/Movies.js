import axios from "axios";
import { key, proxy } from "../config";

export default class Movie {
	constructor(id) {
		this.id = id;
	}

	async getMovie() {
		try {
			const res = await axios(`${proxy}https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}&language=en-US`);
			this.result = res.data;
		} catch (E) {
			console.log(E);
		}
	}
}
