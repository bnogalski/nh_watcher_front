import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = (props) => {
	return (
		<ul className={'gap-y-3 flex flex-col'}>
			{props.isAuth ? (
				<Aux>
					<NavigationItem link="/" exact>
						Rigs
					</NavigationItem>
					<NavigationItem link="/trade">Trading View</NavigationItem>
				</Aux>
			) : null}
			{!props.isAuth ? (
				<NavigationItem link="/auth">Authenticate</NavigationItem>
			) : (
				<NavigationItem link="/logout">Logout</NavigationItem>
			)}
		</ul>
	);
};

export default navigationItems;
