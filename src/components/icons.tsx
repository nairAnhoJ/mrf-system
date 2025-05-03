import IconAdd from './icons/IconAdd';
import IconBack from './icons/IconBack';
import IconClose from './icons/IconClose';
import IconDelete from './icons/IconDelete';
import IconFilter from './icons/IconFilter';
import IconFirstPage from './icons/IconFirstPage';
import IconLastPage from './icons/IconLastPage';
import IconMoon from './icons/IconMoon';
import IconNext from './icons/IconNext';
import IconPassword from './icons/IconPassword';
import IconPrevious from './icons/IconPrevious';
import IconSearch from './icons/IconSearch';
import IconSettings from './icons/IconSettings';
import IconSort from './icons/IconSort';
import IconSun from './icons/IconSun';
import IconUser from './icons/IconUser';
import IconEdit from './icons/IconEdit'
import IconWarning from './icons/IconWarning';
import IconLogout from './icons/IconLogout';
import IconDownArrow from './icons/IconDownArrow';
import IconKey from './icons/IconKey';

const icons = {
    add: IconAdd,
    back: IconBack,
    close: IconClose,
    filter: IconFilter,
    moon: IconMoon,
    search: IconSearch,
    settings: IconSettings,
    sort: IconSort,
    sun: IconSun,
    firstPage: IconFirstPage,
    lastPage: IconLastPage,
    previous: IconPrevious,
    next: IconNext,
    user: IconUser,
    password: IconPassword,
    delete: IconDelete,
    edit: IconEdit,
    warning: IconWarning,
    logout: IconLogout,
    downArrow: IconDownArrow,
    key: IconKey
} as const;

type IconName = keyof typeof icons;

interface IconRendererProps {
    name: IconName;
    className?: string;
}

const IconRenderer = ({name, className}: IconRendererProps) => {
    const Icon = icons[name];
    return <Icon className={className} />;
}

export default IconRenderer;
