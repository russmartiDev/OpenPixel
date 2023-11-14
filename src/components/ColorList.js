function ColorList( props ) {
	return(
		<li className="flex align-center mt-1 hover:bg-blue-100 p-2 cursor-pointer" onClick={props.selectColor}>
			<div className={`inline-block ${props.color} w-6 h-6`}></div>
			<p className="inline-block ml-2">{props.children}</p>
		</li>
	)
}

export default ColorList;