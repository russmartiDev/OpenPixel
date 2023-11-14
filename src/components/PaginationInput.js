function PaginationInput({currentPage, onChange, totalPage, onKeyDown}){
	return	(
		<div className="px-5 py-5 w-full">
			<label className="font-medium text-neutral-600">Page: </label>
			<input type="number" className="border-2 rounded-lg font-semibold w-12 text-center focus:outline-2 focus:outline-neutral-400" value={ currentPage } min={1} onChange={onChange} onKeyDown={onKeyDown}/>
			<label className="font-medium text-neutral-600"> of {totalPage}</label>
		</div>
	)
}

export default PaginationInput;