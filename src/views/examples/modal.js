import { useEffect, useState } from "react";
import './tables.css'

// // Компонент для отображения модального окна
const Modal = ({ isOpen, onClose, onSave, rowData }) => {
    const getData = ()=> {
        console.log(rowData)
        if (rowData === null) return {
            id: Date.now(),
            category: '',
            age: '',
        }
        return rowData
    }
	const [data, setData] = useState(getData());
    console.log(data)

	const handleChange = (e) => {
		const { category, value } = e.target;
		setData((prevData) => ({ ...prevData, [category]: value }));
	};

	const handleSave = () => {
		onSave(data);
		onClose();
	};

    useEffect(
        ()=>{
            if (rowData !== null)
            if (data.id !== rowData.id) {
                setData(rowData);
            }
        }, [rowData, data.id]
    )

	return (
		isOpen && (
			<div className="modal">
				<div className="modal-content">
					<h2>Edit Row</h2>
					<label>
					category:
						<input
							type="text"
							name="name"
							value={data.category}
							onChange={handleChange}
						/>
					</label>
					<label>
						Age:
						<input
							type="text"
							name="age"
							value={data.age}
							onChange={handleChange}
						/>
					</label>
					<button onClick={handleSave}>Save</button>
					<button onClick={onClose}>Close</button>
				</div>
			</div>
		)
	);
};

export default Modal;