import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import { HelloButton } from '../src/HelloButton/HelloButton';

const stories = storiesOf('HelloButton', module);

stories.add(
  'with some props',
  withInfo({
    inline: true,
    text: 'A button with props and editable knobs.'
  })(() => (
    <HelloButton
      onClick={(n: number) => alert(`Clicked ${n} times.`)}
      text={text('Button Text', 'Click me')}
    />
  ))
);
