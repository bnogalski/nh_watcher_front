import React from 'react';
import Aux from '../../hoc/Aux/Aux';

import './DataField.css'

const dataField = (props) => {
	return (
		<Aux>
			<div className="DataField">
				<div className="Field">{props.name}</div>
				<div className="Field">{props.value}</div>
			</div>
		</Aux>
	);
};

export default dataField;
