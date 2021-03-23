import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
	<li
		className={
			'w-full hover:bg-purple-800   '
		}
	>
		<NavLink
			className="w-full block px-1 "
			to={props.link}
			exact={props.exact}
			activeClassName={'px-3 bg-purple-700'}
		>
			{props.children}
		</NavLink>
	</li>
);

export default navigationItem;
