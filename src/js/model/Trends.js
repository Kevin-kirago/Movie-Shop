import axios from "axios";
import { key, proxy } from "../config";

export default class Result {
	async getTrendingMovies() {
		try {
			const data = await axios(`${proxy}https://api.themoviedb.org/3/trending/movies/day?api_key=${key}`);
			this.trendingMovies = data.data.results;
		} catch (e) {
			console.log(typeof e);
		}
	}
}
