export interface ICrew {
	adult: boolean,
	backdrop_path: string,
	credit_id: string,
	department: string,
	genre_ids: Array<number>,
	id: number,
	job: string,
	media_type: string,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	release_date: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number
}