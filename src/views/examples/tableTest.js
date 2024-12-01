import { useState } from "react";
import './tables.css'
import Modal from "./modal";
// Основной компонент таблицы
const Table1 = () => {
	const [rows, setRows] = useState([
		{ id: 1, name: 'Alice', age: 25 },
		{ id: 2, name: 'Bob', age: 30 },
		{ id: 3, name: 'Charlie', age: 35 },
	]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentRow, setCurrentRow] = useState(null);
	const [filter, setFilter] = useState('');

	const handleDelete = (id) => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const handleEdit = (row) => {
		setCurrentRow(row);
		setIsModalOpen(true);
	};

	const handleAddRow = () => {
		const newRow = {
			id: Date.now(),
			name: '',
			age: '',
		};
		setRows([...rows, newRow]);
		setCurrentRow(newRow);
		setIsModalOpen(true);
	};

	const handleSaveRow = (updatedRow) => {
		setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
	};

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const filteredRows = rows.filter((row) =>
		row.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div>
			<h1>Editable Table</h1>
			<button onClick={handleAddRow}>Add New Row</button>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Age</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredRows.map((row) => (
						<tr key={row.id}>
							<td>{row.name}</td>
							<td>{row.age}</td>
							<td>
								<button onClick={() => handleEdit(row)}>Edit</button>
								<button onClick={() => handleDelete(row.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<input
					type="text"
					placeholder="Filter by Name"
					value={filter}
					onChange={handleFilterChange}
				/>
			</div>
			{/* Модальное окно для редактирования */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveRow}
				rowData={currentRow}
			/>
		</div>
	);
};

export default Table1;