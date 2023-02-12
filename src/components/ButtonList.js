import React from 'react'
import Button from './Button'

const list = ['All', 'Live', 'Gaming', 'Football']

const ButtonList = () => {
  return (
    <div className="flex">
      <Button name="All" />
      <Button name="Gaming" />
      <Button name="Songs" />
      <Button name="Live" />
      <Button name="Spain" />
      <Button name="Twitch" />
      <Button name="News" />
      <Button name="Cooking" />
      <Button name="Immigration" />
      <Button name="Pop Music" />
      <Button name="Rock Music" />
    </div>
  )
}

export default ButtonList
