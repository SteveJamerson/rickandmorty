import { ReactComponent as ArrowDown } from './svg/arrow-down.svg';
import { ReactComponent as Search } from './svg/search.svg';

const IconsTypes = {
   'arrow-down': ArrowDown,
   search: Search,
};

export default IconsTypes;

export type IconName = 'arrow-down' | 'search';

export type IconPosition = 'start' | 'end' | 'up' | 'down';
