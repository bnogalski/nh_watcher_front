import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const DataArray = (props) => {
	const [hideDetails, setHideDetails] = useState(false);

	let array = '';

	if (Array.isArray(props.children)) {
		let i = 0;
		array = props.children.map((el) => {
			i++;
			return (
				<li
					key={i}
					className={`px-3 flex justify-between rounded-md gap-x-2 ${
						i % 2 ? 'bg-purple-200' : ''
					} hover:bg-purple-600`}
				>
					<span className="flex-1">{el.name}</span>
					<span className="flex-1  w-full text-right">{el.value}</span>
				</li>
			);
		});
	}

	const details = (
		<ul className={`w-full m-y rounded-md bg-purple-400}`}>{array}</ul>
	);

	return (
		<div
			className={
				`sm:w-full   sm:shadow-2xl  sm:px-1  bg-transparent ` +
				props.bgColor
			}
			onClick={(e) => {
				e.preventDefault();
				return setHideDetails((prevState) => !prevState);
			}}
		>
			<div className="flex justify-between w-full">
				<h1 className="px-2">{props.title ? props.title : 'Untitled'}</h1>
				{hideDetails ? (
					<MdExpandMore className="stroke-current text-right text-2xl" />
				) : (
					<MdExpandLess className="stroke-current text-right text-2xl" />
				)}
			</div>
			{hideDetails ? null : details}
		</div>
	);
};

export default DataArray;
