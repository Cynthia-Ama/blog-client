import React from 'react'
import { useGlobalContext } from './Context'

export default function Loading() {
  const {loading} = useGlobalContext()
  return (
    <div className={loading ? "loading show-loading" : "loading"}>
        <h1>Loading...</h1>
    </div>
  )
}
