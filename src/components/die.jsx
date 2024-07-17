import React from 'react';


export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "green" : "white"

    }
  return (
    <div
     className='die--face' 
     style={styles}
     onClick={props.holdDice}
     > 
        <h2 className='die'>{props.value}</h2>
    </div>
  )
}