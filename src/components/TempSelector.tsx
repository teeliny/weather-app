import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';

interface ITempSelector {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

function TempSelector({value, handleChange}: ITempSelector) {
  return (
    <>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between',
          }}
          row={true}
          aria-label="temp"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Celsius"
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Fahrenheit"
            sx={{ margin: 0 }}
          />
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default TempSelector;
