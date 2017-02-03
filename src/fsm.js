class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
        this.config=config;}
        else{
            throw new Error;
        }
        this.state=this.config.initial;
        this.lastState=[];
        this.nextState=[];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states[state]){
            this.lastState.push(this.state);
            this.nextState=[];
            this.state=state;}else{
            throw new Error();
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.state].transitions[event]){
            this.nextState=[];
            this.lastState.push(this.state);
            this.state=this.config.states[this.state].transitions[event];}
        else{
            throw new Error();
        }
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state=this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var stateArray = Object.getOwnPropertyNames(this.config.states);
        if (event)
        {
            for (var index = stateArray.length - 1; index >= 0; --index)
            {
                if (!this.config.states[stateArray[index]].transitions[event])
                {
                    stateArray.splice(index, 1);
                }
            }


        }
        return stateArray;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

        if(this.lastState.length!=0){
            this.nextState.push(this.state);
            this.state=this.lastState.pop();

            return true;
        }
        {
         return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.nextState!=0){
            this.lastState.push(this.state);
            this.state=this.nextState.pop();
            return true;
        }{
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.lastState=[];
        this.nextState=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
