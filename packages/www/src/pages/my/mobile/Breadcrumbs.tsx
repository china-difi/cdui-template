import { JSX, location, splitProps } from 'cdui-js';
import { menuItems } from '../menu';

const findMenuItemText = (key: string) => {
  if (key && (key = key.replace('/', ''))) {
    for (let i = menuItems.length; i--; ) {
      let items = menuItems[i];

      for (let j = items.length; j--; ) {
        if (items[j].name === key) {
          return items[j].text;
        }
      }
    }
  }

  return 'NotFound';
};

export const Breadcrumbs = (props: JSX.HTMLAttributes<never>) => {
  let [thisProps, restProps] = splitProps(props, ['class']);

  return (
    <div class={'padding-y-XXS font-s-S' + (thisProps.class ? ' ' + thisProps.class : '')} {...restProps}>
      <span class="cursor-pointer color-XXL" onclick={() => location.routeTo('/my', [0, 0])}>
        {'个人中心'}
      </span>
      <span class="margin-x-XXS">{'>'}</span>
      <span>{findMenuItemText(location.paths[1])}</span>
    </div>
  );
};
