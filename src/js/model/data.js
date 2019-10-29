import axios from "axios";
import { key, proxy } from "../config";

export default class data {
	async getData() {
		try {
			const data = axios(`${proxy}https://api.themoviedb.org/3/movie/550?api_key=${key}`);

			return data;
		} catch (e) {
			console.log(typeof e);
		}
	}
}
