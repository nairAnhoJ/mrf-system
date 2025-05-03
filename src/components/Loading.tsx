

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen z-[109] bg-gray-900/30">
        <div className="w-20 h-20 flex items-center justify-center">
            <div className="w-10 h-10 aspect-square border-4 border-gray-300 border-b-blue-500 rounded-full animate-spin"></div>
        </div>
        <h1 className="text-gray-100 font-bold tracking-wide">Loading . . .</h1>
    </div>
  )
}

export default Loading