import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { filterByCategory, filterViaSearch, sortByDate, sortByOrder } from '../store/slices/templateSlice'
import { TextInput } from './TextInput'
import { SelectField } from '.'
import { API_ENDPOINT } from '../constants'
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

  const memoisedDebouncedDispatch = useCallback(() => debouncedDispatch(), []);

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
  });

  const dispatch = useDispatch();

  const handleSortValuesChange = (key: string, value: string) => {
    setSortControllerValues({
      ...sortControllerValues,
      [key.toLowerCase()]: value,
    })
  }

  useEffect(() => {
    console.log(sortControllerValues.category)
    dispatch(filterByCategory(sortControllerValues.category))
  },[sortControllerValues.category]);

  useEffect(() => {
    console.log(sortControllerValues.date)
    dispatch(sortByDate(sortControllerValues.date))
  },[sortControllerValues.date]);

  useEffect(() => {
    console.log(sortControllerValues.order)
    dispatch(sortByOrder(sortControllerValues.order))
  },[sortControllerValues.order]);

  return (
    <div className="sortcontrollers__container">
      <p>Sort By:</p>
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
