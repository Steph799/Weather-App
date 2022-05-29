import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from './utils/Hooks/UseDebounce'
import { getCitiesAutocomplete } from '../features/weather/weatherSlice'
import { useAppDispatch, useAppSelector } from '../App/hooks';

type CityAutoCompleteProps = {
  handleSelect: (e: React.SyntheticEvent<Element, Event>, selectedValue: string) => Promise<void>
}

export type cityObj = {
  name: string,
  id: number
}

function CityAutoComplete({ handleSelect }: CityAutoCompleteProps) {
  const [input, setInput] = useState<string>('')
  const [cities, setCities] = useState<cityObj[]>([])
  const debouncedValue = useDebounce<string>(input, 400)
  const dispatch = useAppDispatch()
  const weather = useAppSelector(state => state.weather);

  // Fetch API (optional)
  useEffect(() => {
    (async () => {
      if (input) {
        const citiesInfo = await dispatch(getCitiesAutocomplete(input)).unwrap()
        const updatedCities: cityObj[] = citiesInfo.map(({ LocalizedName, Country, Key }) => (
          { name: `${LocalizedName}, ${Country.ID}`, id: +Key }
        ))

        setCities(updatedCities);
      }
    })()
  }, [debouncedValue]) // Triggers when "debouncedValue" changes

  useEffect(() => {
    if (weather.isUserAskedForItsLocation && input) setInput('')  
  }, [weather.isUserAskedForItsLocation])

  const handleChange = (e: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: string) => {
    if (newInputValue && reason === 'input') {
      let value = newInputValue
      value = value.replace(/[^A-Za-z,\s]/ig, '')
      setInput(value)
      return
    }
    setInput('')
  }

  return (
    <div className='autoCompleteContainer'>
      <Autocomplete
        className='autoComplete'
        disablePortal
        options={cities}
        getOptionLabel={(city) => city.name}

        //render the city only without the key but use the key as an identifier
        renderOption={(props, option) => {
          const { name, id } = option
          return <li {...props} key={id}> {name} </li>
        }}

        sx={{ width: 300 }}
        renderInput={(params) =>
          <TextField  {...params} placeholder="Enter a city name" variant="outlined" />}

        onInputChange={(e, newInputValue: string, reason: string) =>
          newInputValue && handleChange(e, newInputValue, reason)}

        onChange={(e, selectedInput: cityObj | null) => handleSelect(e, selectedInput?.name as string)}


      />
    </div>
  )
}

export default CityAutoComplete
