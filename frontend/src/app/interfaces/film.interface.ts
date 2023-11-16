export interface Film {
    id_film?: number;
    title: string;
    description: string;
    director: string;
    year: number;
    image: string;
    duration: number;
    score: number;
    id_category: number | string;
    id_torrent: number | string;
}