import React from 'react'
import Game from '../Game/Game'

export default function Index(props) {
  return (
    <div className="container main">
      <Game length={props.length} wordList={props.wordList}></Game>
    </div>
  )
}
