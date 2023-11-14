function SearchBar( props) {
	return(
		<div className=" w-full md:w-2/3 bg-white mx-auto p-1 align-center flex relative z-30">
			<div className={` ${props.color.class} py-3 px-2 w-fit z-10 cursor-pointer`} onClick={props.select}>
				<div className={`w-max ${["Color", "White"].includes(props.color.color) ? "text-neutral-500" : "text-white"} `}>
					<p className="inline-block font-medium">{props.color.color}</p>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block ml-2" >
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				</div>
			</div>
			<input type="text" className="py-1 outline-0 text-2xl font-medium w-full text-center" value={props.searchText} onChange={props.onChange} onKeyDown={props.onKeyDown} autoFocus></input>
			<button className="py-1 px-3 text-black" onClick={props.onClick}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
			</button>
			{props.children}
		</div>
	)
}

export default SearchBar;