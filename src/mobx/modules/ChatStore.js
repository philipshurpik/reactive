import { observable, action, runInAction } from 'mobx';
import { List } from 'immutable';

import { INIT, LOADING, SUCCESS, ERROR } from '../../consts/phaseEnums';

import * as api from '../../apis/chatApi';

export default class ChatStore {
  @observable name = null;
  @observable messages = List();
  @observable phase = INIT;
  @observable error = null;

  @action async fetchChat(name) {
    try {
      this.name = null;
      this.messages = List();
      this.phase = LOADING;
      this.error = null;

      const messages = await api.fetchMessages(name);

      runInAction('#fetchChat success', () => {
        this.name = name;
        this.phase = SUCCESS;
        this.messages = List(messages.map(message => ({message})));
      });
    } catch (error) {
      runInAction('#fetchChat error', () => {
        this.phase = ERROR;
        this.error = String(error);
      });
    }
  }

  @action resetChat() {
    this.name = null;
    this.messages = List();
    this.phase = INIT;
    this.error = null;
  }

  @action async addMessage(message) {
    try {
      this.messages = this.messages.push({message, phase: LOADING});

      const messages = await api.addMessage(this.name, message);
      runInAction('#addMessage success', () => {
        this.messages = List(messages.map(message => ({message})));
      });
    } catch(error) {
      runInAction('@addMessage error', () => {
        this.messages = this.messages.pop().push({message, phase: ERROR, error});
      });
    }
  }
}
