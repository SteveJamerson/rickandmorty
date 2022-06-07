import { ReactComponent as ArrowDown } from './svg/arrow-down.svg';
import { ReactComponent as Close } from './svg/close.svg';
import { ReactComponent as Search } from './svg/search.svg';

const IconsTypes = {
   'arrow-down': ArrowDown,
   close: Close,
   search: Search,
};

export default IconsTypes;

export type IconName = 'arrow-down' | 'close' | 'search';

export type IconPosition = 'start' | 'end' | 'up' | 'down';
