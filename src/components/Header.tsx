/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  filterByCategory,
  filterViaSearch,
  sortByDate,
  sortByOrder,
} from '../store/slices/templateSlice'

import { TextInput } from './TextInput'
import { SelectField } from '.'
import debounce from '../utils/debounce'
import './styles/header.css'

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <SearchControllers />
        <SortControllers />
      </div>
    </header>
  )
}

const SearchControllers: React.FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  let searchValueRef = useRef<string>('')

  function setSearchValueRef(newSearchValue: string) {
    searchValueRef.current = newSearchValue
    setSearchValue(newSearchValue)
  }

  const debouncedDispatch = debounce(
    () => dispatch(filterViaSearch(searchValueRef.current)),
    700,
  )

  const memoisedDebouncedDispatch = useCallback(() => debouncedDispatch(), [])

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueRef(e.currentTarget.value)
    memoisedDebouncedDispatch()
  }

  return (
    <TextInput
      value={searchValue}
      onChange={handleSearchChange}
      placeholderText="Search templates"
    />
  )
}

const SortControllers: React.FC = () => {
  const [sortControllerValues, setSortControllerValues] = useState({
    category: 'All',
    order: 'Default',
    date: 'Default',
  })

  const dispatch = useDispatch()

  const handleSortValuesChange = (key: string, value: string) => {
    setSortControllerValues({
      ...sortControllerValues,
      [key.toLowerCase()]: value,
    })
  }

  useEffect(() => {
    dispatch(filterByCategory(sortControllerValues.category))
  }, [sortControllerValues.category, dispatch])

  useEffect(() => {
    dispatch(sortByDate(sortControllerValues.date))
  }, [sortControllerValues.date, dispatch])

  useEffect(() => {
    dispatch(sortByOrder(sortControllerValues.order))
  }, [sortControllerValues.order])

  return (
    <div className="sortcontrollers__container">
      <small>Sort By:</small>
      <SelectField
        name="Category"
        value={sortControllerValues.category}
        onChange={handleSortValuesChange}
        options={['All', 'Education', 'E-commerce', 'Health']}
      />
      <SelectField
        name="Order"
        value={sortControllerValues.order}
        onChange={handleSortValuesChange}
        options={['Default', 'Ascending', 'Descending']}
      />
      <SelectField
        name="Date"
        value={sortControllerValues.date}
        onChange={handleSortValuesChange}
        options={['Default', 'Ascending', 'Descending']}
      />
    </div>
  )
}

export { Header }
