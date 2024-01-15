import {useRouter} from "next/navigation";
import {pokemon} from "../page";
import React from "react";

type props = {
	data: pokemon;
	refetch: Function;
};

const PokemonCard = ({data, refetch}: props) => {
	const router = useRouter();
	const handleDelete = async (id: number) => {
		const response = await fetch(`http://localhost:3001/pokemon/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			await refetch();
			router.refresh();
		}
	};
	return (
		<main className=" w-[25rem] bg-slate-100 rounded-2xl shadow-2xl px-4">
			<img src={data.image} className="w-full object-cover h-80"></img>
			<div className="flex justify-between">
				<p className="text-black pl-3 whitespace-pre-wrap text-2xl">
					{data.name}
				</p>
				{data?.type == "grass" && (
					<p className="text-black whitespace-pre-wrap p-2 bg-green-200 mr-3 rounded-xl">
						Grass
					</p>
				)}
				{data?.type == "water" && (
					<p className="text-black whitespace-pre-wrap p-2 bg-blue-200 mr-3 rounded-xl">
						Water
					</p>
				)}
				{data?.type == "fire" && (
					<p className="text-black whitespace-pre-wrap p-2 bg-red-200 mr-3 rounded-xl">
						Fire
					</p>
				)}
			</div>
			<br />
			<p className="text-black pl-3 whitespace-pre-wrap">{data.description}</p>
			<br />
			<div className="flex justify-around mb-2">
				<button
					className="text-blue-500 bg-blue-200 p-2 rounded-xl"
					onClick={() => {
						router.push(`/pokemon/${data.id}`);
					}}
				>
					See Detail
				</button>
				<button
					className="text-red-900 bg-red-300 p-2 rounded-xl"
					onClick={() => handleDelete(data.id)}
				>
					Delete
				</button>
			</div>
		</main>
	);
};

export default PokemonCard;
