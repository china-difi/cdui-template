import { listenAutoCloseEvent, layout, KeepAlive } from 'cdui-js';

// 引入 API MOCK
import '../../mock';

import { MobileHost } from './mobile';
import { PCHost } from './pc';

export const App = () => {
  return (
    <div id="app" class="bg-c-XXD color font-s" {...listenAutoCloseEvent}>
      <KeepAlive show={layout['le-480']}>
        <MobileHost></MobileHost>
      </KeepAlive>
      <KeepAlive show={layout['gt-480']}>
        <PCHost></PCHost>
      </KeepAlive>
    </div>
  );
};
