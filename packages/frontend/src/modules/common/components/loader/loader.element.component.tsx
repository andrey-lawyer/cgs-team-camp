import { FC } from 'react';
import { Watch } from 'react-loader-spinner';
import { Overlay } from './loader.styled';

export const Loader: FC = () => {
  return (
    <Overlay>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#a94f4d"
        ariaLabel="watch-loading"
        visible={true}
      />
    </Overlay>
  );
};
