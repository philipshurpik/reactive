import React, { PropTypes } from 'react';
import { List } from 'immutable';

const Messages = props => (
  <ul className="Messages list-group">
    {props.messages.map((msg, index) =>
      <li key={index} className="list-group-item">
        <span>{msg.message}</span>
        <span style={{paddingLeft: 50}}>{msg.error || msg.phase}</span>
      </li>
    )}
  </ul>
);

Messages.propTypes = {
  messages: PropTypes.instanceOf(List).isRequired,
};

export default Messages;
