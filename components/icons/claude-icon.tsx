import { Claude } from '@lobehub/icons';
import { Flexbox } from '@lobehub/ui';

export default () => (
  <Flexbox gap={16} align={'flex-start'}>
    <Claude.Combine size={32} />
    <Claude.Combine size={64} type={'color'} />
  </Flexbox>
);