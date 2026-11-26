import React from 'react'
import SearchBar from './searchBar/SearchBar'
import NewsSections from './newsSections/newsSections'

export default function Newsify({localData}) {
  return (
    <div>
      <SearchBar></SearchBar>
      <NewsSections localData={localData}></NewsSections>
    </div>
  )
}
