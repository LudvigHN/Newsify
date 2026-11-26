import React, { Component } from 'react'

export default function SearchBar() {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
      <form onSubmit={handleSubmit}>
        <input type="search" name="search" placeholder='Search news' />
      </form>
    )
}
