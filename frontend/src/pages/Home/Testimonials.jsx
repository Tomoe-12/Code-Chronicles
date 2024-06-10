
const Testimonials = () => {
    return (

        <section className="relative" >
            <div className="absolute inset-x-0  transform-gpu overflow-hidden blur-3xl sm:-top-48" aria-hidden="true">
                <div className="relative z-40 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-t from-teal-600 to-white opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-white capitalize lg:text-3xl ">
                    What our <span className="text-teal-500 ">clients</span> say
                </h1>
                <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error
                    alias, adipisci rem similique, at omnis eligendi optio eos harum.
                </p>
                <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-8 border border-teal-500 rounded-lg ">
                        <p className="leading-loose text-gray-400 ">
                            “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                            tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                            aperiam dolorum, obcaecati corrupti aspernatur a.”.
                        </p>
                        <div className="flex items-center mt-8 -mx-2">
                            <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 " src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt />
                            <div className="mx-2">
                                <h1 className="font-semibold text-teal-600 ">Robert</h1>
                                <span className="text-sm text-gray-400">CTO, Robert Consultency</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-teal-500 rounded-lg ">
                        <p className="leading-loose text-gray-400 ">
                            “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                            tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                            aperiam dolorum, obcaecati corrupti aspernatur a.”.
                        </p>
                        <div className="flex items-center mt-8 -mx-2">
                            <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 " src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt />
                            <div className="mx-2">
                                <h1 className="font-semibold text-teal-600 ">Jeny Doe</h1>
                                <span className="text-sm text-gray-400">CEO, Jeny Consultency</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-teal-500 rounded-lg ">
                        <p className="leading-loose text-gray-400 ">
                            “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                            tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                            aperiam dolorum, obcaecati corrupti aspernatur a.”.
                        </p>
                        <div className="flex items-center mt-8 -mx-2">
                            <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 " src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt />
                            <div className="mx-2">
                                <h1 className="font-semibold text-teal-600 ">Ema Watson </h1>
                                <span className="text-sm text-gray-400">Marketing Manager at Stech</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </section>

    )
}

export default Testimonials