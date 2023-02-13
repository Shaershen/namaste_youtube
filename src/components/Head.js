import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants'
import { cacheResults } from '../utils/searchSlice'

const Head = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const searchCache = useSelector((store) => store.search)
  const dispatch = useDispatch()

  useEffect(() => {
    // API call
    // make an api call after every key press
    // but if difference between 2 api calls is <200ms
    // decline the api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery])
      } else {
        getSearchSuggestions()
      }
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])

  /**
   *
   *  key - i
   *  - render the component
   *  - useEffect()
   *  - start timer => make api call after 200 ms
   *
   *  key - ip
   *  - destroy the component(useEffect return method)
   *  - rerender the component
   *  - useEffect()
   *  - start timer => make api call after 200 ms
   *
   *
   */

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const json = await data.json()
    setSuggestions(json[1])

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    )
  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30Gcy3-zix_Lv2aSksnA2dJXgZb8OV6bfwg&usqp=CAU"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-r-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-r-gray-400 p-2 rounded-r-full bg-gray-100">
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="absolute bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="shadow-sm py-2 px-3 hover:bg-gray-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  )
}

export default Head
