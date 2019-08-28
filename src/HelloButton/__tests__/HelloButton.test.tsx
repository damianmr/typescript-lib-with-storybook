import React from 'react';
import { HelloButton } from '../HelloButton';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

test('Renders a HelloButton without crashing.', () => {
  const component = renderer.create(
    <HelloButton className="testClassName" onClick={() => {}} text="Hello" />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
