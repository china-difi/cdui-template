import { JSX } from 'cdui-js';

export const Loading = (props?: JSX.SvgSVGAttributes<never>) => {
  return (
    <div class="absolute position-x-center" style={{ top: '0' }} {...props}>
      loading ...
    </div>
  );
};
