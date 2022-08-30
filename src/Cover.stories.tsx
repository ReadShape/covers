import type { ComponentProps } from 'react';
import { Cover } from './Cover';

export default {
  title: 'Cover',
  component: Cover,
};

export function Example(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <Cover title="Berlin Calling" authors={['Paul Hockenos']} />
      <Cover title="1984" authors={['George Orwell']} />
      <Cover title="Puma Years" authors={['Laura Coleman']} />
      <Cover title="Flow" authors={['Mihaly Csikszentmihalyi']} />
      <Cover title="Letters from a Stoic" authors={['Seneca']} />
      <Cover title="Beyond Good and Evil" authors={['Friedrich Nietzsche']} />
      <Cover title="The Wonderful Wizzard of Oz" authors={['L. Frank Baum']} />
      <Cover
        title="Zeit zu leben und Zeit zu sterben"
        authors={['Erich Maria Remarque']}
      />
      <Cover title="Steal Like an Artist" authors={['Austin Kleon']} />
      <Cover title="The Story of More" authors={['Hope Jahren']} />
      <Cover title="Klara and the Sun" authors={['Kazuo Ishiguro']} />
      <Cover title="Project Hail Mary" authors={['Andy Weir']} />
      <Cover title="Into Thin Air" authors={['Jon Krakauer']} />
    </div>
  );
}

export function Controllable(props: ComponentProps<typeof Cover>): JSX.Element {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <Cover {...props} />
    </div>
  );
}

Controllable.bind({});
Controllable.args = {
  title: 'Fire and Night',
  authors: ['Rainis'],
};
