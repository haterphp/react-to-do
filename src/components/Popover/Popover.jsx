import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";

export const baseSettings = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
    }
}

const PopoverListItem = ({title, onClose, icon = null, fn = () => {}, mixin = null, ...props}) => {

    const handleClick = e => {
        onClose();
        fn(e);
    }

    return (
        <MenuItem onClick={handleClick} {...props}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title}/>
            { mixin }
        </MenuItem>
    )
}

function PopoverWrapper({button = null, list = [], settings = {}}) {

    const SortButton = button;

    const getSettings = () => ({
        ...baseSettings,
        ...settings
    })

    return (
        <PopupState variant="popover">
            {(popupState) => (
                <>
                    {<SortButton {...bindTrigger(popupState)} />}
                    <Menu
                        {...bindMenu(popupState)}
                        {...getSettings()}>
                        {
                            list.map((props, key) =>
                                <PopoverListItem
                                    key={key}
                                    selected={false}
                                    onClose={popupState.close}
                                    {...props}
                                />)
                        }
                    </Menu>
                </>
            )}
        </PopupState>
    )
}

export default PopoverWrapper;
