import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../../store/features/counter/counterSlice'

function Home() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Home</h1>
      <h1>🔥 Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Tăng</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>Giảm</button>
    </div>
  )
}

export default Home