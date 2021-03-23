import React from 'react';

import DataArray from '../DataArray/DataArray';
import Button from '../UI/Button/Button';

const rigs = (props) => {
	const devices = props.devices.map((dev) => {
		const params = [];
		let i = 0;
		for (let key in dev) {
			if ((key !== 'id') & (key !== 'name')) {
				params.push({
					key: i++,
					name: key,
					value: dev[key] === -1 ? '---' : dev[key],
				});
			}
		}
		let bgColor = '';
		switch (dev.status) {
			case 'MINING':
				bgColor = 'bg-purple-400';
				break;
			case 'DISABLED':
				bgColor = 'bg-gray-400';
				break;
			default:
				bgColor = 'bg-gray-400';
		}

		if (dev.temperature > 80) {
			bgColor = 'bg-red-500';
		}

		return (
			<div key={dev.id} className={"sm:rounded-md overflow-hidden"}>
				<DataArray  title={dev.name} bgColor={bgColor}>
					{params}
				</DataArray>
				<div className={"flex "}>
					<Button className={"bg-green-500"} clicked={() => props.startHandler(dev.id)}>START</Button>
					<Button className={"bg-red-500"} clicked={() => props.stopHandler(dev.id)}>STOP</Button>
				</div>
			</div>
		);
	});
	return (
		<div className="flex flex-col place-items-center w-full gap-y-1">
			<div className=" w-full place-items-center sm:rounded-md overflow-hidden">
				<DataArray title={props.title} bgColor="bg-purple-400">
					{props.children}
				</DataArray>
				<div className="flex overflow-hidden w-full">
					<Button className="bg-gray-400" clicked={() => props.stopHandler('')}>
						STOP
					</Button>
					<Button
						className="bg-gray-300"
						clicked={() => props.startHandler('')}
					>
						START
					</Button>
					<Button
						className="bg-gray-400"
						clicked={() => props.restartHandler('')}
					>
						RESTART
					</Button>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row flex-wrap gap-x-1 gap-y-3 w-full">{devices}</div>
		</div>
	);
};

export default rigs;
