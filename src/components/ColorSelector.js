function ColorSelector( props ) {
	return(
		<ul className="absolute h-fit bg-neutral-50 p-1 top-16 left-0 text-neutral-950">
			{props.children}
		</ul>
	)
}

export default ColorSelector;