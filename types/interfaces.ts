export interface Film {
	title: string
	episode_id: string
	opening_crawl: string
	director: string
	producer: string
	release_date: string
	characters: string[]
	planets: string[]
	starships: string[]
	vehicles: string[]
	species: string[]
	created: string
	edited: string
	url: string
}

export interface People {
	birth_year: string
	created: string
	edited: string
	eye_color: string
	films: string[]
	gender: string
	hair_color: string
	height: string
	homeworld: string
	mass: string
	name: string
	skin_color: string
	species: string[]
	starships: string[]
	url: string
	vehicles: string[]
}
