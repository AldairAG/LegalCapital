import "./ToggleButtons.css"
const ToggleButton = ({permiso, onToggle}) => {

    const handleChange = (e) => {
        onToggle(e.target.checked);
    };

    return (
        <label class="toggle-switch">
            <input type="checkbox" checked={permiso} onChange={handleChange} />
            <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
            </div>
        </label>
    )
}

export default ToggleButton 