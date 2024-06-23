import 'react'
import {useState} from "react";
import TrainOptions from "./components/TrainOptions";
import SeatSelection from "./components/SeatSelection";
import SelectStation from "./components/SelectStation";
import PassengerInfo from "./components/PassengerInfo";
import Summary from "./components/Summary";

const Layoutbooking = () => {
    const [stations, setStations] = useState({ departure: '', arrival: '' });
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengerInfo, setPassengerInfo] = useState({ name: '', email: '', phone: '', note: '' });

    const handleChange = (newState) => {
        if (newState.stations) {
            setStations(newState.stations);
        }
        if (newState.selectedTrain) {
            setSelectedTrain(newState.selectedTrain);
        }
        if (newState.selectedSeats) {
            setSelectedSeats(newState.selectedSeats);
        }
        if (newState.passengerInfo) {
            setPassengerInfo(newState.passengerInfo);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <SelectStation stations={stations} onChange={handleChange} />
            {(stations.departure && stations.arrival) && (
                <div className="flex space-x-8">
                    <div className="w-1/2">
                        <TrainOptions selectedTrain={selectedTrain} onChange={handleChange} />
                    </div>
                    {selectedTrain && (
                        <div className="w-1/2">
                            <SeatSelection selectedSeats={selectedSeats} onChange={handleChange} />
                        </div>
                    )}
                </div>
            )}
            {selectedSeats.length > 0 && (
                <PassengerInfo passengerInfo={passengerInfo} onChange={handleChange} />
            )}
            {passengerInfo.name && passengerInfo.email && passengerInfo.phone && (
                <Summary selectedSeats={selectedSeats} passengerInfo={passengerInfo} />
            )}
        </div>
    );
};
export default Layoutbooking