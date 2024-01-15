"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";

const CreatePokemon = () => {
	const [input, setInput] = useState({
		name: "",
		description: "",
		weight: "",
		image: "",
		type: "grass",
	});

	const [error, setError] = useState("");

	const PokemonInput = z.object({
		name: z
			.string({
				invalid_type_error: "Pokemon Name is Required",
				required_error: "Pokemon Name is Required",
			})
			.min(1, {message: "Pokemon Name is Required"}),
		description: z
			.string({
				invalid_type_error: "Description is Required",
				required_error: "Description is Required",
			})
			.min(1, {message: "Description is Required"}),
		weight: z
			.string({
				invalid_type_error: "Weight is Required",
				required_error: "Weight is Required",
			})
			.min(1, {message: "Weight is Required"}),
		image: z
			.string({
				invalid_type_error: "Image is Required",
				required_error: "Image is Required",
			})
			.min(1, {message: "Image is Required"}),
		type: z
			.string({
				invalid_type_error: "Type is Required",
				required_error: "Type is Required",
			})
			.min(1, {message: "Type is Required"}),
	});
	const router = useRouter();
	const handleSubmit = async (e: React.SyntheticEvent) => {
		try {
			e.preventDefault();

			const parsed = PokemonInput.safeParse(input);
			console.log(parsed);

			if (parsed.success == false) {
				setError(parsed.error.issues[0].message);
			} else {
				const finalInput = JSON.stringify(input);
				console.log(finalInput);
				const response = await fetch("http://localhost:3001/pokemon", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: finalInput,
				});

				if (!response.ok) {
					throw new Error("Add Pokemon Failed");
				}
				router.push("/");
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log(error.issues);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<main className="flex flex-col min-h-[100dvh] items-center">
			<h1 className="p-5 text-5xl">Add a new Pokemon</h1>
			{error && (
				<h1 className="p-3 text-2xl bg-red-500 text-white rounded-xl">
					{error}
				</h1>
			)}
			<form className="flex flex-col gap-5 mt-5 px-5" onSubmit={handleSubmit}>
				<label className="text-2xl" htmlFor="name">
					Name
				</label>
				<input
					className="w-[30rem] rounded-lg shadow-xl p-3"
					type="text"
					name="name"
					id="name"
					onChange={(e) => setInput({...input, name: e.target.value})}
				/>

				<label className="text-2xl" htmlFor="description">
					Description
				</label>
				<textarea
					className="w-[30rem] rounded-lg shadow-xl p-3"
					onChange={(e) => setInput({...input, description: e.target.value})}
				></textarea>

				<label className="text-2xl" htmlFor="weight">
					Weight
				</label>
				<input
					className="w-[30rem] rounded-lg shadow-xl p-3"
					type="text"
					name="weight"
					id="weight"
					onChange={(e) => setInput({...input, weight: e.target.value})}
				/>

				<label className="text-2xl" htmlFor="image">
					Image
				</label>
				<input
					className="w-[30rem] rounded-lg shadow-xl p-3"
					type="text"
					name="image"
					id="image"
					onChange={(e) => setInput({...input, image: e.target.value})}
				/>

				<label className="text-2xl" htmlFor="type">
					Type
				</label>

				<select
					name="type"
					id="type"
					className="w-[30rem] rounded-lg shadow-xl h-14 p-3"
					onChange={(e) => setInput({...input, type: e.target.value})}
				>
					<option disabled>Choose One</option>
					<option value="grass">Grass</option>
					<option value="water">Water</option>
					<option value="fire">Fire</option>
				</select>
				<button
					type="submit"
					className="w-[6rem] bg-yellow-500 p-3 rounded-xl shadow-lg"
				>
					Submit
				</button>
				<br />
				<br />
				<br />
			</form>
		</main>
	);
};

export default CreatePokemon;
