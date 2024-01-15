"use client";
import PokemonCard from "@/app/components/Card";
import {pokemon} from "@/app/page";
import {useState, useEffect} from "react";

const PokemonType = ({params}: {params: {type: string}}) => {
	const pokemonType: string = params.type;
	const [pokemons, setPokemons] = useState([] as pokemon[]);
	let error = false;

	if (
		pokemonType == "fire" ||
		pokemonType == "water" ||
		pokemonType == "grass"
	) {
		// setError(false);
		console.log("a");
	} else {
		error = true;
	}

	const fetchData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/pokemon?type=${pokemonType}`
			);
			if (!response.ok) {
				throw new Error("Failed Fetching Single Pokemon");
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
			{error ? (
				<main className="flex min-h-screen flex-col items-center justify-between p-24">
					<h1>No Pokemons with {pokemonType} type...</h1>
				</main>
			) : (
				<main className="flex min-h-screen flex-col items-center justify-between p-24">
					<div className="flex gap-10 flex-wrap">
						{pokemons &&
							pokemons.map((pokemon) => (
								<PokemonCard data={pokemon} refetch={fetchData} />
							))}
					</div>
				</main>
			)}
		</>
	);
};

export default PokemonType;
