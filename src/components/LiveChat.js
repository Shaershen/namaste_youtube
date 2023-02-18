import { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generateRandomName, generateRandomString } from '../utils/helper'

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState('')
  const dispatch = useDispatch()

  const chatMessages = useSelector((store) => store.chat.messages)

  useEffect(() => {
    const i = setInterval(() => {
      // api polling

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomString(20),
        })
      )
    }, 1500)

    return () => clearInterval(i)
  }, [])

  return (
    <>
      <div className=" p-2 border border-black w-full h-[600px] bg-slate-50 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {' '}
          {/* // dont use indexes */}
          {chatMessages.map((c, i) => (
            <ChatMessage
              key={i}
              name={c.name}
              message={c.message}
            />
          ))}
        </div>
      </div>

      <form
        className="w-full p-2 ml-2 border border-black"
        onSubmit={(e) => {
          e.preventDefault()

          dispatch(
            addMessage({
              name: 'Artem S',
              message: liveMessage,
            })
          )
          setLiveMessage('')
        }}
      >
        <input
          className="w-96 px-2"
          type="text"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="px-2 mx-2 bg-green-100">Send</button>
      </form>
    </>
  )
}

export default LiveChat
