import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// import Button from '@mui/material/Button';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TempWrapper } from './temp.style';
import { ITempSelector } from './temp.typing';


function TempSelector({ value, handleChange, handleRefetch }: ITempSelector) {
  const myView = useAppSelector((state) => state.screen.size_view);

  return (
    <TempWrapper data-testid={'temp-control'}>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: myView ? 'space-between' : 'center',
          }}
          row={true}
          aria-label="temp"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="Celsius" />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Fahrenheit"
            sx={{ margin: 0 }}
          />
        </RadioGroup>
        {/* {!myView && (
          <Button
            sx={{
              position: 'absolute',
              right: '0',
              textTransform: 'capitalize',
              backgroundColor: '#ffffff',
              border: '1px solid #0055ff',
              color: '#0055ff',
              width: '80px',
            }}
            onClick={handleRefetch}
          >
            Refresh
          </Button>
        )} */}
      </FormControl>
    </TempWrapper>
  );
}

export default TempSelector;
