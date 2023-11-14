function PaginationButton({currentPage, totalPage, nextPage, prevPage}){
	return(
		<div className="w-full p-10">
			<div className="mx-auto w-fit flex">
				{
					currentPage !== 1 && (
						<button className="mx-2 border-2 border-blue-500  text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50" onClick={prevPage}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
							</svg>
						</button>
					)
				}

				{
					currentPage !== totalPage && (
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

export default PaginationButton;