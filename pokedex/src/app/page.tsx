"use client";

import {useEffect, useState} from "react";
import PokemonCard from "./components/Card";

export type pokemon = {
	id: number;
	name: string;
	type: string;
	description: string;
	weight: string;
	image: string;
};

export default function Home() {
	const [pokemons, setPokemons] = useState([] as pokemon[]);
	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3001/pokemon");
			if (!response.ok) {
				throw new Error("Failed fetching all Pokemons");
			}
			const responseJSON = await response.json();
			console.log(responseJSON);
			setPokemons(responseJSON);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div className="flex gap-10 flex-wrap">
					{pokemons &&
						pokemons.map((pokemon) => (
							<PokemonCard data={pokemon} refetch={fetchData} />
						))}
				</div>
			</main>
		</>
	);
}
