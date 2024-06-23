import React from 'react';

const TrainOptions = ({ selectedTrain, onChange }) => {
    const trains = [
        { id: 1, name: 'Chuyến 1', time: '10:00', duration: '2 giờ', price: 15000 },
        { id: 2, name: 'Chuyến 2', time: '12:00', duration: '3 giờ', price: 15000 },
    ];

    const handleTrainSelect = (train) => {
        onChange({ selectedTrain: train });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Chọn Chuyến</h2>
            <div className="grid grid-cols-1 gap-4">
                {trains.map(train => (
                    <div
                        key={train.id}
                        className={`p-4 border rounded-md cursor-pointer ${selectedTrain?.id === train.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                        onClick={() => handleTrainSelect(train)}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">{train.name}</h3>
                                <p>{train.time}</p>
                                <p>Thời gian trước khi khởi hành: {train.duration}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">{train.price}đ</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainOptions;
