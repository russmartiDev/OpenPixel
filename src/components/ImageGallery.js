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

export default ImageGallery;