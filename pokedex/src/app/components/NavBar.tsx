"use client";

import Link from "next/link";

const NavBar = () => {
	return (
		<main className="flex justify-between bg-slate-50 items-center">
			<h1 className="text-black text-4xl ml-5">PokeDex</h1>
			<div className="flex gap-10 p-5 justify-center mr-5 ">
				<Link href="/" className="p-4 hover:bg-slate-300 text-black rounded-lg">
					Home
				</Link>
				<Link
					href="/create-pokemon"
					className="p-4 hover:bg-slate-300 text-black rounded-lg"
				>
					Add
				</Link>
				<Link
					href="/type/fire"
					className="p-4 hover:bg-slate-300 text-black rounded-lg"
				>
					Fire
				</Link>
				<Link
					href="/type/water"
					className="p-4 hover:bg-slate-300 text-black rounded-lg"
				>
					Water
				</Link>
				<Link
					href="/type/grass"
					className="p-4 hover:bg-slate-300 text-black rounded-lg"
				>
					Grass
				</Link>
			</div>
		</main>
	);
};

export default NavBar;
