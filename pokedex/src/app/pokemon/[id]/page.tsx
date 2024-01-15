import {pokemon} from "@/app/page";

const PokemonDetail = async ({params}: {params: {id: string}}) => {
	const pokemonId = params.id;
	console.log(pokemonId);

	const pokemonData = async () => {
		try {
			const response = await fetch("http://localhost:3001/pokemon", {
				cache: "no-cache",
			});
			if (!response.ok) {
				throw new Error("Failed fetching all Pokemons");
			}
			const responseJSON: pokemon[] = await response.json();
			console.log(responseJSON);

			const singlePokemonData = responseJSON.find((el) => {
				console.log(el.id, pokemonId);

				return el.id == Number(pokemonId);
			}) as pokemon;

			if (!singlePokemonData) {
				throw new Error("Pokemon Not Found");
			}
			console.log(singlePokemonData);
			return singlePokemonData;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log(error);
			}
		}
	};

	const findPokemonData = await pokemonData();

	return (
		<main className="flex flex-col gap-5 m-5 h-[100dvh] shadow-2xl">
			<h1 className="text-4xl m-5">Detail Pokemon</h1>
			<div className="flex gap-8">
				<img src={findPokemonData?.image} className="object-cover h-3/5"></img>
				<div className="flex flex-col m-5">
					<div className="flex justify-between">
						<div>
							<p>Pokemon Name</p>
							<p className="text-black pl-3 whitespace-pre-wrap text-2xl">
								{findPokemonData?.name}
							</p>
						</div>
						<div>
							<p>Pokemon Weight</p>
							<p className="text-black pl-3 whitespace-pre-wrap text-2xl">
								{findPokemonData?.weight}
							</p>
						</div>
						<div>
							<p>Pokemon Type</p>
							{findPokemonData?.type == "grass" && (
								<p className="text-black whitespace-pre-wrap p-2 bg-green-200 mr-3 rounded-xl">
									Grass
								</p>
							)}
							{findPokemonData?.type == "water" && (
								<p className="text-black whitespace-pre-wrap p-2 bg-blue-200 mr-3 rounded-xl">
									Water
								</p>
							)}
							{findPokemonData?.type == "fire" && (
								<p className="text-black whitespace-pre-wrap p-2 bg-red-200 mr-3 rounded-xl">
									Fire
								</p>
							)}
						</div>
					</div>
					<div className="pt-5 flex flex-col gap-5">
						<p>Pokemon Description</p>
						<p className="text-black pl-3 whitespace-pre-wrap">
							{findPokemonData?.description}
						</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PokemonDetail;
