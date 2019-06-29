import React from 'react';
import { slideDown, slideUp } from '../../animations/animations';
import './PaymentTypeTable.scss';

function formatDate(str) {
	return str.substr(0, 10);
  }
  
  function capitalize(str) {
	return str.split(' ').map(s => {
	  return s.charAt(0).toUpperCase() + s.substr(1);
	}).join(' ');
  }

export default class PaymentTypeTable extends React.Component {
	state = { expanded: false }
  
	toggleExpander = (e) => {
	  if (e.target.type === 'checkbox') return;
  
	  if (!this.state.expanded) {
		this.setState(
		  { expanded: true },
		  () => {
			if (this.refs.expanderBody) {
			  slideDown(this.refs.expanderBody);
			}
		  }
		);
	  } else {
		slideUp(this.refs.expanderBody, {
		  onComplete: () => { this.setState({ expanded: false }); }
		});
	  }
	}
  
	render() {
	  const { user } = this.props;
	  return [
		<tr key="main" onClick={this.toggleExpander}>
		  <td><input className="uk-checkbox" type="checkbox" /></td>
		  <td className="uk-text-nowrap">{this.props.index}.</td>
		  <td><img className="uk-preserve-width uk-border-circle" src={user.picture.thumbnail} width={48} alt="avatar" /></td>
		  <td>{capitalize(user.name.first + ' ' + user.name.last)}<br /><small>{user.email}</small></td>
		  <td>{capitalize(user.location.city)} ({user.nat})</td>
		  <td>{formatDate(user.registered)}</td>
		</tr>,
		this.state.expanded && (
		  <tr className="expandable" key="tr-expander">
			<td className="uk-background-muted" colSpan={6}>
			  <div ref="expanderBody" className="inner uk-grid">
				<div className="uk-width-1-4 uk-text-center">
				  <img className="uk-preserve-width uk-border-circle" src={user.picture.large} alt="avatar" />
				</div>
				<div className="uk-width-3-4">
				  <h3>{capitalize(user.name.first + ' ' + user.name.last)}</h3>
				  <p>
					Address:<br/>
					<i>
					  {capitalize(user.location.street)}<br/>
					  {user.location.postcode} {capitalize(user.location.city)}<br/>
					  {user.nat}
					</i>
				  </p>
				  <p>
					E-mail: {user.email}<br/>
					Phone: {user.phone}
				  </p>
				  <p>Date of birth: {formatDate(user.dob)}</p>
				</div>
			  </div>
			</td>
		  </tr>
		)
	  ];
	}
  }