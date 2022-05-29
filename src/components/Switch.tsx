
import { useAppDispatch } from '../App/hooks'; 
import {changeTemperatureUnit} from '../features/weather/weatherSlice'

function Switch() {
    const dispatch = useAppDispatch()

    return (
        <div className='toggleBox'>
            <div className="toggle">
                <input id="switcher" type="checkbox" onChange={()=>dispatch(changeTemperatureUnit())}/>
                <label htmlFor='' className="onBtn">°C</label>
                <label htmlFor='' className="offBtn">°F</label>
            </div>
        </div>
    )
}

export default Switch 
