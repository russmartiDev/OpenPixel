import { useRef, useState, useEffect } from "react";
import unsplash from "./api/unsplash";
import ColorList from "./components/ColorList";
import ColorSelector from "./components/ColorSelector";
import ImageGallery from "./components/ImageGallery";
import PaginationButton from "./components/PaginationButton";
import PaginationInput from "./components/PaginationInput";
import SearchBar from "./components/SearchBar";


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
		if(search === "") {
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
			if(imageColor !== "Color") {
				if(imageColor === "B&W") {
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
		// eslint-disable-next-line
		getImages()
		// eslint-disable-next-line
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
