import React from 'react';
import { HelloButton } from '../HelloButton';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

test('Renders a HelloButton without crashing.', () => {
  const component = renderer.create(
    <HelloButton className="testClassName" onClick={noop} text="Hello" />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
