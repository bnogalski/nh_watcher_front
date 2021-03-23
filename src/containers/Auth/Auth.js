import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';

import * as actions from '../../store/actions/index'

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	};

  inputChangedHandler = ( event, controlName ) => {
      const updatedControls = updateObject( this.state.controls, {
          [controlName]: updateObject( this.state.controls[controlName], {
              value: event.target.value,
              valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
              touched: true
          } )
      } );
      this.setState( { controls: updatedControls } );
  }

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, false );
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid  && formElement.config.touched}
				changed={(event) => {
					this.inputChangedHandler(event, formElement.id);
				}}
			/>
		));

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className="my-5 mx-auto w-4/5 text-center border-gray-100 border-solid border p-2 box-border sm:max-w-3xl">
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button className="text-gray-100">Submit</Button>
				</form>
			</div>
		);
	}
}


const mapStateToProps = state => {
  return {
      // loading: state.auth.loading,
      // error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      // authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) )
      // onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
