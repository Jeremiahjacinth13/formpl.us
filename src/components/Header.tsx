import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { TextInput } from './TextInput'
import debounce from '../utils/debounce'

import { API_ENDPOINT } from '../constants'
import { SelectField } from '.'

import './styles/header.css'

const Header: React.FC = () => {
  return (
    <header>
      <SearchControllers />
      <SortControllers />
    </header>
  )
}

const SearchControllers: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  const debounceAPIRequest = debounce(async () => {
    try {
      const { data } = await axios.get(API_ENDPOINT);
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }, 350)

  const getTemplatesfromAPI = useCallback(() => debounceAPIRequest(), [])

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    getTemplatesfromAPI()
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

  const handleSortValuesChange = (key: string, value: string) => {
    setSortControllerValues({
      ...sortControllerValues,
      [key.toLowerCase()]: value,
    })
  }

  return (
    <div className="sortcontrollers__container">
      <p>Sort By:</p>
      <SelectField
        name="Category"
        value={sortControllerValues.category}
        onChange={handleSortValuesChange}
        options={['All', 'Education', 'E-Commerce', 'Health']}
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
