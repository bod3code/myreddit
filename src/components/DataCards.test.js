import React from 'react';
import DataCards from './DataCards';
import renderer from 'react-test-renderer';
const json = require('./defaultResponse.json');
test('cards change when data changes', () => {
  const component = renderer.create(
    <DataCards data={json}></DataCards>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });