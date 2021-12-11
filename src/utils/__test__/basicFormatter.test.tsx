import React from 'react';
import { render } from '@testing-library/react';
import { convertTemp, intervalFormatter, useWindowSize, months, timeFormats } from '../formatter/basicFormatter';
import data from '../../mockData.json';

describe('Testing months and time format', () => {
  it('ensures that months array is complete', () => {
    expect(months.length).toEqual(12);
    expect(months[0]).toMatch(/^jan$/i);
    expect(months[11]).toMatch(/^dec$/i);
  });
  it('ensures that time format are in 12hour', () => {
    expect(timeFormats).toHaveProperty('0');
    expect(timeFormats).toHaveProperty('15', '03:00 PM');
  
  })
});

describe('Testing temp converter implementation', () => {
  it('convert to F if first arg is 1', () => {
    const convertedValue = convertTemp('1', 30);
    expect(convertedValue).toEqual(86);
  });
  it('return same value if first arg is 0', () => {
    const convertedValue = convertTemp('0', 30);
    expect(convertedValue).toEqual(30);
  });
});

describe('Testing data extraction implementation', () => {
  it('return correct response format', () => {
    const responseData = intervalFormatter(data.list);
    expect(responseData['11 Dec. 2021'].length).toBe(2);
    expect(responseData['12 Dec. 2021'].length).toBe(6);
  });
});

describe('Testing window size implementation', () => {
  it('check if current window size is greater than zero', () => {
    const ShowSize = () => <p>{useWindowSize()}</p>;
    const { container } = render(<ShowSize />);
    const screenSize = container.querySelector('p')?.innerHTML || '0';
    expect(parseInt(screenSize)).toBeGreaterThan(0)
  })
});
