
const Question = () => {
  const question = (
    <div className="h-full p-4 lg:w-1/3 sm:w-1/2 md:w-1/2 w-full" >
      <div className="h-full flex flex-col justify-between bg-gray-800 bg-opacity-40 px-8  py-10 rounded-lg space-y-6 overflow-hidden text-center relative">
        <img src="" className="w-16 h-16 mx-auto mb-4 rounded-full test" alt="" />
        <h1 className=" title-font sm:text-2xl text-xl font-medium text-white mb-3"> fds fsd fds lvage Poke sdfkjslf;kjs klfjdsaflkj slkfjs;lka jslkdafj ;lksa j;l Waistcoat Godard</h1>
        <div className=" flex justify-between mt-7">
          <button className="btn text-white bg-teal-600 hover:bg-teal-700 inline-flex items-center border-none">Take Part
            <svg className="w-4 h-4 " viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex items-center  lg:space-x-2.5 space-x-3.5 ">
            <div className=" bg-none inline-flex items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-teal-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="teal"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div className="text-2xl font-semibold text-teal-600">|</div>
            <div className="text-teal-500 inline-flex items-center leading-none text-base space-x-1 cursor-pointer ">
              <svg className="w-6 h-6 mr-1" stroke="teal" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              <span>6</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )

  let arr = [];

  for (let i = 0; i < 8; i++) {
    arr[i] = question
  }

  return (
    <div className="min-h-lvh px-4">
      <div className="flex flex-wrap -m-4 mt-10">

        {
          arr.map((i, item) => (
           
              arr[item]
            
          ))
        }



      </div>
    </div>
  )
}

export default Question