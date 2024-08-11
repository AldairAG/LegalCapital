import "./ToggleButtons.css"
const ToggleButton = () => {
    return (
        <label class="toggle-switch">
            <input type="checkbox"/>
                <div class="toggle-switch-background">
                    <div class="toggle-switch-handle"></div>
                </div>
        </label>
    )
}

export default ToggleButton