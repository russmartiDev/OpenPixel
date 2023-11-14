import { useRef, useState, useEffect } from "react";
import unsplash from "./api/unsplash";
import response from "./response";
function ColorList( props ) {
	return(
		<li className="flex align-center mt-1 hover:bg-blue-100 p-2 cursor-pointer" onClick={props.selectColor}>
			<div className={`inline-block ${props.color} w-6 h-6`}></div>
			<p className="inline-block ml-2">{props.children}</p>
		</li>
	)
}


function ColorSelector( props ) {
	return(
		<ul className="absolute h-fit bg-neutral-50 p-1 top-16 left-0 text-neutral-950">
			{props.children}
		</ul>
	)
}

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

function ImageGallery({imageJson}){
	return(
		<div class="w-full  px-5 pb-10 mx-auto mb-10 gap-5 columns-2 md:columns-4 space-y-5" >

			{	
				imageJson.map((imageData, i)=>{
					return(
						<div className="w-fit h-fit cursor-pointer relative" onClick={async ()=>{

							let response = await fetch(imageData.urls.full)
							let blob = await response.blob()
							const url = URL.createObjectURL(blob)
							const a = document.createElement('a')
							a.href = url
							a.download = `${imageData.id}.jpg`
							document.body.appendChild(a)
							a.click()
							document.body.removeChild(a)
						}}>
							<div className="bg-gradient-to-t from-black w-full h-full absolute z-10 opacity-0 hover:opacity-100">
								<p className="text-white absolute bottom-0 text-sm p-5 font-medium z-20">{imageData.alt_description}</p>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 opacity-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
								</svg>

							</div>
				

							<img  src={imageData.urls.regular} alt=""/>
						</div>
					)
				})
			}
		</div>
	)
}


function PaginationButton({currentPage, totalPage, nextPage, prevPage}){
	return(
		<div className="w-full p-10">
			<div className="mx-auto w-fit flex">
				{
					currentPage != 1 && (
						<button className="mx-2 border-2 border-blue-500  text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50" onClick={prevPage}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
							</svg>
						</button>
					)
				}

				{
					currentPage != totalPage && (
						<button className="mx-2 bg-blue-500 py-1 px-2 font-medium text-white rounded-lg hover:bg-blue-600" onClick={nextPage}>
							<p className="inline-block ">Next Page</p>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</button>
					)
				}
			</div>
		</div>
	)
}
function PaginationInput({currentPage, onChange, totalPage, onKeyDown}){
	return	(
		<div className="px-5 py-5 w-full">
			<label className="font-medium text-neutral-600">Page: </label>
			<input type="number" className="border-2 rounded-lg font-semibold w-12 text-center focus:outline-2 focus:outline-neutral-400" value={ currentPage } min={1} onChange={onChange} onKeyDown={onKeyDown}/>
			<label className="font-medium text-neutral-600"> of {totalPage}</label>
		</div>
	)
}

function App() {


	const colorList = [
		{color: "Color", class: "bg-white"}, {color: "B&W", class: "bg-neutral-500"}, {color: "Black", class: "bg-black"}, {color: "White", class: "bg-white"}, {color: "Yellow", class: "bg-yellow-400"}, {color: "Orange", class: "bg-orange-400"},
		{color: "Red", class: "bg-red-500"}, {color: "Purple", class: "bg-purple-500"}, {color: "Magenta", class: "bg-pink-600"}, {color: "Green", class: "bg-green-500"}, {color: "Teal", class: "bg-teal-400"}, {color: "Blue", class: "bg-blue-500"}
	]
	const [color, setColor] = useState(colorList[0])
	const [colorSelect, turnSelect] = useState(true)
	const [totalPage, setTotal] = useState(0)
	const [currentPage, setPage ] = useState(1)
	const [imageJson, setImage] = useState([])
	const [searchText, setSearch] = useState("")
	const [spinner, setSpinner] = useState(false)

	const getImages = async( page = 1, search = "") =>{
		setSpinner(true)

		let response = {}
		let images = [];
		if(search == "") {
			unsplash.defaults.params = {
				...unsplash.defaults.params,
				page: page
			}
			setColor(colorList[0])
			try {
				response = await unsplash.get( '/photos' )

			} catch (error) {
				console.log(unsplash.defaults.params)

				alert("API Error: No more request available try again after an hour")
			}
			images = response.data

		}
		else {

			let newParams = {
				page: page,
				query: search,
			}
			let imageColor = color.color
			if(imageColor != "Color") {
				if(imageColor == "B&W") {
					imageColor = "black_and_white"
				}
				imageColor = imageColor.toLowerCase();
				newParams["color"] = imageColor;

			}
			else {
				let searchParams = unsplash.defaults.params
				delete searchParams["color"] 
				unsplash.defaults.params = searchParams
			}
			unsplash.defaults.params = {
				...unsplash.defaults.params,
				...newParams
			}

			try {
				response = await unsplash.get( '/search/photos' )
			} catch (error) {
				console.log(unsplash.defaults.params)
				alert("API Error: No more request available try again after an hour")
			}
			images = response.data.results

		}
		let total = response.headers['x-total']
		let perPage = response.headers['x-per-page']
		setTotal(Math.ceil(total / perPage))
		setImage( images )
		setSpinner(false)
		
	}
	

	useEffect(()=>{
		getImages()
	}, [])
	const wrapperRef = useRef(null);
	const handleClickOutside = (event) => {

		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			turnSelect(true);
		}
	};
	
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
	
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const searchImage = ()=>{
		setPage(1);
		getImages(currentPage, searchText)
	}

	return (
		<>

		<div className=" bg-blue-600 w-full pb-12">
			<div className=" w-full p-3 md:p-0 md:w-2/3 mx-auto ">
				<h1 className="text-[10vw] md:text-[8vw] text-center mb-4 h-fit text-white "><span className="tracking-tighter font-['Comfortaa'] font-bold ">Open</span><span className=" font-bold font-['Pixelify_Sans'] ">Pixel</span></h1>
				<div>
					<p className="text-whtie mb-8 font-medium text-xs md:text-sm text-white font-['Open_Sans'] text-center">Elevate your projects with our vast collection of premium FreeStock images. Unleash inspiration, pixel by pixel, without constraints.</p>
				</div>

				<div ref={wrapperRef}>
				<SearchBar
				select={()=>{ turnSelect(colorSelect ? false : true) }} color={color} searchText={searchText} onChange={(e)=>setSearch(e.target.value)}
				onKeyDown={(e)=>{
					if (e.key === 'Enter') {
						searchImage()
					}
				}}
				onClick={()=>{
					searchImage()
				}}>
					{
						!colorSelect && (
							<ColorSelector>
								{
									colorList.map((list, i)=>{
										return(
											<ColorList selectColor={()=>{
													setColor(colorList[i])
													turnSelect(colorSelect ? false : true)
												}} color={list.class}>{list.color}
											</ColorList>
										)
									})
								}
							</ColorSelector>
						)
					}
				</SearchBar>
				</div>


			</div>
		</div>
		<PaginationInput currentPage={currentPage} totalPage={totalPage}
		onChange={(e)=>setPage( e.target.value < 1 ? 1 : e.target.value > totalPage ? totalPage : e.target.value)}
		onKeyDown={(e)=>{
			if (e.key === 'Enter') {
				setPage(parseInt(e.target.value));
				getImages(currentPage, searchText);
			}
		}}>

		</PaginationInput>
		{
			!spinner ? (
				<ImageGallery imageJson={imageJson}></ImageGallery>
			) : (
				<p className="w-full text-center">LOADING...</p>
			)
		}
		<PaginationButton currentPage={currentPage} totalPage={totalPage} 
		nextPage={()=>{
			getImages(currentPage + 1, searchText)
			setPage(currentPage + 1, searchText)
			window.scrollTo(0, 0)
		}}
		prevPage={()=>{
			getImages(currentPage - 1, searchText)
			setPage(currentPage - 1, searchText)
			window.scrollTo(0, 0)
		}}
		></PaginationButton>


		</>
	);
}

export default App;
