import axios from "axios";
import { key, proxy } from "../config";

export default class Result {
	async getTrendingMovies() {
		try {
			const data = await axios(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`);
			console.log(data);
			this.trendingMovies = data.data.results;
		} catch (e) {
			console.log(typeof e);
		}
	}
}
