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
import IconVisibility from './icons/IconVisibility';
import IconVisibilityOff from './icons/IconVisibilityOff';
import IconHistory from './icons/IconHistory';
import IconNonChargeable from './icons/IconNonChargeable';
import IconChargeable from './icons/IconChargeable';
import IconUpload from './icons/IconUpload';
import IconLogs from './icons/IconLogs';
import IconCancel from './icons/IconCancel';
import IconPrint from './icons/IconPrint';

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
    key: IconKey,
    visibility: IconVisibility,
    visibilityOff: IconVisibilityOff,
    history: IconHistory,
    nonChargeable: IconNonChargeable,
    chargeable: IconChargeable,
    upload: IconUpload,
    logs: IconLogs,
    cancel: IconCancel,
    print: IconPrint,
};

const IconRenderer = ({name, className}) => {
    const Icon = icons[name];
    return <Icon className={className} />;
}

export default IconRenderer;
